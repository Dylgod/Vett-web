import { SERVICE_ROLE, VETT_ADMIN_UUID1, VETT_ADMIN_UUID2 } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import mjml2html from 'mjml';

interface Eval_Step {
    step: string;
    description: string;
    order: number;
}

const getMJMLTemplate = (manager_name_or_email: string, evals: Evaluation[]) => `
<mjml>
  <mj-head>
    <mj-title>Technical Evaluation Results</mj-title>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.5" />
    </mj-attributes>
    <mj-style>
      .pass { color: #4ade80; font-weight: bold; }
      .fail { color: #f87171; font-weight: bold; }
      .no-show { color: #9ca3af; font-weight: bold; }
      .candidate-row { background-color: #1e293b; }
      .notes-row { 
        background-color: #1e293b; 
        border-bottom: 1px solid #334155;
        margin-bottom: 20px;
      }
      .notes-cell { 
        padding: 10px 15px 20px 15px; 
        color: #e2e8f0; 
        font-style: italic;
      }
      .candidate-section {
        margin-bottom: 8px;
        border-bottom: 1px solid #334155;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#0f172a">
    <mj-section background-color="#1e293b" padding-bottom="0px">
      <mj-column>
        <mj-text font-size="20px" color="#e2e8f0" font-weight="bold">
          Technical Evaluation Results
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b" padding-top="0px">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          Hello ${manager_name_or_email},
          <br/><br/>
          We have completed the technical evaluations for your submitted candidates. Please find the detailed results below:
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b" padding="20px">
      <mj-column>
        <mj-table color="#e2e8f0">
          <tr style="border-bottom: 2px solid #334155; text-align: left; background-color: #334155;">
            <th style="padding: 15px; color: #e2e8f0;">Candidate</th>
            <th style="padding: 15px; color: #e2e8f0;">Status</th>
          </tr>
          
          ${evals.map(evaluation => `
          <tr class="candidate-row">
            <td style="padding: 15px;">${evaluation.email}</td>
            <td style="padding: 15px;"><span class="${evaluation.result.toLowerCase()}">${evaluation.result}</span></td>
          </tr>
          <tr class="notes-row" ${evaluation === evals[evals.length - 1] ? 'style="border-bottom: none;"' : ''}>
            <td colspan="2" class="notes-cell">
              ${evaluation.note || ''}
              ${evaluation !== evals[evals.length - 1] ? '<div style="margin-bottom: 20px;"></div>' : ''}
            </td>
          </tr>
          `).join('')}
        </mj-table>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          Our team appreciates your continued partnership and is available to discuss these results in more detail if needed.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          Vett appreciates your business and looks forward to working with you again in the future.
          <br/><br/>
          Thank you!
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b">
      <mj-column>
        <mj-text color="#94a3b8" font-size="12px" align="center">
          This is a confidential hiring communication. Please do not forward or share this information.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export async function load({ locals }) {
    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user) {
        throw redirect(303, "/login");
    } else {
        if (response.data.user.id !== VETT_ADMIN_UUID1 && response.data.user.id !== VETT_ADMIN_UUID2) {
            redirect(303, "/profile")
        }
    }

    let { data: orders, error: orderError } = await supa_client
        .from('orders')
        .select("*")

    if (orderError) {
        console.error('Error fetching orders:', orderError);
        return { user: response.data.user, tasks: [] };
    }

    if (orders) {
        const tasks: Task[] = (await Promise.all(orders.map(async (order) => {
            const { data: companyData, error: companyError } = await supa_client
                .from('clients')
                .select('*')
                .contains('users', [order.created_by])
                .single();

            if (companyError) {
                console.error('Error fetching company data:', companyError);
                return null;
            }

            const { data: userData, error: userError } = await supa_client.auth.admin.getUserById(order.created_by)

            if (userError) {
                console.error('Error fetching user data:', userError);
                return null;
            }

            const { data: files } = await supa_client
                .storage
                .from('logos')
                .list('clients/', {
                    search: `${companyData.id}.webp`
                });


            const clientImage = files && files.length > 0
                ? (await (supa_client.storage
                    .from('logos')
                    .createSignedUrl(`clients/${companyData.id}.webp`, 604800)) // 3600 seconds = 1 hour
                )
                    .data?.signedUrl
                : null;

            let emails = JSON.stringify(order.emails)
            let parsed_emails: [string, boolean | "fail"][] = JSON.parse(emails)

            const task: Task = {
                Company_id: companyData.id,
                Company_name: companyData.company_name || '',
                Date: formatDate(order.created_at),
                Eval_steps: order.eval_steps,
                Manager_id: order.created_by,
                Manager: userData.user.email as string,
                Order_id: order.id.toString(),
                Role: order.role,
                Candidates: order.candidates,
                Emails: parsed_emails,
                Onboarding: order.onboarding,
                Skills: order.skills,
                Status: (order.status as "In-Progress" | "Pending" | "Completed") || "Pending",  // Provide a default value
                Type: (order.checkpoint as "onboarding" | "completed" | "create_takehome" | "tech_interview" | "update") || "update",  // Provide a default value
                Logo: clientImage
            };

            return task;
        }))).filter((task): task is Task => task !== null);  // Type guard to remove null values

        return {
            user: response.data.user,
            tasks
        };
    }
}

export const actions = {
    sendCandidateEmails: async ({ request }) => {
        try {
            const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
            const page_formData = await request.formData()

            const supabase_emails_column = page_formData.get('supabase_emails_column')?.toString() || '[]';
            const emailsAsString = page_formData.get('emails_as_string')?.toString() || '[]';
            const emailBody = page_formData.get('email_body')?.toString() || '';
            const company_name = page_formData.get('company_name')?.toString() || '';
            const order_id = page_formData.get('order_id')?.toString() || '';
            const DOMAIN = MAILGUN_DOMAIN || '';
            const FROM_EMAIL = 'Vett <noreply@vett.dev>';

            const existingEmails: Array<[string, boolean | "fail"]> = JSON.parse(JSON.parse(supabase_emails_column || '[]'));

            // Mailgun Client
            const mailgun = new Mailgun(formData);
            const mg = mailgun.client({
                username: 'api',
                key: MAILGUN_API_KEY || ''
            });

            const targetedEmails: string[] = JSON.parse(emailsAsString);

            if (!targetedEmails.length) {
                return {
                    success: false,
                    error: 'No email addresses provided'
                };
            }

            // Send emails to each recipient and track results
            const emailPromises = targetedEmails.map(async (email) => {
                const messageData = {
                    from: FROM_EMAIL,
                    to: email,
                    subject: `Schedule your technical interview - ${company_name}`,
                    html: emailBody.replace(/\n/g, '<br>'),
                    text: emailBody
                };

                try {
                    await mg.messages.create(DOMAIN, messageData);
                    // Find and update matching email in array
                    for (let i = 0; i < existingEmails.length; i++) {
                        if (existingEmails[i][0] === email) {
                            existingEmails[i][1] = true;
                            break;
                        }
                    }
                    return { email, success: true };
                } catch (error) {
                    console.error(`Failed to send email to ${email}:`, error);
                    // Find and update matching email in array
                    for (let i = 0; i < existingEmails.length; i++) {
                        if (existingEmails[i][0] === email) {
                            existingEmails[i][1] = "fail";
                            break;
                        }
                    }
                    return { email, success: false, error };
                }
            });

            // Wait for all emails to be sent
            await Promise.all(emailPromises);

            // Update Supabase with modified existing emails array
            const { data, error } = await supa_client
                .from('orders')
                .update({
                    status: "In-Progress",
                    checkpoint: "tech_interview",
                    emails: JSON.stringify(existingEmails)
                })
                .eq("id", order_id)
                .select();

            if (error) {
                console.error('Error updating data:', error);
                return {
                    success: false,
                    error: 'Failed to update database'
                };
            }

            return {
                success: true,
                updatedData: data
            };
        } catch (error) {
            console.error('Email sending failed:', error);
            return {
                success: false,
                error: 'Failed to send emails'
            };
        }
    },
    resendEmail: async ({ request }) => {
        try {
            const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
            const page_formData = await request.formData()
            const supabase_emails_column = page_formData.get('resend_supabase_emails_column')?.toString() || '[]';
            const email_address = page_formData.get('resend_email_address')?.toString().trim() || '';
            const magic_link = page_formData.get('resend_magic_link')?.toString() || '';
            const company_name = page_formData.get('resend_email_company_name')?.toString() || '';
            const order_id = page_formData.get('resend_order_id')?.toString() || '';
            const DOMAIN = MAILGUN_DOMAIN || '';
            const FROM_EMAIL = 'Vett <noreply@vett.dev>';
            let emailExists: boolean = false

            // Parse existing emails from Supabase
            const existingEmails: Array<[string, boolean | "fail"]> = JSON.parse(JSON.parse(supabase_emails_column || '[]'));

            // Check if email exists in the column
            if (Array.isArray(existingEmails)) {
                emailExists = existingEmails.some(([email]) => email === email_address);
            }


            if (!emailExists) {
                console.log("Email not present in column");
                return {
                    success: false,
                    error: 'Email address not found in database'
                };
            }

            const mailgun = new Mailgun(formData);
            const mg = mailgun.client({
                username: 'api',
                key: MAILGUN_API_KEY || ''
            });

            // const messageData = {
            //     from: FROM_EMAIL,
            //     to: email_address,
            //     subject: `Schedule your technical interview - ${company_name}`,
            //     html: emailBody.replace(/\n/g, '<br>'),
            //     text: emailBody
            // };

            try {
                // await mg.messages.create(DOMAIN, messageData);

                // Update the status in existingEmails array
                for (let i = 0; i < existingEmails.length; i++) {
                    if (existingEmails[i][0] === email_address) {
                        existingEmails[i][1] = true;
                        break;
                    }
                }


                // Update Supabase with modified existing emails array
                const { data, error } = await supa_client
                    .from('orders')
                    .update({
                        emails: JSON.stringify(existingEmails),
                    })
                    .eq("id", order_id)
                    .select();

                if (error) {
                    console.error('Error updating data:', error);
                    return {
                        success: false,
                        error: 'Failed to update database'
                    };
                }

                return {
                    success: true,
                    updatedData: data
                };

            } catch (error) {
                console.error(`Failed to send email to ${email_address}:`, error);

                // Update the status to "fail" in existingEmails array
                for (let i = 0; i < existingEmails.length; i++) {
                    if (existingEmails[i][0] === email_address) {
                        existingEmails[i][1] = "fail";
                        break;
                    }
                }

                // Update Supabase with failed status
                const { error: supaError } = await supa_client
                    .from('orders')
                    .update({
                        emails: JSON.stringify(existingEmails)
                    })
                    .eq("id", order_id)
                    .select();

                return {
                    success: false,
                    error: 'Failed to send email'
                };
            }

        } catch (error) {
            console.error('Email sending failed:', error);
            return {
                success: false,
                error: 'Failed to resend email'
            };
        }
    },
    finalizeResults: async ({ request }) => {
        try {
            const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
            const page_formData = await request.formData();

            const order_id = page_formData.get('result_order_id')?.toString() || '';
            const evaluations = page_formData.get('evaluations')?.toString() || '';
            const manager_uuid = page_formData.get('manager_uuid')?.toString() || '';
            const company_name = page_formData.get('company_name')?.toString() || '';
            let manager_name_or_email: string = '';

            const DOMAIN = MAILGUN_DOMAIN || '';
            const FROM_EMAIL = 'Vett <noreply@vett.dev>';

            if (!evaluations || typeof evaluations !== 'string') {
                return { success: false, error: 'No evaluations data received' };
            }

            const evals: Evaluation[] = JSON.parse(evaluations);

            // Get manager name or use company name
            const response = await supa_client.auth.admin.getUserById(manager_uuid);
            manager_name_or_email = response.data.user
                ? response.data.user.user_metadata.display_name
                : company_name;

            // Generate email HTML from MJML template
            const mjmlTemplate = getMJMLTemplate(manager_name_or_email, evals);
            const { html } = mjml2html(mjmlTemplate);

            // Setup mailgun
            const mailgun = new Mailgun(FormData);
            const mg = mailgun.client({
                username: 'api',
                key: MAILGUN_API_KEY || ''
            });

            // // Send email
            const emailResult = await mg.messages.create(DOMAIN, {
                from: FROM_EMAIL,
                to: response.data.user?.email,
                subject: 'Vett Evaluation Results',
                html: html
            });

            const { data, error: supaError } = await supa_client
                .from('orders')
                .update({
                    checkpoint: "completed",
                    status: "Completed"
                })
                .eq("id", order_id)
                .select();

            if (supaError) {
                throw supaError;
            }

            return {
                success: true,
                message: 'Results finalized and email sent successfully',
                updatedData: data,
                emailResult
            };
        } catch (error) {
            console.error('Failed to Finalize Results:', error);
            return {
                success: false,
                error: 'Failed to process results'
            };
        }
    },
    saveEvaluationSteps: async ({ request }) => {
        const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
        const page_formData = await request.formData();

        const evaluation_steps = page_formData.get('evaluation_steps')?.toString() || '';
        const eval_order_id = page_formData.get('eval_order_id')?.toString() || '';

        const { data, error: supaError } = await supa_client
            .from('orders')
            .update({
                eval_steps: evaluation_steps
            })
            .eq("id", eval_order_id)
            .select();

        if (supaError) {
            return fail(500, {
                success: false,
                message: `Failed to write to DB: ${supaError.message}`,
            })
        }

        return {
            success: true
        }
    }
};
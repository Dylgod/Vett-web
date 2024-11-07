import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

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
    }

    let { data: orders, error: orderError } = await supa_client
        .from('orders')
        .select("*")
        .neq('status', "Completed");

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
                Manager_id: order.created_by,
                Manager: userData.user.email as string,
                Order_id: order.id.toString(),
                Role: order.role,
                Candidates: order.candidates,
                Emails: parsed_emails,
                Onboarding: order.onboarding,
                Skills: order.skills,
                Status: (order.status as "In-Progress" | "Pending" | "Completed") || "Pending",  // Provide a default value
                Type: (order.checkpoint as "onboarding" | "review" | "create_takehome" | "tech_interview" | "update") || "review",  // Provide a default value
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

            // Parse existing emails from Supabase
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
                    // await mg.messages.create(DOMAIN, messageData);
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
    }
}
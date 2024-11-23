import { createClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import { SERVICE_ROLE, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase';
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import Mailgun from 'mailgun.js';
import mjml2html from 'mjml';

function getOnboardingSection(magic_link: string): string {
    return `
      <mj-section background-color="#1e293b" padding-top="20px">
        <mj-column>
          <mj-text color="#e2e8f0" align="center">
            To schedule your Strategy meeting, click the button below:
          </mj-text>
          <mj-button href="${magic_link}" 
                     background-color="#3b82f6" 
                     color="#ffffff" 
                     border-radius="6px" 
                     padding="15px 30px">
            Schedule Strategy Meeting
          </mj-button>
        </mj-column>
      </mj-section>
    `;
}

function getEditOnboardingSection(magic_link: string): string {
    return `
      <mj-section background-color="#1e293b" padding-top="20px">
        <mj-column>
          <mj-text color="#e2e8f0" align="center">
            If you have already scheduled your strategy meeting, you may disregard this button:
          </mj-text>
          <mj-button href="${magic_link}" 
                     background-color="#3b82f6" 
                     color="#ffffff" 
                     border-radius="6px" 
                     padding="15px 30px">
            Schedule Strategy Meeting
          </mj-button>
        </mj-column>
      </mj-section>
    `;
}

const getOrderConfirmationTemplate = (id_of_order: string, magic_link: string, candidate_emails: string[], onboarding: boolean) => `
<mjml>
  <mj-head>
    <mj-title>Order Confirmation</mj-title>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.5" />
    </mj-attributes>
    <mj-style>
      .highlight { color: #60a5fa; font-weight: bold; }
      .order-row { background-color: #1e293b; }
      .button {
        background-color: #3b82f6;
        border-radius: 6px;
        color: #ffffff;
      }
      .divider {
        border-bottom: 1px solid #334155;
        margin: 20px 0;
      }
    </mj-style>
  </mj-head>

  <mj-body background-color="#0f172a">
    <mj-section background-color="#1e293b" padding-bottom="0px">
      <mj-column>
        <mj-text font-size="24px" color="#e2e8f0" font-weight="bold" align="center">
          Order Confirmed
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b" padding-top="20px">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          Thank you for your order!
          <br/><br/>
          We're pleased to confirm that your order <span class="highlight">#${id_of_order}</span> has been received and is being processed.
        </mj-text>
      </mj-column>
    </mj-section>
        
    ${onboarding ? getOnboardingSection(magic_link) : ''}

    <mj-section background-color="#1e293b" padding="20px">
      <mj-column>
        <mj-text color="#e2e8f0" font-weight="bold" font-size="16px">
          Order Details
        </mj-text>
        <mj-table color="#e2e8f0">
          <tr style="border-bottom: 2px solid #334155; text-align: left; background-color: #334155;">
            <th style="padding: 15px; color: #e2e8f0;">Candidate</th>
            <th style="padding: 15px; color: #e2e8f0;">Email Address</th>
          </tr>
          ${candidate_emails.map((email, index) => `
          <tr class="order-row" style="border-bottom: 1px solid #334155;">
            <td style="padding: 15px;">${index + 1}</td>
            <td style="padding: 15px; color: #60a5fa;">${email}</td>
          </tr>
          `).join('')}
        </mj-table>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          If you have any questions about your order, please don't hesitate to contact our customer support team at <span class="highlight">support@vett.dev</span>.
          <br/><br/>
          We appreciate your business!
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b" padding-top="0">
      <mj-column>
        <mj-text color="#94a3b8" font-size="12px" align="center">
          This email confirms your order. Please keep it for your records.
          <br/>
          © 2024 Vett. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const getEditOrderTemplate = (id_of_order: string, magic_link: string, candidate_emails: string[], onboarding: boolean) => `
<mjml>
  <mj-head>
    <mj-title>Order Updated</mj-title>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
      <mj-text font-size="14px" line-height="1.5" />
    </mj-attributes>
    <mj-style>
      .highlight { color: #60a5fa; font-weight: bold; }
      .order-row { background-color: #1e293b; }
      .button {
        background-color: #3b82f6;
        border-radius: 6px;
        color: #ffffff;
      }
      .divider {
        border-bottom: 1px solid #334155;
        margin: 20px 0;
      }
    </mj-style>
  </mj-head>

  <mj-body background-color="#0f172a">
    <mj-section background-color="#1e293b" padding-bottom="0px">
      <mj-column>
        <mj-text font-size="24px" color="#e2e8f0" font-weight="bold" align="center">
          Order Updated
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b" padding-top="20px">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          Thank you for your order!
          <br/><br/>
          Your order <span class="highlight">#${id_of_order}</span> has been updated and is being reviewed by staff.
        </mj-text>
      </mj-column>
    </mj-section>

    ${onboarding ? getEditOnboardingSection(magic_link) : ''}

    <mj-section background-color="#1e293b" padding="20px">
      <mj-column>
        <mj-text color="#e2e8f0" font-weight="bold" font-size="16px">
          Order Details
        </mj-text>
        <mj-table color="#e2e8f0">
          <tr style="border-bottom: 2px solid #334155; text-align: left; background-color: #334155;">
            <th style="padding: 15px; color: #e2e8f0;">Candidate</th>
            <th style="padding: 15px; color: #e2e8f0;">Email Address</th>
          </tr>
          ${candidate_emails.map((email, index) => `
          <tr class="order-row" style="border-bottom: 1px solid #334155;">
            <td style="padding: 15px;">${index + 1}</td>
            <td style="padding: 15px; color: #60a5fa;">${email}</td>
          </tr>
          `).join('')}
        </mj-table>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b">
      <mj-column>
        <mj-text color="#e2e8f0" line-height="1.6">
          If you have any questions about your order, please don't hesitate to contact our customer support team at <span class="highlight">support@vett.dev</span>.
          <br/><br/>
          We appreciate your business!
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#1e293b" padding-top="0">
      <mj-column>
        <mj-text color="#94a3b8" font-size="12px" align="center">
          This email confirms your order update. Please keep it for your records.
          <br/>
          © 2024 Vett. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const POST = async ({ request }: RequestEvent) => {
    const req = await request.text();

    if (!STRIPE_WEBHOOK_SECRET) {
        return new Response(`NO STRIPE_WEBHOOK_SECRET`, {
            status: 500
        });
    }

    const signature = request.headers.get('stripe-signature');
    if (!req || !signature) {
        return new Response(`Missing required webhook data`, {
            status: 400
        });
    }

    try {
        const event = stripe.webhooks.constructEvent(req, signature, STRIPE_WEBHOOK_SECRET);

        switch (event.type) {
            case 'checkout.session.completed':
                const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
                const FROM_EMAIL = 'Vett <noreply@vett.dev>';
                const DOMAIN = MAILGUN_DOMAIN || '';
                const manager_uuid = event.data.object.metadata?.created_by || ''

                const response = await supa_client.auth.admin.getUserById(manager_uuid);
                const customer_email = response.data.user?.email || ""

                const skills: string[] = JSON.parse(event.data.object.metadata?.skills || '[]');

                // Parse and normalize emails
                const emailsData = event.data.object.metadata?.emails || '[]';
                let normalizedEmails: string;
                let emails_as_list: string[]

                try {
                    const parsedEmails = JSON.parse(emailsData);

                    if (!Array.isArray(parsedEmails)) {
                        throw new Error('Emails data is not an array');
                    }

                    if (parsedEmails.length === 0) {
                        normalizedEmails = '[]';
                        emails_as_list = [];
                    } else if (Array.isArray(parsedEmails[0])) {
                        // Already in [email, boolean] format
                        normalizedEmails = emailsData;
                        emails_as_list = parsedEmails.map((item: string) => item[0]);
                    } else {
                        // Convert simple string array to [email, boolean] format
                        const emailTuples = parsedEmails.map((email: string) => [email, false]);

                        emails_as_list = parsedEmails.map((item: string) => item[0]);

                        normalizedEmails = JSON.stringify(emailTuples);
                    }
                } catch (e) {
                    console.error('Error normalizing emails:', e);
                    normalizedEmails = '[]';
                    emails_as_list = [];
                }

                // This order_id is only used in editing an order. do not del
                const order_id = event.data.object.metadata?.order_id;
                const is_update = event.data.object.metadata?.update === "1";

                if (is_update && order_id) {
                    // Handle order update
                    try {
                        // Get existing order to preserve email statuses
                        const { data: existingOrder, error: fetchError } = await supa_client
                            .from('orders')
                            .select('emails')
                            .eq('id', parseInt(order_id))
                            .single();

                        if (fetchError) throw fetchError;

                        let finalEmails = normalizedEmails;

                        if (existingOrder?.emails) {
                            try {
                                const existingEmailData = JSON.parse(existingOrder.emails as string);
                                const newEmailData = JSON.parse(normalizedEmails);

                                // Create map of existing email statuses
                                const emailMap = new Map(
                                    Array.isArray(existingEmailData[0])
                                        ? existingEmailData
                                        : existingEmailData.map((email: string) => [email, false])
                                );

                                // Create new array preserving existing statuses
                                const mergedEmails = newEmailData.map((entry: string | [string, boolean]) => {
                                    const email = Array.isArray(entry) ? entry[0] : entry;
                                    return [email, emailMap.has(email) ? emailMap.get(email) : false];
                                });

                                finalEmails = JSON.stringify(mergedEmails);
                            } catch (e) {
                                console.error('Error merging emails:', e);
                                // Fallback to normalized emails if merge fails
                                finalEmails = normalizedEmails;
                            }
                        }

                        const { data: orderData, error: updateError } = await supa_client
                            .from('orders')
                            .update({
                                candidates: parseInt(event.data.object.metadata?.candidates || '0'),
                                role: event.data.object.metadata?.role || '',
                                onboarding: event.data.object.metadata?.onboarding === '1',
                                skills: skills,
                                checkpoint: "update",
                                emails: finalEmails
                            })
                            .eq("id", parseInt(order_id))
                            .select();

                        if (updateError) throw updateError;
                        if (!orderData || orderData.length === 0) throw new Error('No order data returned');

                        const mjmlTemplate = getEditOrderTemplate(order_id, "http://localhost:5174/vett-dev/strategy-meeting", emails_as_list, event.data.object.metadata?.onboarding === '1');
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
                            to: customer_email,
                            subject: 'Vett Order Update',
                            html: html
                        });

                    } catch (error) {
                        console.error('Error updating order:', error);
                        return new Response(`Failed to update order`, {
                            status: 500
                        });
                    }
                } else {
                    // Handle new order creation
                    try {
                        const { data: orderData, error: insertError } = await supa_client
                            .from('orders')
                            .insert({
                                created_for: parseInt(event.data.object.metadata?.created_for || '0'),
                                created_by: event.data.object.metadata?.created_by || '',
                                candidates: parseInt(event.data.object.metadata?.candidates || '0'),
                                role: event.data.object.metadata?.role || '',
                                onboarding: event.data.object.metadata?.onboarding === '1',
                                skills: skills,
                                status: "Pending",
                                checkpoint: event.data.object.metadata?.checkpoint || '',
                                emails: normalizedEmails
                            })
                            .select();

                        if (insertError) throw insertError;
                        if (!orderData || orderData.length === 0) throw new Error('No order data returned');

                        const the_order_id: string = orderData[0].id.toString();
                        const mjmlTemplate = getOrderConfirmationTemplate(the_order_id, "http://localhost:5174/vett-dev/strategy-meeting", emails_as_list, event.data.object.metadata?.onboarding === "1");
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
                            to: customer_email,
                            subject: 'Vett Order Confirmation',
                            html: html
                        });

                    } catch (error) {
                        console.error('Error creating order:', error);
                        return new Response(`Failed to create order`, {
                            status: 500
                        });
                    }
                }

                break;
        }

        return new Response(null, { status: 200 });

    } catch (err) {
        console.error('Webhook error:', err);
        return new Response(
            `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
            { status: 400 }
        );
    }
}
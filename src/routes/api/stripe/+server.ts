import { createClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import { SERVICE_ROLE, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase';

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

                // Parse skills
                const skills: string[] = JSON.parse(event.data.object.metadata?.skills || '[]');

                // Parse and normalize emails
                const emailsData = event.data.object.metadata?.emails || '[]';
                let normalizedEmails: string;

                try {
                    const parsedEmails = JSON.parse(emailsData);
                    if (!Array.isArray(parsedEmails)) {
                        throw new Error('Emails data is not an array');
                    }

                    if (parsedEmails.length === 0) {
                        normalizedEmails = '[]';
                    } else if (Array.isArray(parsedEmails[0])) {
                        // Already in [email, boolean] format
                        normalizedEmails = emailsData;
                    } else {
                        // Convert simple string array to [email, boolean] format
                        const emailTuples = parsedEmails.map((email: string) => [email, false]);
                        normalizedEmails = JSON.stringify(emailTuples);
                    }
                } catch (e) {
                    console.error('Error normalizing emails:', e);
                    normalizedEmails = '[]';
                }

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

                        const { error: updateError } = await supa_client
                            .from('orders')
                            .update({
                                candidates: parseInt(event.data.object.metadata?.candidates || '0'),
                                role: event.data.object.metadata?.role || '',
                                onboarding: event.data.object.metadata?.onboarding === '1',
                                skills: skills,
                                status: "Pending",
                                checkpoint: "update",
                                emails: finalEmails
                            })
                            .eq("id", parseInt(order_id))
                            .select();

                        if (updateError) throw updateError;

                    } catch (error) {
                        console.error('Error updating order:', error);
                        return new Response(`Failed to update order`, {
                            status: 500
                        });
                    }
                } else {
                    // Handle new order creation
                    try {
                        const { error: insertError } = await supa_client
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
import { createClient } from '@supabase/supabase-js';
import type { RequestEvent } from '@sveltejs/kit';
import { stripe } from '$lib/stripe';
import { SERVICE_ROLE, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase';

export const POST = async ({ request }: RequestEvent) => {
    const req = await request.text();

    if (STRIPE_WEBHOOK_SECRET) {
        const signature = request.headers.get('stripe-signature');
        if (req && signature && STRIPE_WEBHOOK_SECRET) {
            const event = stripe.webhooks.constructEvent(req, signature, STRIPE_WEBHOOK_SECRET);

            switch (event.type) {
                case 'checkout.session.completed':
                    // We pass a 'client reference id' which is actually the user id from supabase, or null if they skipped the free trial
                    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)

                    let skills: string[] = JSON.parse(event.data.object.metadata?.skills!)
                    let emails: string = event.data.object.metadata?.emails!

                    let order_id: string | null = event.data.object.metadata?.order_id ?? null
                    let is_update: boolean = event.data.object.metadata?.update == "1" ? true : false
                    if (is_update) {
                        if (order_id) {
                            const { data, error } = await supa_client
                                .from('orders')
                                .update(
                                    {
                                        candidates: parseInt(event.data.object.metadata?.candidates!),
                                        role: event.data.object.metadata?.role!,
                                        onboarding: event.data.object.metadata?.onboarding ? true : false,
                                        skills: skills,
                                        status: "Pending",
                                        checkpoint: "update",
                                        emails: emails
                                    }
                                )
                                .eq("id", parseInt(order_id))
                                .select()

                            if (error) {
                                return new Response(`FAILED TO EDIT SUPABASE ROW`, {
                                    status: 500
                                })
                            }
                        } else {
                            return new Response(`Failed to edit supabase row - order_id is null`, {
                                status: 500
                            })
                        }
                    } else {
                        const { data, error } = await supa_client
                            .from('orders')
                            .insert(
                                {
                                    created_for: parseInt(event.data.object.metadata?.created_for!),
                                    created_by: event.data.object.metadata?.created_by,
                                    candidates: parseInt(event.data.object.metadata?.candidates!),
                                    role: event.data.object.metadata?.role!,
                                    onboarding: event.data.object.metadata?.onboarding ? true : false,
                                    skills: skills,
                                    status: "Pending",
                                    checkpoint: event.data.object.metadata?.checkpoint,
                                    emails: emails
                                }
                            )
                            .select()

                        if (error) {
                            return new Response(`FAILED TO CREATE SUPABASE ROW`, {
                                status: 500
                            })
                        }
                    }
            }
        }
        return new Response()
    } else {
        return new Response(`NO STRIPE_WEBHOOK_SECRET`, {
            status: 500
        })
    }
}

import { invalidateAll } from '$app/navigation';
import { SERVICE_ROLE, PRODUCT_PRICE_IN_PENNIES, PRICE_ID } from '$env/static/private';
import { PUBLIC_HOSTNAME, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { stripe } from '$lib/stripe';
import type { Database, Tables } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user) {
        redirect(303, "/login")
    } else {
        let { data: client, error } = await supa_client
            .from('clients')
            .select("*")
            .contains('users', [response.data.user.id])
            .limit(1)
            .single()

        if (!client) {
            // RE-ENABLE AFTER TESTING -- WORKING
            // const { data, error } = await supa_client.auth.admin.deleteUser(
            //     response.data.user.id
            //   )
            // await locals.supabase.auth.signOut()
            // redirect(303 ,"/")
            console.log("no client")
        }

        let { data: orders, error: ordererror } = await supa_client
            .from('orders')
            .select("*")
            .eq('created_by', response.data.user.id)

        return {
            user: response.data.user,
            name: response.data.user.user_metadata.display_name,
            Company_id: client?.id,
            Company_name: client?.company_name,
            owner: client?.owner,
            orders,
            // Logo: client?.logo  <--- TODO!
        }
    }
}

export const actions = {
    submitorder: async ({ locals, request, url }) => {
        // get formdata -> create payload -> query stripe -> response 200 = create row and send email to created_by with magic links for calendly
        const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
        const { data: { user }, error: authError } = await locals.supabase.auth.getUser();

        if (authError || !user) {
            console.log("authError || !user")
            throw redirect(303, "/profile"); // if not logged in profile redirects to login. If they are and they get redirected then problem occurs
        }
        const formData = await request.formData()

        const candidates = parseInt(formData.get("candidates")?.toString() || "")
        const role = (formData.get("role")?.toString() || "").trim()
        const onboarding = formData.has("onboarding");
        const skillsFormData = (formData.get("skills")?.toString() || "")

        let checkpoint: string = "onboarding";

        if (onboarding) {
            checkpoint = "onboarding"
        } else {
            checkpoint = "create_takehome"
        }

        const { data: client, error: clientError } = await supa_client
            .from('clients')
            .select("*")
            .or(`owner.eq.${user.id},admins.cs.{${user.id}}`)
            .single();

        if (client) {
            let created_for = client.id
            let created_by = user.id

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: PRICE_ID,
                        quantity: candidates
                    }
                ],
                mode: 'payment',
                success_url: `${PUBLIC_HOSTNAME}/profile?success=${150000 * candidates}`,
                cancel_url: `${PUBLIC_HOSTNAME}/profile`,
                automatic_tax: { enabled: true },
                customer_creation: 'if_required',
                client_reference_id: client.id.toString(),
                metadata: {
                    created_for: created_for,
                    created_by: created_by,
                    candidates: candidates,
                    role: role,
                    onboarding: onboarding ? 1 : 0,
                    skills: skillsFormData,
                    status: "Pending",
                    checkpoint: checkpoint
                }
            });

            if (session.url) {
                redirect(303, session.url)
            } else {
                throw new Error('Failed to redirect you to Stripe')
            }
        }
    },
    editorder: async ({ locals, request, url }) => {
        const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
        const { data: { user }, error: authError } = await locals.supabase.auth.getUser();

        if (authError || !user) {
            console.log("authError || !user")
            throw redirect(303, "/profile"); // if not logged in profile redirects to login. If they are and they get redirected then problem occurs
        }

        const formData = await request.formData()
        const candidates = parseInt(formData.get("candidates")?.toString() || "")
        const candidates_before_edit = parseInt(formData.get("candidates")?.toString() || "")
        const role = (formData.get("role")?.toString() || "").trim()
        const onboarding = formData.has("onboarding");
        const skillsFormData = (formData.get("skills")?.toString() || "")
        const order_id = parseInt(formData.get("order_id")?.toString() || "")

        const skills: string[] = JSON.parse(skillsFormData);
        // check if num candidates has increased and if so, redirect to stripe
        if (candidates - candidates_before_edit > 0) {
            let remainder: number = candidates - candidates_before_edit

            const { data: client, error: clientError } = await supa_client
                .from('clients')
                .select("*")
                .or(`owner.eq.${user.id},admins.cs.{${user.id}}`)
                .single();

            if (client) {
                let created_for = client.id
                let created_by = user.id

                const session = await stripe.checkout.sessions.create({
                    line_items: [
                        {
                            price: PRICE_ID,
                            quantity: remainder
                        }
                    ],
                    mode: 'payment',
                    success_url: `${PUBLIC_HOSTNAME}/profile?success=${150000 * remainder}`,
                    cancel_url: `${PUBLIC_HOSTNAME}/profile`,
                    automatic_tax: { enabled: true },
                    customer_creation: 'if_required',
                    client_reference_id: client.id.toString(),
                    metadata: {
                        created_for: created_for,
                        created_by: created_by,
                        candidates: candidates,
                        role: role,
                        onboarding: onboarding ? 1 : 0,
                        skills: skillsFormData,
                        status: "Pending",
                        checkpoint: "update",
                        update: true ? 1 : 0,
                        order_id: order_id
                    }
                });

                if (session.url) {
                    redirect(303, session.url)
                } else {
                    throw new Error('Failed to redirect you to Stripe')
                }
            }

        } else {
            const { data, error } = await supa_client
                .from('orders')
                .update(
                    {
                        candidates: candidates,
                        role: role,
                        onboarding: onboarding,
                        skills: skills,
                        checkpoint: "update"
                    }
                )
                .eq("id", order_id)
                .select()

            if (error) {
                console.error('Error updating data:', error);
            } else {
                console.log('Data updated successfully:', data);
                return { success: true };
            }
        }
    },
    updateUser: async ({ locals, request, url }) => {
        const formData = await request.formData()
        const Fullname = (formData.get("new_profile_name")?.toString() || "").trim()
        const { data, error } = await locals.supabase.auth.updateUser(
            {
                data: { display_name: Fullname }
            })
        if (!error) {
            redirect(303, "/profile")
        }
    }
}
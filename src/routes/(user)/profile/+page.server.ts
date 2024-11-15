import { SERVICE_ROLE, PRICE_ID } from '$env/static/private';
import { PUBLIC_HOSTNAME, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { stripe } from '$lib/stripe';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
    const response = await locals.supabase.auth.getUser();
    let rank: string = "user";

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

        if (client?.owner === response.data.user.id) {
            rank = "owner"
        } else if (client?.admins?.includes(response.data.user.id)) {
            rank = "admin"
        }

        const { data: files } = await supa_client
            .storage
            .from('logos')
            .list('people/', {
                search: `${response.data.user.id}.webp`
            });


        const profileImage = files && files.length > 0
            ? (await (supa_client.storage
                .from('logos')
                .createSignedUrl(`people/${response.data.user.id}.webp`, 604800)) // 3600 seconds = 1 hour
            ) // 3600 seconds = 1 hour
                .data?.signedUrl
            : null;



        return {
            user: response.data.user,
            name: response.data.user.user_metadata.display_name,
            Company_id: client?.id,
            Company_name: client?.company_name,
            orders,
            rank,
            profileImage
        }
    }
}

export const actions = {
    submitorder: async ({ locals, request, url }) => {
        const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
        const { data: { user }, error: authError } = await locals.supabase.auth.getUser();

        if (authError || !user) {
            console.log("authError || !user")
            throw redirect(303, "/profile");
        }

        const formData = await request.formData();

        // Safely get and parse form data with defaults
        const candidates = Number(formData.get("candidates")) || 0;
        const role = formData.get("role")?.toString().trim() || "";
        const onboarding = formData.get("onboarding") === "true";
        const skillsFormData = formData.get("skills")?.toString() || "";
        const candidateEmails = formData.get("candidate_emails")?.toString() || "";

        let checkpoint: string = onboarding ? "onboarding" : "create_takehome";
        
        const { data: client, error: clientError } = await supa_client
            .from('clients')
            .select("*")
            .or(`owner.eq.${user.id},admins.cs.{${user.id}}`)
            .single();

        if (client) {
            let created_for = client.id;
            let created_by = user.id;

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
                    checkpoint: checkpoint,
                    emails: candidateEmails
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
        const candidates_before_edit = parseInt(formData.get("candidates_before_edit")?.toString() || "")
        const role = (formData.get("role")?.toString() || "").trim()
        const onboarding = formData.has("onboarding");
        const skillsFormData = (formData.get("skills")?.toString() || "")
        const emailsFormData = (formData.get("candidate_emails")?.toString() || "")
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
                        order_id: order_id,
                        emails: emailsFormData
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
                        checkpoint: "update",
                        emails: emailsFormData
                    }
                )
                .eq("id", order_id)
                .select()

            if (error) {
                console.error('Error updating data:', error);
            } else {
                return { success: true };
            }
        }
    },
    updateProfile: async ({ request, locals }) => {
        const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
        const { data: { user }, error: authError } = await locals.supabase.auth.getUser();

        if (authError || !user) {
            redirect(303, "/profile");
        }

        const formData = await request.formData();
        const newName = (formData.get("new_profile_name")?.toString() || "").trim();
        const oldName = (formData.get("old_profile_name")?.toString() || "").trim();
        const imageFile = formData.get('image') as File | null;


        try {
            // Only update name if it changed
            if (newName && newName !== oldName) {
                const { error: nameError } = await locals.supabase.auth.updateUser({
                    data: { display_name: newName }
                });
                if (nameError) throw nameError;
            }

            // Only upload image if one was provided
            if (imageFile) {
                const { data: imageData, error: imageError } = await supa_client
                    .storage
                    .from('logos/people')
                    .upload(`${user.id}.webp`, imageFile, {
                        upsert: true
                    });

                if (imageError) throw imageError;

                return { success: true, path: imageData.path };
            }
            return { success: true };

        } catch (error) {
            console.error("Update failed:", error);
            return fail(500, {
                message: 'Failed to update profile',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
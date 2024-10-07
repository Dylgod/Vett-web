import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database, Tables } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user){
        redirect(303 ,"/login")
    } else {
        let { data: client, error } = await supa_client
        .from('clients')
        .select("*")
        .contains('users', [response.data.user.id])
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
            Company_id: client?.id,
            Company_name: client?.company_name,
            orders,
            // Logo: client?.logo  <--- TODO!
        }
    }
}

export const actions = {
    submitorder: async ({ locals, request, url }) => {
        const formData = await request.formData()
        const Candidates = (formData.get("candidates")?.toString() || "").trim()
        const Role = (formData.get("role")?.toString() || "").trim()
        const Onboarding = formData.has("onboarding");
        const Skills = (formData.get("skills")?.toString() || "").trim()
        console.log(Candidates)
        console.log(Role)
        console.log(Onboarding)
        console.log(Skills)
        // if (!email) return fail(400, { ok: false, message: "A valid email is needed" })

        // try {
        //     const result = await locals.supabase.auth.signInWithOtp({
        //         email: email,
        //     })
        //     if (result.error) {
        //         throw redirect(303, `/login?error&message=${result.error.message}`)
        //     }

        // } catch (error) {
        //     console.warn("failed to send magic link: ", error)
        //     return fail(500, {
        //         ok: false,
        //         message: "Something went wrong. Please try again",
        //     })
        // }

        // throw redirect(303, `/auth/confirm?email=${email}`)
    }
}
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user){
        redirect(303 ,"/login")
    } else {

        let { data: client, error } = await locals.supabase
        .from('clients')
        .select("*")
        .contains('users', [response.data.user.id])
        .single()

        return {
            user: response.data.user,
            client: client
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
import type { Provider } from "@supabase/supabase-js";
import { error, fail, redirect } from "@sveltejs/kit";

const SENDTO_COOKIE = "path_after_login"
const ENABLED_OAUTH_PROVIDERS = ["google", "apple"]

export async function load({ locals, url, cookies }) {
    // If the user is already logged in, log them out.
    // await locals.supabase.auth.signOut()

    // Save the path to redirect to after login.
    // const sendTo = url.searchParams.get("sendTo")?.toString() || "/"
    // cookies.set(SENDTO_COOKIE, sendTo)

    // checking for expired token or other error
    const expired = url.searchParams.has('error')
    const message = url.searchParams.get('message') as string

    return {
        title: "Login",
        summary: "Login to your account.",
        providers: ENABLED_OAUTH_PROVIDERS,
        expired,
        message,
    }
}

export const actions = {
    // password-less magic link based login.
    magicLogin: async ({ locals, request, url }) => {
        const formData = await request.formData()
        const email = (formData.get("email")?.toString() || "").trim()

        if (!email) return fail(400, { ok: false, message: "A valid email is needed" })

        const result = await locals.supabase.auth.signInWithOtp({
            email: email,
        })
        if (result.error) {
            throw redirect(303, `/login?error&message=${result.error.message}`)
        }

        throw redirect(303, `/auth/confirm?email=${email}`)
    },

    // OAuth based login.
    oauthLogin: async ({ locals, url, request }) => {
        const formData = await request.formData()
        const provider = (formData.get("provider")?.toString() || "").trim()
        if (!ENABLED_OAUTH_PROVIDERS.includes(provider)) {
            console.error("invalid oauth provider: ", provider)
            throw redirect(303, "/auth")
        }

        const { data, error } = await locals.supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: { redirectTo: `${url.origin}/auth/confirm` }
        })
        if (error) {
            console.error("failed to send oauth link: ", error)
            throw redirect(303, "/auth")
        }

        throw redirect(303, data.url)
    },
};

import type { Provider } from "@supabase/supabase-js";
import { error, fail, redirect } from "@sveltejs/kit";
import { PUBLIC_HOSTNAME } from "$env/static/public";

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
    oauthLogin: async ({ request, locals, url }) => {
        const body = Object.fromEntries(await request.formData());
        const provider = url.searchParams.get('provider') as Provider;

        if (provider) {
            const { data, error } = await locals.supabase.auth.signInWithOAuth({
                provider: provider, options: {
                    redirectTo: `${PUBLIC_HOSTNAME}/auth/callback`
                }

            })

            if (error) {
                console.log(error)
                return fail(400, { message: 'Something went wrong' })
            }
            throw redirect(303, data.url)
        }
    },
};

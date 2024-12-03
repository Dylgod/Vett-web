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

    // OAuth based login...
    oauthLogin: async ({ request, locals }) => {
        const formData = await request.formData();
        const provider = formData.get('provider')?.toString();
        console.log('oauthLogin called')
        if (!provider || !['google', 'apple'].includes(provider)) {
            return fail(400, { message: 'Invalid provider' });
        }
        
        const { data, error } = await locals.supabase.auth.signInWithOAuth({
            provider: provider as Provider,
            options: {
                redirectTo: `${PUBLIC_HOSTNAME}/auth/callback`
            }
        });
        console.log('data', data)
        if (error) {
            console.error('OAuth error:', error);
            return fail(400, { message: 'Authentication failed' });
        }

        // make sure site url is correct in supabase under URL configuration
        throw redirect(303, data.url);
    },
};

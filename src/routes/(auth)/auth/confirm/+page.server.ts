import type { ResendParams } from "@supabase/supabase-js";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    if (
        url.searchParams.has('email')
    ) {
        const email = url.searchParams.get('email');

        if (email) {
            return { email }
        }
    };
}

export const actions: Actions = {
    default: async ({ url, locals: { supabase } }) => {
        if (
            url.searchParams.has('email')
        ) {
            const email = url.searchParams.get('email');

            if (email) {
                const params: ResendParams = { type: "signup", email: email }
                const { error } = await supabase.auth.resend(params)
                if (error) {
                    console.error(error)
                }
            }
        }
    }
}
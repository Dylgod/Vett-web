import type { ResendParams } from "@supabase/supabase-js";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { EmailOtpType } from '@supabase/supabase-js'
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ url, locals }) => {
    // if (
    //     url.searchParams.has('email')
    // ) {
    //     const email = url.searchParams.get('email');

    //     if (email) {
    //         return { email }
    //     }
    // };
    const token_hash = url.searchParams.get('token_hash')
    console.log(token_hash)
    const type = url.searchParams.get('type') as EmailOtpType | null
    console.log(type)
    const next = url.searchParams.get('next') ?? '/'
    console.log(next)
    /**
     * Clean up the redirect URL by deleting the Auth flow parameters.
     *
     * `next` is preserved for now, because it's needed in the error case.
     */
    const redirectTo = new URL(url)
    redirectTo.pathname = next
    // redirectTo.searchParams.delete('token_hash')
    // redirectTo.searchParams.delete('type')
  
    if (token_hash && type) {
      const { error } = await locals.supabase.auth.verifyOtp({ token_hash, type })
      console.log(error)
      if (!error) {
        redirectTo.searchParams.delete('next')
        redirect(303, redirectTo)
      }
    } else {
        console.log("No Error found")
        if (
            url.searchParams.has('email')
        ) {
            const email = url.searchParams.get('email');

            if (email) {
                return { email }
            }
        }; 
    }

    // redirectTo.pathname = '/auth/error'
    // redirect(303, redirectTo)
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
import { fail, redirect, type Actions } from "@sveltejs/kit";


const SENDTO_COOKIE = "path_after_login"
const ENABLED_OAUTH_PROVIDERS = ["google", "apple"]

export async function load({ locals, url, cookies }) {
  // If the user is already logged in, log them out.
  await locals.supabase.auth.signOut()

  // Save the path to redirect to after login.
  // const sendTo = url.searchParams.get("sendTo")?.toString() || "/"
  // cookies.set(SENDTO_COOKIE, sendTo)

  return {
    title: "Login",
    summary: "Login to your account.",
    providers: ENABLED_OAUTH_PROVIDERS,
  }
}

export const actions: Actions = {
  default: async ({ locals, request, url }) => {
    const formData = await request.formData()
    const email = (formData.get("email")?.toString() || "").trim()
    if (!email) return fail(400, { ok: false, message: "A valid email is needed" })

    // try {
    const result = await locals.supabase.auth.signInWithOtp({
      email: email,
    })
    if (result.error) {
      console.warn("failed to send magic link: ", result.error)
      return fail(500, {
        ok: false,
        message: result.error.message,
      })
    }

    throw redirect(303, `/auth/confirm?email=${email}`)
    // } catch (error) {
    //   console.warn("failed to send magic link: ", error)
    //   return fail(500, {
    //     ok: false,
    //     message: "Something went wrong. Please try again",
    //   })
    // }
  }
}
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const user_session = await locals.supabase.auth.getSession();
  
    if (!user_session.data.session){
        redirect(303 ,"/login")
    } else {
        return {
            email: user_session.data.session?.user.email
        }
    }
}
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user){
        redirect(303 ,"/login")
    } else {
        return {
            user: response.data.user
        }
    }
}
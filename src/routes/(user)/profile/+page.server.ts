import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    // const user_session = await locals.supabase.auth.getSession();
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
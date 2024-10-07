import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database, Tables } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user){
        redirect(303 ,"/login")
    } else {
        let { data: orders, error: ordererror } = await supa_client
        .from('orders')
        .select("*")
        .neq('status', "Completed")

        return {
            user: response.data.user,
            orders,
            
        }
    }
}
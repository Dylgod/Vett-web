import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database, Tables } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
    const { data: { user }, error: authError } = await locals.supabase.auth.getUser();

    if (authError || !user) {
        console.log("authError || !user")
        throw redirect(303, "/"); //profile
    }

    const { data: client, error: clientError } = await supaClient
        .from('clients')
        .select("*")
        .or(`owner.eq.${user.id},admins.cs.{${user.id}}`)
        .single();

    if (clientError) {
        console.error('Error fetching client:', clientError);
        throw error(500, 'Error fetching client data');
    }

    if (!client) {
        console.log('User is not an owner or admin of any client');
        throw redirect(303, "/"); //profile
    }

    const { data: orders, error: orderError } = await supaClient
        .from('orders')
        .select("*")
        .eq('created_for', client.id);

    if (orderError) {
        console.error('Error fetching orders:', orderError);
        throw error(500, 'Error fetching orders');
    }

    const admins: string[] = [];
    client.admins?.forEach(async element => {
        const { data: employeeData, error: employeeError } = await locals.supabase.auth.admin.getUserById(element)
        console.log(employeeData.user?.user_metadata.display_name)

        if (employeeError) {
            console.error('Error fetching orders:', employeeError);
        }
    });


    
    return {
        user,
        Company_id: client.id,
        Company_name: client.company_name,
        admins: client.admins,
        orders,
    };
}
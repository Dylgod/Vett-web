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

    type Admin = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'Administrator';
        // logo: any?
    };

    type User = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'User';
        // logo: any?
    };

    // // Use Promise.all to handle multiple async operations
    // const adminPromises = client.admins?.map(async (element) => {
    //     const { data: employeeData, error: employeeError } = await locals.supabase.auth.admin.getUserById(element);

    //     if (employeeError) {
    //         console.error('Error fetching admin:', employeeError);
    //         return null; // Return null for failed fetches. Do we throw error instead?
    //     }

    //     return {
    //         uuid: element,
    //         name: employeeData.user?.user_metadata.display_name,
    //         email: employeeData.user?.email
    //     };
    // }) || [];

    // const admins = (await Promise.all(adminPromises)).filter((admin): admin is Admin => admin !== null);

    // return {
    //     user,
    //     Company_id: client.id,
    //     Company_name: client.company_name,
    //     admins: admins,
    //     orders,
    // };


    type Person = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'Administrator' | 'User';
        // logo: any?
     };
     
     const allUUIDs = [...new Set([...(client.admins || []), ...(client.users || [])])];
     
     const personPromises = allUUIDs.map(async (uuid) => {
        const { data: userData, error: userDataError } = await locals.supabase.auth.admin.getUserById(uuid);
     
        if (userDataError) {
            console.error('Error fetching user data:', userDataError);
            return null;
        }
     
        return {
            uuid,
            name: userData.user?.user_metadata.display_name,
            email: userData.user?.email,
            type: client.admins?.includes(uuid) ? 'Administrator' : 'User'
        };
     });
     
     const people = (await Promise.all(personPromises)).filter((person): person is Person => person !== null);
     
     const admins = people.filter(person => person.type === 'Administrator') as Admin[];
     const users = people.filter(person => person.type === 'User') as User[];
     
     console.log("admins",admins)
     console.log("users",users)

     return {
        user,
        Company_id: client.id,
        Company_name: client.company_name,
        admins,
        users,
        orders,
     };
}
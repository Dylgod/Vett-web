import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database, Tables } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
    const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
    const { data: { user }, error: authError } = await locals.supabase.auth.getUser();
    let rank = 'user'

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

    if (client?.owner === user.id) {
        rank = "owner"
    } else if (client?.admins?.includes(user.id)) {
        rank = "admin"
    }

    type Admin = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'Administrator';
        isowner: boolean
        // logo: any?
    };

    type User = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'User';
        isowner: boolean
        // logo: any?
    };

    type Person = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'Administrator' | 'User';
        isowner: boolean
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
            type: client.admins?.includes(uuid) ? 'Administrator' : 'User',
            isowner: client.owner?.includes(uuid) ? true : false
        };
    });

    const people = (await Promise.all(personPromises)).filter((person): person is Person => person !== null);

    const owner = people.filter(person => person.type === 'Administrator' && person.isowner === true)[0] as Admin;
    const admins = people.filter(person => person.type === 'Administrator' && person.isowner === false) as Admin[];
    const users = people.filter(person => person.type === 'User' && person.isowner === false) as User[];

    // This exists for the new_owner component
    const staff = people.filter(person => person.type === 'Administrator') as Admin[];

    return {
        user,
        rank,
        Company_id: client.id,
        Company_name: client.company_name,
        owner,
        admins,
        users,
        orders,
        staff
    };
}

export const actions = {
    editcompany: async ({ locals, request, url }) => {
        const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
        const { data: { user }, error: authError } = await locals.supabase.auth.getUser();
        const formData = await request.formData()

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

        if (client.owner === user.id) {
            const new_company_name = (formData.get("new_company_name")?.toString() || "").trim()
            const new_company_owner = (formData.get("new_company_owner")?.toString() || "").trim()
            // const new_company_logo = (formData.get("new_company_logo")

            if (client.owner !== new_company_owner) {
                const { data, error: updateError } = await supaClient
                    .from('clients')
                    .update({
                        owner: new_company_owner,
                        company_name: new_company_name,
                        // logo: new_company_logo
                    })
                    .eq("id", client.id)

                if (updateError) {
                    console.error('Could not transfer ownership');
                    throw redirect(303, "/profile")
                } else {
                    console.log("Ownership transfer successful.")
                    throw redirect(303, "/profile")
                }
            } else {
                const { data, error: updateError } = await supaClient
                    .from('clients')
                    .update({
                        company_name: new_company_name,
                        // logo: new_company_logo
                    })
                    .eq("id", client.id)
                    .single()

                if (updateError) {
                    console.error('Failed to update company profile.');
                    throw redirect(303, "/company")
                }
            }
        } else {
            console.log("Only the owner may edit company information.")
            throw redirect(303, "/profile")
        }
    }
}
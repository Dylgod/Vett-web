import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export async function load({ locals }) {
    const supa_client = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE)
    const response = await locals.supabase.auth.getUser();

    if (!response.data.user) {
        throw redirect(303, "/login");
    }

    let { data: orders, error: orderError } = await supa_client
        .from('orders')
        .select("*")
        .neq('status', "Completed");

    if (orderError) {
        console.error('Error fetching orders:', orderError);
        return { user: response.data.user, tasks: [] };
    }

    if (orders) {
        // Fetch company information for each order and create Task objects
        const tasks: Task[] = await Promise.all(orders.map(async (order) => {
            const { data: companyData, error: companyError } = await supa_client
                .from('clients')
                .select('*')
                .eq('created_by', order.created_by)
                .single();

            if (companyError) {
                console.error('Error fetching company data:', companyError);
                return null;
            }

            // Fetch manager's email from the users table
            const { data: userData, error: userError } = await supa_client.auth.admin.getUserById(order.created_by)

            if (userError) {
                console.error('Error fetching user data:', userError);
                return null;
            }

            return {
                Company_id: companyData.id,
                Company_name: companyData.company_name,
                Date: formatDate(order.created_at),
                Manager_id: order.created_by,
                Manager: userData.user.email as string, // Use the email from the users table
                Order_id: order.id.toString(),
                Role: order.role,
                Candidates: order.candidates,
                Onboarding: order.onboarding,
                Skills: order.skills,
                Status: order.status,
                Type: order.checkpoint
            }; // Logo: companyData.logo
        }));

        return {
            user: response.data.user,
            tasks: tasks.filter(task => task !== null)
        };
    }
}
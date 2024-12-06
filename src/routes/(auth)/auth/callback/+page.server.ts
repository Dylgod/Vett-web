import type { PageServerLoad } from './$types';
import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
    const code = url.searchParams.get('code');
    if (!code) {
        console.error('No Google auth code found');
        throw redirect(303, '/login');
    }

    const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);

    // try {
    // Exchange code for session
    const { data: authData, error: authError } = await locals.supabase.auth.exchangeCodeForSession(code);
    if (authError) {
        console.error('Auth error:', authError);
        throw redirect(303, '/login');
    }

    const user_uuid = authData.user?.id;
    if (!user_uuid) {
        console.error('No user ID found in session data');
        throw redirect(303, '/login');
    }

    // Case 1: Check if user already has a client
    const { data: existingClient, error: findError } = await supaClient
        .from('clients')
        .select('*')
        .contains('users', [user_uuid])
        .single();

    if (findError && findError.code !== 'PGRST116') { // Not a "no rows" error
        console.error('Database error checking for existing client:', findError);
        throw redirect(303, '/login');
    }

    // If client exists, redirect to profile (Case 1)
    if (existingClient) {
        console.log('Case 1: Existing client found, redirecting to profile');
        throw redirect(303, '/profile');
    }

    if (user_uuid) {
        // Case 2 & 3: Create new client (handles both existing and new users)
        const { error: insertError } = await supaClient
            .from('clients')
            .insert({
                admins: [user_uuid as string],
                users: [user_uuid as string],
                owner: user_uuid,
            });

        if (insertError) {
            console.error('Error creating new client:', insertError);
            throw redirect(303, '/login');
        }
        throw redirect(303, '/profile');
    }
};
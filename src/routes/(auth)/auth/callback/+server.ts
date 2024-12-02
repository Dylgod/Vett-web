import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code') as string;
    const next = searchParams.get('next') ?? '/';
    if (code) {
        const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
        const { data ,error } = await supaClient.auth.exchangeCodeForSession(code)
        if (!error) {
            const user_uuid = data.user?.id
            const { data: insertData, error: userError } = await supaClient
                .from('clients')
                .insert
                (
                    {
                        admins: [user_uuid as string],
                        users: [user_uuid as string],
                        owner: user_uuid,
                    }
                )

            if (userError) {
                console.log(userError)
                throw redirect(303, `${origin}`);
            }

            throw redirect(303, `${origin}/profile`);
        }
    }
    throw redirect(303, `${origin}/login`);
};
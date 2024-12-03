import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit'

export const GET = async (event) => {
	const {
		url,
		locals: { supabase }
	} = event;
    console.log(event)
    const code = url.searchParams.get('code') as string;
    console.log('code', code)
    // const next = searchParams.get('next') ?? '/';
    if (code) {
        const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
        const { data, error } = await supaClient.auth.exchangeCodeForSession(code)
        console.log('supadata', data, error)
        if (!error) {
            console.log('NO ERROR ADDING TO SB NOW')

            const user_uuid = data.user?.id
            if (user_uuid) {
                console.log('user_uuid', user_uuid)
                const { data: find_UUID_client, error: supaError } = await supaClient
                    .from('clients')
                    .select("*")
                    .contains('users', [user_uuid])
                    .single();

                if (find_UUID_client) {
                    console.log('find_UUID_client', find_UUID_client)
                    throw redirect(303, '/profile')
                } else {
                    console.log('find_UUID_client NOT FOUND. Adding new client to SB')
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
                    } else {
                        console.log('redirecting to new profile')
                        throw redirect(303, `${origin}/profile`);
                    }
                }
            } else {
                console.log('Brand new user. Adding new client to SB')
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
                } else {
                    console.log('redirecting to new profile 2')
                    throw redirect(303, `${origin}/profile`);
                }
            }
        }

        if (error) {
            console.log('ERROR', error)
            throw redirect(303, `${origin}/login`);
        }
    } else {
        console.log('COULD NOT FIND GOOGLE AUTH CODE')
        throw redirect(303, `${origin}/login`);
    }
    throw redirect(303, `${origin}/profile`);
};
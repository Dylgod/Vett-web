import type { ResendParams } from "@supabase/supabase-js";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { EmailOtpType } from '@supabase/supabase-js'
import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ url, locals }) => {
    // if (
    //     url.searchParams.has('email')
    // ) {
    //     const email = url.searchParams.get('email');

    //     if (email) {
    //         return { email }
    //     }
    // };

    const token_hash = url.searchParams.get('token_hash')
    const type = url.searchParams.get('type') as EmailOtpType | null
    const next = url.searchParams.get('next') ?? '/'
    /**
     * Clean up the redirect URL by deleting the Auth flow parameters.
     *
     * `next` is preserved for now, because it's needed in the error case.
     */
    const redirectTo = new URL(url)
    redirectTo.pathname = next
    // redirectTo.searchParams.delete('token_hash')
    // redirectTo.searchParams.delete('type')

    if (token_hash && type) {
        const { data, error } = await locals.supabase.auth.verifyOtp({ token_hash, type })

        if (!error) {
            // Company added a new user flow
            if (data.user?.user_metadata.display_name && data.user?.user_metadata.client_id && data.user?.user_metadata.rank) {
                const newName: string = data.user?.user_metadata.display_name;
                const newRank: string = data.user?.user_metadata.rank;
                const client_id: number = data.user?.user_metadata.client_id;
                const user_uuid: string = data.user.id

                const { data: updatedData, error } = await locals.supabase.auth.updateUser(
                    {
                        data: { display_name: newName }
                    })
                // Company scrn addAdmin
                if (newRank === "admin") {
                    const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
                    const { data: clientdata, error: clientfetchError } = await supaClient
                        .from('clients')
                        .select("*")
                        .eq("id", client_id)
                        .single()

                    if (!clientfetchError) {
                        const adminscolumn = clientdata.admins
                        const userscolumn = clientdata.users
                        const { error: updateError } = await supaClient
                            .from('clients')
                            .update
                            (
                                {
                                    admins: [...adminscolumn!, user_uuid],
                                    users: [...userscolumn!, user_uuid],
                                    // logo: new_company_logo
                                }
                            )
                            .eq("id", client_id)

                        if (updateError) {
                            console.log("Failed to update user", updateError)
                        }
                    } else {
                        const user_uuid = data.user?.id
                        const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
                        const { data: insertData, error: inserterror } = await supaClient
                            .from('clients')
                            .insert
                            (
                                {
                                    admins: [user_uuid as string],
                                    users: [user_uuid as string],
                                    owner: user_uuid,
                                }
                            )
                        if (inserterror) {
                            console.log("No Client + Failed to create new client. ID: 1")
                        }
                    }
                }
                // Company scrn addUser
                if (newRank === "user") {

                    const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
                    const { data: clientdata, error: clientfetchError } = await supaClient
                        .from('clients')
                        .select("*")
                        .eq("id", client_id)
                        .single()

                    if (!clientfetchError) {
                        const userscolumn = clientdata.users
                        const { error: updateError } = await supaClient
                            .from('clients')
                            .update
                            (
                                {
                                    users: [...userscolumn!, user_uuid],
                                    // logo: new_company_logo
                                }
                            )
                            .eq("id", client_id)

                        if (updateError) {
                            console.log("Failed to update user", updateError)
                        }
                    } else {
                        // Normal Account Creation Flow
                        const user_uuid = data.user?.id
                        const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
                        const { data: insertData, error: inserterror2 } = await supaClient
                            .from('clients')
                            .insert
                            (
                                {
                                    admins: [user_uuid as string],
                                    users: [user_uuid as string],
                                    owner: user_uuid,
                                }
                            )
                        if (inserterror2) {
                            console.log("No Client + Failed to create new client. ID: 2")
                        }
                    }

                    if (!clientdata) {
                        console.log("COULD NOT FIND CLIENT DATA && NO SUPABASE ERROR")
                    }
                }
            } else {
                const user_uuid = data.user?.id
                const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
                const { data: insertData, error } = await supaClient
                    .from('clients')
                    .insert
                    (
                        {
                            admins: [user_uuid as string],
                            users: [user_uuid as string],
                            owner: user_uuid,
                        }
                    )
            }

            redirectTo.searchParams.delete('next')
            redirect(303, redirectTo)
        } else {
            throw redirect(303, `/login?error=true&message=${error.message}`)
        }
    } else {
        if (
            url.searchParams.has('email')
        ) {
            const email = url.searchParams.get('email');

            if (email) {
                return { email }
            }
        };
    }

    // redirectTo.pathname = '/auth/error'
    // redirect(303, redirectTo)
}

export const actions: Actions = {
    default: async ({ url, locals: { supabase } }) => {
        if (
            url.searchParams.has('email')
        ) {
            const email = url.searchParams.get('email');

            if (email) {
                const params: ResendParams = { type: "signup", email: email }
                const { error } = await supabase.auth.resend(params)
                if (error) {
                    console.error(error)
                }
            }
        }
    }
}
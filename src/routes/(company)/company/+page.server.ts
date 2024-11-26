import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';

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
        throw redirect(303, "/");
    }

    if (!client) {
        console.log('User is not an owner or admin of any client');
        throw redirect(303, "/"); //profile
    }

    const { data: files } = await supaClient
        .storage
        .from('logos')
        .list('clients/', {
            search: `${client.id}.webp`
        });


    const clientImage = files && files.length > 0
        ? (await (supaClient.storage
            .from('logos')
            .createSignedUrl(`clients/${client.id}.webp`, 604800)) // 3600 seconds = 1 hour
        ) // 3600 seconds = 1 hour
            .data?.signedUrl
        : null;

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
        logo: string | null | undefined
    };

    type User = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'User';
        isowner: boolean
        logo: string | null | undefined
    };

    type Person = {
        uuid: string;
        name: string | undefined;
        email: string | undefined;
        type: 'Administrator' | 'User';
        isowner: boolean
        logo: string | null | undefined
    };

    const allUUIDs = [...new Set([...(client.admins || []), ...(client.users || [])])];

    const personPromises = allUUIDs.map(async (uuid) => {
        const { data: userData, error: userDataError } = await locals.supabase.auth.admin.getUserById(uuid);

        if (userDataError) {
            console.error('Error fetching user data:', userDataError);
            return null;
        }

        const { data: files } = await supaClient
            .storage
            .from('logos')
            .list('people/', {
                search: `${uuid}.webp`
            });


        const profileImage = files && files.length > 0
            ? (await (supaClient.storage
                .from('logos')
                .createSignedUrl(`people/${uuid}.webp`, 604800)) // 3600 seconds = 1 hour
            ) // 3600 seconds = 1 hour
                .data?.signedUrl
            : null;

        return {
            uuid,
            name: userData.user?.user_metadata.display_name,
            email: userData.user?.email,
            type: client.admins?.includes(uuid) ? 'Administrator' : 'User',
            isowner: client.owner?.includes(uuid) ? true : false,
            logo: profileImage
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
        Company_logo: clientImage,
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
            throw redirect(303, "/");
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
            throw redirect(303, "/");
        }

        if (client.owner === user.id) {
            const old_company_name = (formData.get("old_company_name")?.toString() || "").trim()
            const new_company_name = (formData.get("new_company_name")?.toString() || "").trim()
            const new_company_owner = (formData.get("new_company_owner")?.toString() || "").trim()
            const new_company_logo = formData.get('companyimage') as File | null;
            let ownership_transfered = false;
            let uploadedImagePath: string | undefined;

            try {
                // Only update company name if it changed
                if (new_company_name && new_company_name !== old_company_name) {
                    const { error: updateError } = await supaClient
                        .from('clients')
                        .update({
                            company_name: new_company_name,
                        })
                        .eq("id", client.id)

                    if (updateError) {
                        throw new Error('Failed to update Company name');
                    }
                }

                // Only change owner if owner changed
                if (client.owner !== new_company_owner) {
                    const { error: updateError } = await supaClient
                        .from('clients')
                        .update({
                            owner: new_company_owner,
                        })
                        .eq("id", client.id)

                    if (updateError) {
                        throw new Error('Could not transfer ownership');
                    }
                    ownership_transfered = true;
                }

                // Only upload image if one was provided
                if (new_company_logo && new_company_logo.size > 0) {
                    // Convert the File to a Blob with explicit MIME type
                    const imageBlob = new Blob([await new_company_logo.arrayBuffer()], {
                        type: 'image/webp'
                    });

                    const { data: imageData, error: imageError } = await supaClient
                        .storage
                        .from('logos/clients')
                        .upload(`${client.id}.webp`, imageBlob, {
                            upsert: true,
                            contentType: 'image/webp'
                        });

                    if (imageError) {
                        throw imageError;
                    }

                    uploadedImagePath = imageData?.path;
                }
            } catch (error) {
                console.error("Update failed:", error);
                return fail(500, {
                    message: 'Failed to update Company profile',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
            // Handle redirect after all operations are complete
            if (ownership_transfered) {
                return redirect(303, "/profile");
            }

            return {
                success: true,
                path: uploadedImagePath
            };
        }
    },
    addAdmin: async ({ locals, request, url }) => {
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
            const new_admin_name = (formData.get("new_admin_name")?.toString() || "").trim()
            const new_admin_email = (formData.get("new_admin_email")?.toString() || "").trim()
            const querying_client_id = client.id

            if (!new_admin_name || new_admin_name.length < 2) {
                return fail(500, {
                    success: false,
                    message: "Name must be at least 2 characters long",
                })
            }
            
            if (!new_admin_email || !new_admin_email.includes('@')) {
                return fail(500, {
                    success: false,
                    message: "Invalid email address",
                })
            }

            const { data: newUUID, error: userError } = await supaClient
                .rpc('get_user_uuid_by_email', { user_email: new_admin_email })

            if (userError) {
                return fail(500, {
                    success: false,
                    message: "Internal error 500",
                })
            }

            // Email not in auth table
            if (!newUUID) {
                const { error } = await supaClient.auth.signInWithOtp({
                    email: new_admin_email,
                    options: {
                        data: {
                            display_name: new_admin_name,
                            rank: "admin",
                            client_id: querying_client_id
                        },
                    },
                })

                if (error) {
                    console.warn("failed to send magic link: ", error)
                    return fail(500, {
                        success: false,
                        message: error.message,
                    })
                }
            } else {

                const { data: find_UUID_client, error: supaError } = await supaClient
                    .from('clients')
                    .select("*")
                    .contains('users', [newUUID])
                    .single();

                if (supaError) {
                    return fail(500, {
                        success: false,
                        message: "Internal Database Error",
                    })
                }

                if (find_UUID_client && find_UUID_client.id !== querying_client_id) {
                    return fail(500, {
                        success: false,
                        message: "This User is an Employee of another company",
                    })
                }

                if (find_UUID_client && find_UUID_client.id === querying_client_id) {
                    const { data: isAdmin, error: supaError } = await supaClient
                        .from('clients')
                        .select("*")
                        .contains('admins', [user.id])
                        .single();

                    if (isAdmin) {
                        return fail(500, {
                            success: false,
                            message: "This User is already an Admin",
                        })
                    } else {
                        return fail(500, {
                            success: false,
                            message: "This Email is already a User.<br>Promote them to admin using the three dot menu<br>to the right of their name",
                        }) 
                    }
                }

            }

            return {
                success: true
            }

        } else {
            return fail(500, {
                success: false,
                message: "Only the company Owner can add new Admins",
            })
        }
    },
    addUser: async ({ locals, request, url }) => {
        const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);
        const { data: { user }, error: authError } = await locals.supabase.auth.getUser();
        const formData = await request.formData()

        if (authError || !user) {
            console.log("authError || !user")
            throw redirect(303, "/"); //profile
        }

        // Check if an Admin or Owner called this function
        const { data: client, error: clientError } = await supaClient
            .from('clients')
            .select("*")
            .contains('admins', [user.id])
            .single();

        if (clientError) {
            console.error('Error fetching client:', clientError);
            throw error(500, 'Error fetching client data');
        }

        if (!client) {
            console.log('User is not an owner or admin of any client');
            throw redirect(303, "/profile");
        }

        if (client) {
            const new_user_name = (formData.get("new_user_name")?.toString() || "").trim()
            const new_user_email = (formData.get("new_user_email")?.toString() || "").trim()
            const querying_client_id = client.id

            if (!new_user_name || new_user_name.length < 2) {
                return fail(500, {
                    success: false,
                    message: "Name must be at least 2 characters long",
                })
            }
            
            if (!new_user_email || !new_user_email.includes('@')) {
                return fail(500, {
                    success: false,
                    message: "Invalid email address",
                })
            }

            const { data: newUUID, error: userError } = await supaClient
                .rpc('get_user_uuid_by_email', { user_email: new_user_email })

            if (userError) {
                return fail(500, {
                    success: false,
                    message: "Internal error 500",
                })
            }

            // Email not in auth table
            if (!newUUID) {
                const { data, error } = await supaClient.auth.signInWithOtp({
                    email: new_user_email,
                    options: {
                        data: {
                            display_name: new_user_name,
                            rank: "user",
                            client_id: querying_client_id
                        },
                    },
                })

                if (error) {
                    console.warn("failed to send magic link: ", error)
                    return fail(500, {
                        success: false,
                        message: "Internal Server Error",
                    })
                }
            } else {
                const { data: find_UUID_client, error: supaError } = await supaClient
                    .from('clients')
                    .select("*")
                    .contains('users', [newUUID])
                    .single();

                if (supaError) {
                    return fail(500, {
                        success: false,
                        message: "Internal Database Error",
                    })
                }

                if (find_UUID_client && find_UUID_client.id === querying_client_id) {
                    return fail(500, {
                        success: false,
                        message: "This Email is already a User at your company",
                    })
                }

                if (find_UUID_client && find_UUID_client.id !== querying_client_id) {
                    return fail(500, {
                        success: false,
                        message: "This User is an Employee of another company",
                    })
                }

                if (!find_UUID_client) {
                    const { data, error } = await supaClient.auth.signInWithOtp({
                        email: new_user_email,
                        options: {
                            data: {
                                display_name: new_user_name,
                                rank: "user",
                                client_id: querying_client_id
                            },
                        },
                    })

                    if (error) {
                        console.warn("failed to send magic link: ", error)
                        return fail(500, {
                            success: false,
                            message: error.message,
                        })
                    }
                }
            }

            return {
                success: true,
                message: "Invite Sent!"
            };

        }
    },
}
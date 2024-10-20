
import { SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/supabase.js';
import { createClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

export const demote_admin = async (uuid: string) => {
  const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);

  const { data: client, error: clientError } = await supaClient
    .from('clients')
    .select("*")
    .contains('admins', [uuid])
    .single();

  if (clientError) {
    console.error('Error fetching client:', clientError);
    throw error(500, 'Error fetching client data');
  }

  if (!client) {
    console.log('User is not an owner or admin of any client');
    throw redirect(303, "/"); //profile
  }

  const updatedAdmins = client.admins!.filter((admin: string) => admin !== uuid);

  const { data, error: updateError } = await supaClient
    .from('clients')
    .update({
      admins: updatedAdmins,
    })
    .eq("id", client.id)
    .select('admins, users'); // users and admins are linked so both must be returned

  if (updateError) {
    console.error('Error updating data:', updateError);
    throw updateError;
  } else {
    return { data };
  }
}

export const promote_user = async (uuid: string) => {
  const supaClient = createClient<Database>(PUBLIC_SUPABASE_URL, SERVICE_ROLE);

  const { data: client, error: clientError } = await supaClient
    .from('clients')
    .select("*")
    .contains('users', [uuid])
    .single();

  if (clientError) {
    console.error('Error fetching client:', clientError);
    throw error(500, 'Error fetching client data');
  }

  if (!client) {
    console.log('User is not an owner or admin of any client');
    throw redirect(303, "/"); //profile
  }

  const updatedAdmins = [...(client.admins || []), uuid];

  const { data, error: updateError } = await supaClient
    .from('clients')
    .update({
      admins: updatedAdmins,
    })
    .eq("id", client.id)
    .select('admins, users');

  if (updateError) {
    console.error('Error updating data:', updateError);
    throw updateError;
  } else {
    return { data };
  }
}
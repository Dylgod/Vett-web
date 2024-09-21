import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import type { Actions } from '../../$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData())


    const credentials: SignUpWithPasswordCredentials = {
      email: body.email as string,
      password: body.password as string,
      options: { data: { first_name: body.first_name, last_name: body.last_name } }
    }

    const { error } = await locals.supabase.auth.signUp(credentials)

    if (!error) {
      redirect(303, `/auth/confirm?email=${body.email}`)
    } else {
      return error.message
    }

  },
} satisfies Actions;

export async function load({ locals }) {
    const user_session = await locals.supabase.auth.getSession();
  
    // const { data, error } = await supabaseHook.from('users')
    //   .eq('id', user_session?.user?.id)
    //   .single();
  
    // if (error) {
    //   return fail(404, { message: 'Cannot find customer information' });
    // }
  
    return {
        email: user_session.data.session?.user.email
    }
}
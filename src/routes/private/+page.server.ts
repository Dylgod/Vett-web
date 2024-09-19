import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase } }) => {
	depends('supabase:db:users');
	const { data: users } = await supabase.from('users').select('id,first_name').order('id');
	return { users: users ?? [] };
};
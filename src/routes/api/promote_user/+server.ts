import { json } from '@sveltejs/kit';
import { promote_user } from '$lib/helpers.js'

export async function POST({ request }) {
    const { uuid } = await request.json();
    try {
        const result = await promote_user(uuid);
        return json({ 
            success: true, 
            updatedAdmins: result.data[0].admins,
            updatedUsers: result.data[0].users
        });
    } catch (error) {
        console.error('Error promoting user:', error);
        return json({ success: false, error: 'Failed to promote user' }, { status: 500 });
    }
}
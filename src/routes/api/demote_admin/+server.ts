import { json } from '@sveltejs/kit';
import { demote_admin } from '$lib/helpers.js'

export async function POST({ request }) {
    const { uuid } = await request.json();
    try {
        const result = await demote_admin(uuid);
        // Assuming result.data is of type { admins: string[] | null; users: string[] | null; }
        return json({ 
            success: true, 
            updatedAdmins: result.data[0].admins,
            updatedUsers: result.data[0].users
        });
    } catch (error) {
        console.error('Error demoting admin:', error);
        return json({ success: false, error: 'Failed to demote admin' }, { status: 500 });
    }
}
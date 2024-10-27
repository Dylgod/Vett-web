import { json } from '@sveltejs/kit';
import { delete_user } from '$lib/helpers.js'

export async function POST({ request }) {
    const { uuid } = await request.json();
    try {
        const result = await delete_user(uuid);
        // Assuming result.data is of type { admins: string[] | null; users: string[] | null; }
        return json({ 
            success: true, 
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return json({ success: false, error: 'Failed to delete user' }, { status: 500 });
    }
}
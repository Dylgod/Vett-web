// import { fail, redirect } from '@sveltejs/kit';
// import type { Actions } from './$types';
// import type { Provider } from '@supabase/supabase-js';

// export const actions: Actions = {
//     register: async ({ request, locals }) => {
//         const body = Object.fromEntries(await request.formData());

//         const { error } = await locals.supabase.auth.signInWithOtp({
//             email: body.email as string,
//         })

//         if (!error?.message) {
//             redirect(303, '/verify');
//         } else {
//             return { error: error.message }
//         }

//     },
//     login: async ({ request, locals, url }) => {
//         const body = Object.fromEntries(await request.formData());
//         const provider = url.searchParams.get('provider') as Provider;

//         if (provider) {
//             const { data, error } = await locals.supabase.auth.signInWithOAuth({
//                 provider: provider, options: {
//                     redirectTo: 'localhost:5173'
//                 }

//             })

//             if (error) {
//                 console.log(error)
//                 return fail(400, { message: 'Something went wrong' })
//             }
//             throw redirect(303, data.url)
//         }

//         const { data, error: err } = await locals.supabase.auth.signInWithPassword({
//             email: body.email as string,
//             password: body.password as string
//         });

//         if (!err) {
//             redirect(303, '/account');
//         } else {
//             return {
//                 status: err.status,
//                 message: err.message
//             };
//         };
//     },
// } satisfies Actions;

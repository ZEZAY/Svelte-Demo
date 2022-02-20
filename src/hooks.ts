import type { Handle } from "@sveltejs/kit";

// export const handle: Handle = async ({ event, resolve }) => {
//     const response = await resolve(event);
//     return response;
// };

// export const handle: Handle = async ({ event, resolve }) => {
//     if (event.request.params .query.has("_method")) {
//         event.request.method = event.params.query.get("_method").toUpperCase()
//     }
//     const response = await resolve(event)
//     return response
// }

// export function handle({ request, render }) {
//     return render({
//         ...request,
//         method: request.request.query.get('_method') || request.method
//     });
// }

// export const handle: Handle = async ({ event, resolve }) => {
//     const request = await event.request.formData();
//     event.request.method = request.get("_method") || event.request.method

//     const response = await resolve(event)
//     return response
// }
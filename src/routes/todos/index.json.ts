import type { RequestHandler } from "@sveltejs/kit";

// TODO: Persist in database 
let todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos,
    };
};

export async function post({ request }) {
    const data = await request.formData();
    // "text" is the name of the input field
    todos.push({
        created_at: new Date,
        text: data.get("text"),
        done: false
    });

    return {
        // redirect
        status: 303,
        headers: {
            location: '/'
        }
    };
};

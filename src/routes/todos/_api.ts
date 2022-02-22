// TODO: Persist in database 
let todos: Todo[] = [];

export const api = (request, data?: Record<string, unknown>) => {
    let body = {};
    let status = 500;

    switch (request.request.method.toUpperCase()) {
        case "GET":
            body = todos
            status = 200
            break;

        case "POST":
            todos.push(data as Todo)
            body = data
            status = 201
            break;

        case "DELETE":
            todos = todos.filter(todo => todo.uid !== request.params.uid)
            break;

        case "PATCH":
            todos.map(todo => {
                if (todo.uid === request.params.uid) {
                    todo.text = data.text != null ? data.text as string : todo.text
                    todo.done = data.done as boolean
                }
            })
            break;

        default:
            break;
    }

    if (request.request.method.toUpperCase() !== "GET") {
        return {
            status: 303,
            headers: { location: '/' }
        };
    }
    return { status, body }
}
import type { RequestHandler } from "@sveltejs/kit";
import { api } from "./_api";


export const del: RequestHandler = (request) => {
    return api(request);
};

export const patch: RequestHandler = async (request) => {
    const data = await request.request.formData();
    return api(request, {
        text: data.get("text") as string,
    });
};
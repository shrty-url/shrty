import type { APIRoute } from "astro";
import { ApiRouteSuccess } from "src/lib/ApiRouteSuccess";

export const post: APIRoute = async ({ params, request }) => {
	const body = await request.json();

	console.log(body)
	return ApiRouteSuccess({
		body,
	});
};

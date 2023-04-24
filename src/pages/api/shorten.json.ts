import type { APIRoute } from "astro";
import { ApiRouteSuccess } from "src/lib/ApiRouteSuccess";
import { MalformedPropertyError } from "src/lib/MalformedPropertyError";
import { MissingPropertyError } from "src/lib/MissingPropertyError";
import { db } from "src/lib/shared";
import valid from "valid-url";
import crypto from "node:crypto";

/** Generate secure random string values in Javascript using cryto-random bytes */
function randomHash(len: number) {
	return Array.from(
		crypto.getRandomValues(new Uint8Array(Math.ceil(len / 2))),
		(b) => ("0" + (b & 0xff).toString(16)).slice(-2)
	).join("");
}

export const post: APIRoute = async ({ params, request }) => {
	const body = await request.json();

	if (!body.url) {
		return MissingPropertyError("url");
	}

	if (!valid.isHttpUri(body.url) && !valid.isHttpsUri(body.url)) {
		return MalformedPropertyError("url");
	}

	// Check if the url was already saved before.
	let url = await db("links").select("*").where("url", body.url).first();

	if (url) {
		return ApiRouteSuccess({ shortcode: url.shortcode });
	}

	// Check if the host was inserted before.
	let parsed = new URL(body.url);
	let host = await db("hosts").select("*").where("host", parsed.hostname);
	if (host.length == 0) {
		host = await db("hosts").insert({ host: parsed.hostname }, "id");
	}
	
	let hostId = host[0].id;

	let shortcode = randomHash(8);

	await db("links").insert({
		url: body.url,
		shortcode,
		views: 0,
		hosts_id: hostId
	});

	const response = ApiRouteSuccess({
		shortcode,
	});

	response.headers.set("Access-Control-Allow-Origin", "*")

	return response;
};

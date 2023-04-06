import type { APIRoute } from "astro";
import { success, MissingPropertyError, MissingEntityError, InvalidDataError } from "../../lib/APIResponse";
import { ZIPInformation } from "src/lib/ZIPInformation";

/**
 * Ruft einen Nutzer anhand seiner uid aus der Datenbank ab.
 * @param param0 Die Request mit dem request body. Dieser enthält entweder eine uid mit der der Benutzer identifiziert werden kann.
 */
export const get: APIRoute = async ({ request }) => {
	const body = Object.fromEntries(new URLSearchParams(request.url.split("?")[1]))

	let result;
	if (body.zip) {
		result = await ZIPInformation.fromZipCode(body.zip)
	} else if (body.city) {
		result = await ZIPInformation.fromCity(body.city)
	} else if (body.state) {
		result = await ZIPInformation.fromState(body.state)
	} else {
		return MissingPropertyError(["Either 'state', 'city' or 'zip' have to exist in request body."])
	}

	if (!result) {
		return MissingEntityError("zip info")
	}

	return success(result);
}
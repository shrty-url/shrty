import type { APIRoute } from "astro";
import { success, MissingPropertyError, MissingEntityError, ActionFailedError, InvalidDataError } from "../../lib/APIResponse";
import { User } from "../../lib/User";
import { UserRegisterValidator, UserType, UserTypeValidator } from "../../lib/User/type";

/**
 * Ruft einen Nutzer anhand seiner uid aus der Datenbank ab.
 * @param param0 Die Request mit dem request body. Dieser enthält entweder eine uid mit der der Benutzer identifiziert werden kann.
 */
export const get: APIRoute = async ({ request }) => {
	const body = await request.json();

	if (!body.hasOwnProperty("uid")) {
		return MissingPropertyError(["uid"]);
	}

	const user = User.fromPublicId(body.uid);

	if (!user) {
		return MissingEntityError("user");
	}

	return success(user);
}

export const put: APIRoute = async ({ request }) => {
	const body = await request.json();

	const validate = UserRegisterValidator.safeParse(body);

	if (validate.success == false) {
		return InvalidDataError(validate.error);
	}

	const result = await User.create(body as UserType);

	if (!result) {
		return ActionFailedError();
	}

	return success({ uid: result.uid, id: result.id });
}


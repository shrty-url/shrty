import type { AstroGlobal } from "astro";
import { decodeToken } from "./JsonWebToken";
import moment from "moment";
import type { UserType } from "./User/types";
import { User } from "./User";

let user: any = null;
let loggedIn: any = null;

export function isLoggedIn(astro: AstroGlobal) {
	if (loggedIn !== null) {
		return loggedIn;
	}

	if (astro.cookies.has("token")) {
		let result = decodeToken(astro.cookies.get("token").value as string);
	
		if (result && typeof result == "object") {
			loggedIn = result.exp > moment().unix();
		}
	}

	return false;
}



export async function getUser(astro: AstroGlobal) {
	if (user) {
		return user;
	}

	if (astro.cookies.has("token")) {
		let result = decodeToken(astro.cookies.get("token").value as string);
	
		if (result && typeof result == "object") {
			user = await User.fromPrivateId(result.id)
		}
	}

	return user;
}
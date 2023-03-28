import type { AstroGlobal } from "astro";
import moment from "moment";

export function isLoggedIn(astro: AstroGlobal): boolean {
	if (!astro.cookies.has("token")) {
		return false;
	}

	if (astro.cookies.has("expires") && (astro.cookies.get("expires").number() > moment().unix())) {
		return true;
	}

	return false;
}
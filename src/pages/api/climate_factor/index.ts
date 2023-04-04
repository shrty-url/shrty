import type { APIRoute } from "astro";
import moment from "moment";
import { ActionFailedError, InvalidDataError, MissingPropertyError, error, success } from "src/lib/APIResponse";
import { getClimateFactor } from "src/lib/Klimafaktoren/getClimateFactor";

export const get: APIRoute = async function({ request }) {
	const body = Object.fromEntries(new URLSearchParams(request.url.split("?")[1]))

	if (!body.start || !body.end) {
		return MissingPropertyError(["start", "end"]);
	}

	let accuracy = body.accuracy || "months";

	if (accuracy !== "months" && accuracy !== "years") {
		return error(["Accuracy must be either 'months' or 'years'."])
	}

	if (!body.zip) {
		return error(["Invalid ZIP Code, must be 4 or 5 characters long."])
	}

	let start = moment(body.start);
	let end = moment(body.end);
	
	if (!start.isValid()) {
		return error(["Invalid start date given."]);
	}

	if (!end.isValid()) {
		return error(["Invalid end date given."]);
	}

	if (start.isSameOrAfter(end)) {
		return error(["Start date not before end date."])
	}

	const intervals = [];
	
	let currentDate = start.clone();
	while (currentDate.isSameOrBefore(end)) {
		let copy = currentDate.clone();
		intervals.push(copy);
		currentDate.add(1, accuracy);
	}

	const climateFactors = await getClimateFactor(intervals, body.zip);

	if (!climateFactors) {
		return ActionFailedError();
	}

	return success(climateFactors);
}
import moment, { Moment } from "moment";
import { db } from "../shared";

export async function getClimateFactor(dates: Moment[], zip: string): Promise<number[][] | null> {
	const formattedDates = dates.map(date => {
		let d = moment(date).format("MM_YYYY");
		return `d_${d} as ${d}`
	});

	if (dates.length == 0) {
		return null;
	}
	if (zip.length !== 5 && zip.length !== 4) {
		return null;
	}
	
	let result;
	try {
		result = await db<number[][]>("climate_factors").select(formattedDates).where("zip", zip).first();
	} catch(e) {
		return null;
	}

	if (!result) {
		return null;
	}

	return result;
}
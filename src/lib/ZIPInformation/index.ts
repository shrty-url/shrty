import { db } from "../shared";

type DatabaseZIPInformation = {
	zip: string,
	city: string,
	state: string
};

export class ZIPInformation {
	public constructor(public zip: string, public city: string, public state: string) {

	}

	public static async fromZipCode(zip: string): Promise<null | ZIPInformation[]> {
		if (zip.length > 5) {
			return null;
		}

		let results = await db<DatabaseZIPInformation>("zip_codes").select("*").whereLike("zip", `${zip}%`).limit(10);

		if (!results) {
			return null;
		}

		return results.map(result => new ZIPInformation(result.zip, result.city, result.state))
	}

	public static async fromCity(city: string): Promise<null | ZIPInformation[]> {
		let results = await db<DatabaseZIPInformation>("zip_codes").select("*").where("city", city);

		if (!results) {
			return null;
		}

		return results.map(result => new ZIPInformation(result.zip, result.city, result.state))
	}

	public static async fromState(state: string): Promise<null | ZIPInformation[]> {
		let results = await db<DatabaseZIPInformation>("zip_codes").select("*").where("state", state);

		if (!results) {
			return null;
		}

		return results.map(result => new ZIPInformation(result.zip, result.city, result.state))
	}
}
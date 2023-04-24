export interface AnalyticsData {
	/**
	 * Date of when the user entered the site
	 */
	entry: number,
	/**
	 * Date of when the user exited the site
	 */
	exit: number,
	/**
	 * Uniquely assigned user id
	 */
	uid: string,
	os: {
		name: string,
		version: string
	},
	browser: {
		version: string,
		name: string
	},
	referrer: string,
	reload: boolean,
	language: string
}

export async function uploadAnalyticsData(data: AnalyticsData): Promise<boolean> {
		navigator.sendBeacon("/api/analytics/upload.json", JSON.stringify(data));
	}
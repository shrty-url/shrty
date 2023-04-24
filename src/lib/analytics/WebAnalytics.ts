import { AnalyticsData, uploadAnalyticsData } from "./uploadAnalyticsData";
import Bowser from "bowser";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { deepMerge } from "./deepMerge";
import { optimizeAnalyticsData } from "./optimizeAnalyticsData";

type AnalyticsPreset = "aggressive" | "privacy" | "tracking" | "default";

interface AnalyticsOptions {
	os?: {
		version?: boolean,
		name?: boolean
	},
	browser?: {
		version?: boolean,
		name?: boolean
	}
}



/**
 * Web Analytics Provider for Shrty Analytics, takes the public key of a recipient server and an options object as parameters.
 * @date 4/14/2023 - 11:37:34 AM
 *
 * @export
 * @param {string} publicKeys
 * @param {AnalyticsOptions} options
 */
export function WebAnalytics(publicKey: string, options: AnalyticsOptions, preset: AnalyticsPreset = "default") {
	// Capture the date when the user entered the page.
	const entry = new Date();

	options = deepMerge({
		os: {
			version: true,
			name: true
		},
		browser: {
			version: true,
			name: true
		}
	} as AnalyticsOptions, options);

	window.addEventListener("visibilitychange", async (e) => {
		const pageAccessedByReload = (
			(window.performance.navigation && window.performance.navigation.type === 1) ||
				window.performance
					.getEntriesByType('navigation')
					.map((nav) => nav.type)
					.includes('reload')
		);

		const parser = Bowser.getParser(window.navigator.userAgent);

		const data: AnalyticsData = {
			browser: {
				version: options.browser?.version ? parser.getBrowserVersion() : "",
				name: options.browser?.name ? parser.getBrowserName() : ""
			},
			os: {
				version: options.browser?.version ? parser.getOSVersion() : "",
				name: options.browser?.name ? parser.getOSName() : ""
			},
			entry: entry.getTime(),
			exit: new Date().getTime(),
			uid: (await FingerprintJS.load().then(x => x.get())).visitorId,
			referrer: document.referrer,
			reload: pageAccessedByReload,
			language: navigator.language
		};

		optimizeAnalyticsData(data)

		uploadAnalyticsData(data);
	});
}

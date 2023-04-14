import type { AnalyticsData } from "./uploadAnalyticsData";

export function optimizeAnalyticsData(data: AnalyticsData): AnalyticsData {
	for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (typeof value === "object") {
        optimizeAnalyticsData(value);
        if (Object.keys(value).length === 0) {
          delete data[key];
        }
      } else if (value === null || value === undefined || value === "") {
        delete data[key];
      }
    }
  }

	return data;
}
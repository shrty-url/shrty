<script lang="ts">
	import Chart from "chart.js/auto";
	import moment from "moment";
	import { onMount } from "svelte";

	let chart: HTMLCanvasElement;

	export let data: any;
	export let info: any;

	function minutesDiff(dateTimeValue2: Date, dateTimeValue1: Date) {
		var differenceValue =
			(dateTimeValue2.getTime() - dateTimeValue1.getTime()) / 1000;
		differenceValue /= 60;
		return Math.abs(Math.round(differenceValue));
	}

	onMount(() => {
		// We need to convert the time series data to hourly accurate predictions.
		let hours = [];

		for (let i = 0; i < data.length; i++) {
			const step = data[i];
			const lastStep = i > 0 ? data[i - 1] : null;

			if (!lastStep) {
				hours.push({
					date: step.date,
					views: 1,
				});
				continue;
			}

			let difference = minutesDiff(step.date, lastStep.date);

			if (difference < 1) {
				let last = hours.at(-1);
				if (!last) {
					continue;
				}
				last.views++;
			} else {
				hours.push({
					date: step.date,
					views: 1,
				});
			}
		}

		new Chart(chart, {
			type: "line",
			data: {
				labels: hours.map((x: any) => {
					return moment(x.date).format("MM.DD.YYYY HH:mm");
				}),
				datasets: [
					{
						label: "Views",
						data: hours.map((x: any) => x.views),
						borderWidth: 1,
					},
				],
			},
		});
	});
</script>

<div class="flex flex-col gap-8 px-8">
	<a href="/analytics">← Analytics</a>
	<div class="flex flex-col gap-4">
		<h1>{info.shortcode}</h1>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			
			<table>
				<tbody>
					<tr>
						<td> Added on</td>
						<td />
					</tr>
					<tr>
						<td> Shortcode</td>
						<td>
							{info.shortcode}
						</td>
					</tr>
					<tr>
						<td> Short URL</td>
						<td>
							<a href="/{info.shortcode}"
								>https://shrty.it/{info.shortcode}</a
							>
						</td>
					</tr>
					<tr>
						<td> URL</td>
						<td>
							<a href={info.url}>{info.url}</a>
						</td>
					</tr>
					<tr>
						<td> Host</td>
						<td>
							{info.host}
						</td>
					</tr>
					<tr>
						<td> Views</td>
						<td>
							{info.views}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="h-full border">
				<canvas bind:this={chart} />
			</div>
		</div>
		
	</div>
	<iframe src={info.url} frameborder="0" class="w-full h-[800px]" />´
</div>

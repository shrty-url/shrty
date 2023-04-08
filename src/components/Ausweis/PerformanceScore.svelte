<script lang="ts">
	export let performance: number;

	let maxPerformance = 250;

	/**
	 * We use linear interpolation to scale the value between the given boundaries.
	*/
	function centerValueBetweenBoundaries(value: number, newMinimum: number, newMaximum: number, oldMinimum: number = 0, oldMaximum: number = 100): number {
		// Calculate the center point of the current range
		const center = (oldMinimum + oldMaximum) / 2;

		// Shift the value to be centered around zero
		const shiftedValue = value - center;

		// Calculate the current range width
		const rangeWidth = oldMaximum - oldMinimum;

		// Calculate the new range width
		const newRangeWidth = newMaximum - newMinimum;

		// Calculate the scaling factor
		const scalingFactor = newRangeWidth / rangeWidth;

		// Scale the shifted value to fit within the new range
		const scaledValue = shiftedValue * scalingFactor;

		// Shift the scaled value back to the center of the new range
		const centeredValue = scaledValue + ((newMaximum + newMinimum) / 2);

		return centeredValue;
	}

	$: translation = Math.min(100, performance / maxPerformance * 100);
</script>

<div class="w-full rounded-lg border border-[#ffcc03] relative p-2">
	<img src="/images/SKALA-910.png" alt="Energieeffizienz Skala">
	<img
		class="absolute top-1 transition-left duration-700 ease-in-out"
		width="20px"
		src="/images/pfeil2.png"
		alt=""
		style="left: {translation}%; transform: translateX({centerValueBetweenBoundaries(translation, 50, -150, 0, 100)}%)"
	/>
	<img
		class="absolute bottom-1"
		width="20px"
		src="/images/pfeil.png"
		alt=""
	/>
</div>
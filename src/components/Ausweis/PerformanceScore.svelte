<script lang="ts">
	export let performance: number;

	let maxPerformance = 250;
</script>

<div class="w-full rounded-lg border border-[#ffcc03] relative p-2">
	<img src="/images/SKALA-910.png" alt="Energieeffizienz Skala">
	<img
		class="absolute top-1 transition-left duration-700 ease-in-out"
		width="20px"
		src="/images/pfeil2.png"
		alt=""
		style="left: {Math.min(100, performance / maxPerformance * 100)}%;"
	/>
	<img
		class="absolute bottom-1"
		width="20px"
		src="/images/pfeil.png"
		alt=""
	/>
</div>
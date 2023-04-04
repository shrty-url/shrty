<script lang="ts">
	export let progress: number = 0;
</script>

<div class="flex flex-col relative">
	<div class="progress-section">
		<div class="w-[85%] left-9 bg-gray-100 absolute h-3 rounded-lg">
			<div class="bg-green-600 left-2 h-3 absolute" style={`width: ${progress}%;`}></div>
		</div>
		<span>1</span>
		<span>2</span>
		<span>3</span>
	</div>

	<div class="flex flex-row justify-between">
		<p>Gebäudedaten</p>
		<p>Kundendaten</p>
		<p>Kaufabschluss</p>
	</div>
</div>

<style>
	.progress-section {
		@apply relative items-center flex flex-row justify-between px-8;
	}

	.progress-section span {
		@apply rounded-full bg-green-600 items-center relative flex h-8 w-8 justify-center text-white font-semibold;
	}

	p {
		padding: 0 !important;
		@apply p-0;
	}
</style>
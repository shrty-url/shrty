<script lang="ts">
	import type { ZIPInformation } from "src/lib/ZIPInformation";
	import Label from "./Label.svelte";

	export let name: string;
	export let readonly: boolean = false;
	export let city: string;
	export let zip: string = "";


	let hideZipDropdown: boolean = true;
	let zipCodes: ZIPInformation[] = [];

	async function fetchZipCodeInformation() {
		const result = await fetch(`/api/zip?zip=${zip}`, {
			method: "GET"
		}).then(r => r.json());

		if (result.success === true) {
			zipCodes = result.data;
			if (zipCodes.length > 0) {
				hideZipDropdown = false;
			}
		}
	}

	function clickOutside(element: HTMLElement, callbackFunction: () => any) {
		function onClick(event: MouseEvent) {
			if (!element.contains(event.target as HTMLElement)) {
				callbackFunction();
			}
		}
		
		document.body.addEventListener('click', onClick);
		
		return {
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		}
	}
</script>

<div class="relative" use:clickOutside={() => {
	hideZipDropdown = true;
}}>
	<Label name={name}>PLZ *</Label>
	<input
		name={name}
		id={name}
		class="zahlen"
		type="number"
		required
		readonly={readonly}
		bind:value={zip}
		on:input={fetchZipCodeInformation}
		on:focus={() => {
			if (zipCodes.length > 0) {
				hideZipDropdown = false
			}
		}}
		maxlength="5"
	/>

	<div class="absolute top-[calc(100%+4px)] left-0 w-full bg-white py-2 shadow-md rounded-lg" hidden={hideZipDropdown}>
		{#each zipCodes as {zip: z, city: c}}
			<div class="hover:bg-gray-100 cursor-pointer px-2 py-0.5" tabindex="-1" on:click={() => {
				zip = z;
				city = c;
				hideZipDropdown = true;
			}}>{z}, {c}</div>
		{/each}
	</div>
</div>
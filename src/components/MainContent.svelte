<script lang="ts">
	import valid from "valid-url";

	let url: string = "";
	let shortcode: string = "";

	async function shortenURL() {
		if (!valid.isUri(url)) {
			error = "Please make sure you enter a valid url.";
			return;
		}

		let result = await fetch("/api/shorten.json", {
			method: "POST",
			body: JSON.stringify({
				url,
			}),
		}).then((r) => r.json());

		if (!result.success) {
			error = "Something went wrong, please try again later.";
			return;
		}

		shortcode = result.data.shortcode;

		error = "";
	}

	async function copyShortCodeUrl() {
		if (!shortcode) {
			return
		}
		await navigator.clipboard.writeText(`http://shrty.it/${shortcode}`);
		copied = true;

		setTimeout(() => {
			copied = false;
		}, 400)
	}

	let copied = false;
	let error: string = "";
</script>

<div
	class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[600px] w-[100%] p-4 text-center"
>
	{#if !shortcode}
	<div>
		<span class="text-red-400">{error}</span>
		<div class="flex flex-row gap-4">
			<input
				type="text"
				placeholder="URL"
				class="w-full"
				bind:value={url}
			/>
			<button
				class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors active:bg-blue-800"
				on:click={shortenURL}>Shorten!</button
			>
		</div>
	</div>
	{/if}
	{#if shortcode}
		<div class="flex flex-col items-center justify-center gap-4">
			<h1>
				Your url has been shortened
			</h1>
			<div class="flex flex-row gap-4 items-center">
				<a href="http://shrty.it/{shortcode}" class="text-2xl">https://shrty.it/{shortcode}</a>
				<button on:click={copyShortCodeUrl}>
					<svg width="25" height="25" class:animate={copied} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
				</button>
			</div>
			
		</div>
	{/if}
</div>


<style>
	.animate {
		animation: wiggle 0.4s ease 0s 1 forwards;
	}

	@keyframes wiggle {
		0% {
			transform: rotate(0deg);
		}

		25% {
			transform: rotate(8deg);
		}

		50% {
			transform: rotate(-8deg) translateY(-6px);
		}

		75% {
			transform: rotate(8deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}
</style>
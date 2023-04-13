<script lang="ts">
	export let links: any[];
</script>

<div class="w-[1200px] mx-auto gap-4 flex flex-col">
	{#each links as link}
		<div class="border rounded-lg px-4 py-2">
					<p>Shrty URL</p>
					<a href="/analytics/{link.shortcode}">https://shrty.it/{link.shortcode}</a>
					<p>Link</p>
					<a href={link.url}>{link.url}</a>
		</div>
	{/each}
</div>
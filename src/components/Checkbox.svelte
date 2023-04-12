<script lang="ts">
	let id = Math.random().toString();

	export let checked: boolean = false;
</script>

<div class="flex flex-row gap-2 items-start my-2">
	<input type="checkbox" id={id} bind:checked={checked}>
	<label for={id}><slot></slot></label>
</div>
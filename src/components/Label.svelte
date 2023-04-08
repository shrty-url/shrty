<script lang="ts">
	export let name: string = "";
</script>

<div class="flex flex-row justify-between mb-2">
	<label class="text-base font-medium" for={name}><slot></slot></label>
</div>
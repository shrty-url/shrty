<script lang="ts">
	import type { UserType } from "src/lib/User/types";

	export let isLoggedIn: boolean;
	export let user: UserType;
</script>

<header class="border-b h-[60px] px-8 flex flex-row justify-between items-center">
	<a href="/"><img src="/logo-with-text.svg" alt="shrty" class="w-[120px]"></a>
	<div class="flex flex-row gap-4">
		<a href="/analytics">Analytics</a>
		{#if isLoggedIn}
			<a href="/user/">Dashboard</a>
		{:else}
			<a href="/user/login">Login</a>
		{/if}
	</div>
</header>
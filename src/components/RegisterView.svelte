<script lang="ts">
	let username: string;
	let password: string;
	let email: string;
	let hasError: boolean;

	async function login() {
		const response = await fetch("/api/user", {
			method: "PUT",
			body: JSON.stringify({
				username, password, email
			})
		})

		const json = await response.json()

		if (json.success == true) {
			window.location.href = "/login";
		} else {
			hasError = true;
		}
	}
</script>

<div style="width:50%;margin: 0 auto">
	<h1>Registrieren:</h1>
	<div class="login_page">
		{#if hasError}
			<p>Das hat leider nicht geklappt, haben sie ihr Passwort und den Nutzernamen richtig eingegeben?</p>
		{/if}
		<div class="block_4" style="margin-top: 25px;">
			<h4 class="heading_3">Benutzername</h4>
			<input
				type="text"
				placeholder="Benutzername"
				class="formInput"
				bind:value={username}
				required
			/>
		</div>
		<div class="block_4" style="margin-top: 25px;">
			<h4 class="heading_3">Email</h4>
			<input
				type="text"
				placeholder="Email"
				class="formInput"
				bind:value={email}
				required
			/>
		</div>
		<div class="block_4">
			<h4 class="heading_3">Passwort</h4>
			<input
				type="password"
				placeholder="********"
				class="formInput"
				bind:value={password}
				required
			/>
		</div>
		<div class="mt-2 flex flex-row justify-between">
			<button on:click={login}
				>Registrieren</button
			>
			<a class="button"
				href="/login">Einloggen</a
			>
		</div>
		<div class="flex-row justify-between" style="margin-top: 10px">
			<a href="/">Home</a>
			<a href="/user/passwort_vergessen">Passwort Vergessen?</a>
		</div>
	</div>
</div>
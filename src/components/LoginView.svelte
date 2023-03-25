<script lang="ts">
	import cookie from "cookiejs"

	let username: string;
	let password: string;
	let hasError: boolean;

	async function login() {
		const response = await fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				username, password
			})
		})

		const json = await response.json()

		if (json.success == true) {
			cookie.set("token", json.data.token);
			cookie.set("expires", json.data.expires);
			localStorage.setItem("token", json.data.token);
			localStorage.setItem("expires", json.data.expires);
			window.location.href = "/user";
		} else {
			hasError = true;
		}
	}
</script>

<div style="width:50%;margin: 0 auto">
	<h1>Login:</h1>
	<div class="login_page">
		{#if hasError}
			<p>Das hat leider nicht geklappt, haben sie ihr Passwort und den Nutzernamen richtig eingegeben?</p>
		{/if}
		<div class="block_4" style="margin-top: 25px;">
			<h4 class="heading_3">Benutzername</h4>
			<input
				type="text"
				placeholder="Benutzername"
				name="username"
				class="formInput"
				bind:value={username}
				required
			/>
		</div>
		<div class="block_4">
			<h4 class="heading_3">Passwort</h4>
			<input
				type="password"
				placeholder="********"
				name="password"
				class="formInput"
				bind:value={password}
				required
			/>
		</div>
		<div class="mt-2 flex flex-row justify-between">
			<button on:click={login}
				>Einloggen</button
			>
			<a class="button"
				href="/signup">Registrieren</a
			>
		</div>
		<div class="flex-row justify-between" style="margin-top: 10px">
			<a href="/">Home</a>
			<a href="/user/passwort_vergessen">Passwort Vergessen?</a>
		</div>
	</div>
</div>
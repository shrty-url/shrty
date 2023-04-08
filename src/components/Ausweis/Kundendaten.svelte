<script lang="ts">
	import ProgressBar from "~/components/Ausweis/Progressbar.svelte";
	import HelpLabel from "~/components/HelpLabel.svelte";
	import ZipSearch from "../ZIPSearch.svelte";

	let deliveryAddress: boolean = false;

	let mailAddressCity: string = "";
	let mailAddressZipCode: string = "";

	let invoiceAddressCity: string = "";
	let invoiceAddressZipCode: string = "";
</script>

<div class="col-12">
	<div class="row">
		<div class="flex flex-row gap-8 items-center mb-8">
			<div class="flex flex-col w-full">
				<h1>Verbrauchsausweis erstellen - 45€</h1>
				<ProgressBar progress={50} />
			</div>
		</div>

		<form
			method="post"
			target="_self"
			novalidate
			class="w-full"
			action="/kaufabschluss"
		>
			<fieldset>
				<div class="GRB3">
					<HelpLabel title="Ansprechpartner" />
					<hr />
					<div class="grid grid-cols-5 gap-4">
						<!-- Anrede -->
						<div>
							<label>Anrede *</label>
							<div>
								<select name="Aanrede" class="form-control">
									<option>bitte auswählen</option>
									<option value="Herr">Herr</option>
									<option value="Frau">Frau</option>
								</select>
							</div>
						</div>

						<!-- Vorname -->
						<div>
							<label>Vorname *</label>
							<input name="Avorname" type="text" required />
						</div>

						<!-- Nachname -->
						<div>
							<label>Nachname *</label>
							<input name="Anachname" type="text" required />
						</div>

						<!-- Telefon -->
						<div>
							<label>Telefon</label>
							<input
								name="Atelefon"
								class="zahlen"
								type="text"
							/>
						</div>

						<!-- Email -->
						<div>
							<label>E-Mail *</label>
							<input name="Aemail" type="email" required />
						</div>
					</div>
				</div>

				<hr />

				<div class="GRB3">
					<HelpLabel title="Rechnungsadresse" />
					<hr />
					<!-- Empfänger -->

					<div class="grid grid-cols-5 gap-4">
						<div>
							<label>Empfänger *</label>
							<input
								name="Rempfaenger"
								type="text"
								required
								data-rule-maxlength="100"
								data-msg-maxlength="max. 100 Zeichen"
							/>
						</div>

						<!-- Zusatzzeile -->
						<div>
							<label>Zusatzzeile</label>
							<input
								name="Rzusatzzeile"
								type="text"
								data-rule-maxlength="80"
								data-msg-maxlength="max. 80 Zeichen"
							/>
						</div>

						<!-- Strasse -->
						<div>
							<label>Straße, Hausnummer *</label>
							<input
								name="Rstrasse"
								type="text"
								required
								data-rule-maxlength="40"
								data-msg-maxlength="max. 40 Zeichen"
							/>
						</div>

						<!-- PLZ -->
						<ZipSearch name="vplz" bind:zip={invoiceAddressZipCode} bind:city={invoiceAddressCity}></ZipSearch>

						<!-- Ort -->
						<div>
							<label>Ort *</label>
							<input name="Rort" readonly type="text" required value={invoiceAddressCity} />
						</div>

						<!-- Telefon -->
						<div>
							<label>Telefon</label>
							<input
								name="Rtelefon"
								class="zahlen"
								type="text"
							/>
						</div>

						<!-- Email -->
						<div>
							<label>E-Mail</label>
							<input name="Remail" type="email" />
						</div>
					</div>
				</div>

				<hr />

				<div class="GRB3">
					<HelpLabel title="Versandadresse" />
					<hr />
					<div class="grid grid-cols-5 gap-4">
						<div class="flex flex-row gap-2 items-center">
							<input
								class="w-[15px] h-[15px]"
								type="checkbox"
								id="deliveryAddress"
								bind:checked={deliveryAddress}
							/>
							<label for="deliveryAddress"
								>Abweichende Versandadresse</label
							>
						</div>

						<!-- Empfänger -->
						<div>
							<label>Empfänger *</label>
							<input
								name="Vempfaenger"
								type="text"
								readonly={!deliveryAddress}
								required
								data-rule-maxlength="100"
								data-msg-maxlength="max. 100 Zeichen"
							/>
						</div>

						<!-- Zusatzzeile -->
						<div>
							<label>Zusatzzeile</label>
							<input
								name="Vzusatzzeile"
								type="text"
								readonly={!deliveryAddress}
								data-rule-maxlength="80"
								data-msg-maxlength="max. 80 Zeichen"
							/>
						</div>

						<!-- Strasse -->
						<div>
							<label>Straße, Hausnummer *</label>
							<input
								name="Vstrasse"
								type="text"
								readonly={!deliveryAddress}
								required
								data-rule-maxlength="40"
								data-msg-maxlength="max. 40 Zeichen"
							/>
						</div>

						<!-- PLZ -->
						<ZipSearch name="rplz" readonly={!deliveryAddress} bind:zip={mailAddressZipCode} bind:city={mailAddressCity}></ZipSearch>

						<!-- Ort -->
						<div>
							<label>Ort *</label>
							<input name="Vort" type="text" readonly required value={mailAddressCity} />
						</div>
					</div>
				</div>

				<hr />

				<div class="flex flex-row w-full justify-between">
					<button>Zurück</button>
					<button>Weiter</button>
				</div>
			</fieldset>
		</form>
	</div>
</div>

<style>
	:global(.GRB) {
		@apply border-2 border-[#ffcc03] p-4 flex flex-row rounded-lg justify-between w-full;
		background: linear-gradient(
			135deg,
			rgba(252, 234, 187, 1) 0%,
			rgba(253, 235, 189, 1) 52%,
			rgba(251, 223, 147, 1) 100%
		);
	}

	:global(.GRB3) {
		@apply flex flex-col border-2 border-[#ffcc03] p-4 rounded-lg;
		background: linear-gradient(
			135deg,
			rgba(252, 234, 187, 1) 0%,
			rgba(253, 235, 189, 1) 52%,
			rgba(251, 223, 147, 1) 100%
		);
	}

	input,
	select {
		display: block;
		width: 100%;
		height: calc(2.25rem + 2px);
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		color: #495057;
		background-color: #fff;
		background-clip: padding-box;
		border: 1px solid #ced4da;
		border-radius: 0.25rem;
	}
</style>

<script lang="ts">
	import AnsichtsausweisButton from "../AnsichtsausweisButton.svelte";
	import DatenblattButton from "../DatenblattButton.svelte";

	export let prices: number[];

	let basePrice: number = prices[0];
	let Qualitätsdruck: boolean;
	let Aushang: boolean;
	let SameDayService: boolean;
	let TelefonischeBeratung: boolean;

	$: price = basePrice + (Qualitätsdruck ? 9 : 0) + (Aushang ? 10 : 0) + (SameDayService ? 29 : 0) + (TelefonischeBeratung ? 75 : 0);
</script>

<div class="GRB">
	<table>
		<tr>
			<td><strong>Produkt:</strong></td>
			<td><input type="text" value="Verbrauchsausweis" readonly /> </td>
		</tr>
		<tr>
			<td><strong>Beschreibung:</strong></td>
			<td>
				<div
					style="background-color: #fff; padding:1em; border:1px solid #ccc;"
				>
					Registrierung beim DiBt<br />
					Prüfung durch Diplom Ingenieur<br />
					Energieausweis Vorschau als PDF<br />
				</div>
			</td>
		</tr>
		<tr>
			<td>Netto-Preis</td>
			<td
				><input
					style="width:100%;text-align:right;"
					type="text"
					id="Preisnetto"
					name="Preisnetto"
					value={(price * 0.81).toFixed(2) + "€"}
					readonly
				/></td
			>
		</tr>
		<tr>
			<td>19% gesetzl. MwSt.</td>
			<td
				><input
					style="width:100%;text-align:right;"
					type="text"
					id="Preismwst"
					name="Preismwst"
					value={(price * 0.19).toFixed(2) + "€"}
					readonly
				/></td
			>
		</tr>
		<tr>
			<td>Preis inkl. MwSt.</td>
			<td
				><input
					style="width:100%;text-align:right;font-weight:bold;"
					type="text"
					id="Preisbrutto"
					name="Preisbrutto"
					value={price + "€"}
					readonly
				/>

				<input type="hidden" id="Preiskomplett" name="Preiskomplett" />
			</td>
		</tr>
	</table>

	<hr />
	<div>
		<strong
			>Hiermit bestelle ich folgende Version des Energieausweises:<br
			/></strong
		>

		<table>
			<tr>
				<td
					>Verbrauchsausweis online für {prices[0]} € inkl. MwSt. als PDF
					per E-Mail</td
				>
				<td
					><input type="radio"  bind:group={basePrice} value={prices[0]} name="Preis"  checked />
				</td>
			</tr>
			<tr>
				<td
					>Verbrauchsausweis online inkl. Beratung für {prices[1]}
					€ inkl. MwSt. als PDF per E-Mail</td
				>
				<td><input type="radio" bind:group={basePrice} value={prices[1]} name="Preis" /> </td>
			</tr><tr>
				<td
					>Verbrauchsausweis offline für {prices[2]} € inkl. MwSt. als
					PDF per E-Mail (Sie schicken uns 3 Verbrauchsabrechnungen)</td
				>
				<td><input type="radio" bind:group={basePrice} value={prices[2]} name="Preis" /></td>
			</tr>
		</table>
	</div>

	<hr />

	<table>
		<strong>Zusatzleistungen:<br /></strong>

		<tr>
			<td
				>Qualitätsdruck per Post (zusätzlich zur PDF Version) für 9€
				inkl. MwSt.</td
			>
			<td
				><input
					type="checkbox"
					class="IGZusatzleistung"
					bind:checked={Qualitätsdruck}
					name="QD"
				/>
			</td>
		</tr>
		<tr>
			<td
				>Aushang (für öffentliche Gebäude gesetzlich vorgeschrieben) für
				10€ inkl. MwSt.</td
			>
			<td
				><input
					type="checkbox"
					class="IGZusatzleistung"
					bind:checked={Aushang}
					name="AH"
				/>
			</td>
		</tr>
		<tr>
			<td
				>Same Day Service (Bestellung Werktags vor 12:00 Uhr -
				Ausstellung bis 18:00 Uhr am gleichen Tag) für 29€ inkl. MwSt.</td
			>
			<td
				><input
					type="checkbox"
					class="IGZusatzleistung"
					bind:checked={SameDayService}
					name="SD"
				/>
			</td>
		</tr>
		<tr>
			<td>Telefonische Energieeffizienzberatung für 75€ inkl. MwSt.</td>
			<td
				><input
					type="checkbox"
					class="IGZusatzleistung"
					bind:checked={TelefonischeBeratung}
					name="NA"
				/>
			</td>
		</tr>
	</table>

	<hr />

	<div class="flex flex-row gap-4">
		<AnsichtsausweisButton />
		<DatenblattButton />
	</div>
</div>

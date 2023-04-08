<script lang="ts">
	import HelpLabel from "../HelpLabel.svelte";
	import moment from "moment";
	import Label from "../Label.svelte";
	import fuelList from "./fuelList";

	let availableYears = [
		2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
	];
	let availableMonths = [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember",
	];

	let month: number = 1;
	let year: number = availableYears[0];

	export let additionalHeating: boolean = false;
	// Verbräuche aller drei Verbrauchsjahre der primären Energiequelle
	export let energyConsumption: number[] = [0, 0, 0];
	// Verbräuche aller drei Verbrauchsjahre der sekundären Energiequelle
	export let additionalEnergyConsumption: number[] = [0, 0, 0];

	export let climateFactors: number[];

	export let conversionFactor: number;

	export let calorificValueFactor: number;

	$: conversionFactor =
		fuelList.find((x) => {
			return x.energietraeger == fuel && x.einheit == unit;
		})?.umrechnungsfaktor || 1;

	$: calorificValueFactor =
		fuelList.find((x) => {
			return x.energietraeger == fuel && x.einheit == unit;
		})?.heizwertfaktor || 1;

	async function fetchClimateFactors() {
		const url = `/api/climate_factor?start=${month}.01.${year}&end=${month}.01.${
			year + 2
		}&accuracy=years&zip=21039`;

		fetch(url)
			.then((response) => response.json())
			.then((result) => {
				climateFactors = Object.values(result.data);
			});
	}

	const fuelMap: Record<string, string[]> = {};
	for (const fuel of fuelList) {
		fuelMap[fuel.energietraeger] = fuelMap[fuel.energietraeger] || [];
		fuelMap[fuel.energietraeger].push(fuel.einheit);
	}

	let fuel: string = fuelList[0].energietraeger;
	let unit: string = fuelList[0].einheit;
</script>

<div class="w-full flex flex-col gap-4">
	<div class="w-full grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-6">
		<div>
			<HelpLabel title="zusätzliche Heizquelle">
				Wenn eine zusätzliche Heizquelle vorhanden geben Sie hier drei
				zusammenhängende Verbrauchsjahre ein. Es sollen die gleichen
				Verbrauchszeiträume wie bei der primären Heizung verwendet
				werden.
			</HelpLabel>
			<input
				type="checkbox"
				class="IGzus1verbrauch1"
				bind:checked={additionalHeating}
			/>
		</div>

		<div>
			<HelpLabel title="Brennstoff *">
				<b>Heizöl:</b> Flüssiger Brennstoff; Heizöl wird aus schwer
				entflammbaren Anteilen des Erdöls hergestellt.<br /><br />
				<b>Erdgas H, Erdgas L:</b> Brennbares Naturgas das in
				unterirdischen Lagerstätten vorkommt. Erdgas H hat im Vergleich
				zu Erdgas L einen leicht höheren Methangehalt, und daher einen
				etwas besseren Brennwert.<br /><br />
				<b>Flüssiggas:</b> Meist Propan, Butan und deren Gemische, die
				bei Raumtemperatur unter vergleichsweise geringem Druck flüssig
				bleiben.<br /><br />
				<b>Braunkohle:</b> Durch Druck und Luftabschluss von organischen
				Substanzen entstandenes, bräunlich-schwarzes Sedimentgestein.<br
				/><br />
				<b>Holz-Pellets:</b> Stäbchenförmige Pellets die vollständig
				oder überwiegend aus Holz oder Sägenebenprodukten hergestellt
				werden.<br /><br />
				<b>Holzhackschnitzel:</b> Mit schneidenden Werkzeugen
				zerkleinertes Holz.<br /><br />
				<b>Nahwärme, Fernwärme:</b> Versorgung von thermischer Energie
				über wärmegedämmte Rohrsysteme. Die Wärme wird dabei örtlich von
				Heizwerken produziert oder besteht aus Prozesswärme von BHKW's.
				Im Unterschied zu Fernwärme wird Nahwärme in kleineren Einheiten
				dezentral realisiert.<br /><br />
				<b>Strommix:</b> Heizen mit Strom (Nachtspeicher).<br /><br />
				<b>Koks:</b> Stark kohlenstoffhaltiger Brennstoff.<br /><br />
			</HelpLabel>
			<div>
				<select name="energietraeger_1" required bind:value={fuel}>
					<option>Bitte auswählen</option>
					{#each Object.keys(fuelMap) as fuel}
						<option value={fuel}>{fuel}</option>
					{/each}
				</select>
			</div>
		</div>

		<div>
			<HelpLabel title="Einheit *">
				Bitte geben Sie die Einheit ein. Erdgas wird meist auf der
				Abrechnung in kWh ausgewiesen. Heizöl liegt meistens in Litern
				vor. Pellets oder Brennholz in SRm (Schüttraummetern).
			</HelpLabel>
			<div>
				<select
					name="energietraeger_einheit_heizquelle_1"
					required
					bind:value={unit}
				>
					<option>Bitte auswählen</option>
					{#each fuelMap[fuel] as unit}
						<option value={unit}>{unit}</option>
					{/each}
				</select>
			</div>
		</div>

		<div>
			<Label>Brennstoff *</Label>
			<div>
				<select
					name="energietraeger_2"
					disabled={!additionalHeating}
					required
				>
					<option> Bitte auswählen</option>
					<!-- TODO: Energieträger aus Datenbank holen -->
				</select>
			</div>
		</div>

		<div>
			<Label>Einheit *</Label>
			<div>
				<select
					name="energietraeger_einheit_heizquelle_2"
					disabled={!additionalHeating}
					required
				>
					<option>Bitte auswählen</option>
					<option value="kWh"> kWh</option>
					<option value="m³">m³</option>
					<option value="l">l</option>
					<option value="kg">kg</option>
					<option value="SRm"> SRm</option>
				</select>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-[2fr_1fr_2fr_2fr] gap-6">
		<div class="flex flex-col gap-2">
			<div class="column">
				<span>von</span>
				<select
					name="energieverbrauch_zeitraum_monat"
					class="rounded-tr-none rounded-br-none w-full m-0"
					bind:value={month}
					on:change={fetchClimateFactors}
					required
				>
					<option>auswählen</option>
					{#each availableMonths as m, i}
						<option value={i + 1}>{m}</option>
					{/each}
				</select>

				<select
					name="energieverbrauch_zeitraum_jahr"
					class="rounded-tl-none rounded-bl-none w-full m-0"
					bind:value={year}
					on:change={fetchClimateFactors}
					required
				>
					<option>auswählen</option>
					{#each availableYears as y}
						<option value={y}>{y}</option>
					{/each}
				</select>
			</div>
			<div class="column">
				<span>von</span>
				<input
					class="klima"
					value={moment(`${month}.01.${year}`)
						.add("1", "year")
						.format("MM.Y")}
					readonly
				/>
			</div>
			<div class="column">
				<span>von</span>
				<input
					class="klima"
					value={moment(`${month}.01.${year}`)
						.add("2", "years")
						.format("MM.Y")}
					readonly
				/>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="column">
				<span>bis</span>
				<input
					class="form-control"
					value={moment(`${month}.01.${year}`)
						.add("1", "year")
						.format("MM.Y")}
					readonly
				/>
			</div>
			<div class="column">
				<span>bis</span>
				<input
					class="form-control"
					value={moment(`${month}.01.${year}`)
						.add("2", "years")
						.format("MM.Y")}
					readonly
				/>
			</div>
			<div class="column">
				<span>bis</span>
				<input
					class="form-control"
					value={moment(`${month}.01.${year}`)
						.add("3", "years")
						.format("MM.Y")}
					readonly
				/>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="column">
				<span>Verbrauch</span>
				<input
					name="energieverbrauch_1_heizquelle_1"
					type="number"
					bind:value={energyConsumption[0]}
					required
				/>
			</div>
			<div class="column">
				<span>Verbrauch</span>
				<input
					name="energieverbrauch_2_heizquelle_1"
					type="number"
					bind:value={energyConsumption[1]}
					required
				/>
			</div>
			<div class="column">
				<span>Verbrauch</span>
				<input
					name="energieverbrauch_3_heizquelle_1"
					type="number"
					bind:value={energyConsumption[2]}
					required
				/>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<div class="column">
				<span>Verbrauch</span>
				<input
					name="energieverbrauch_1_heizquelle_2"
					type="number"
					bind:value={additionalEnergyConsumption[0]}
					disabled={!additionalHeating}
				/>
			</div>
			<div class="column">
				<span>Verbrauch</span>
				<input
					name="energieverbrauch_2_heizquelle_2"
					type="number"
					bind:value={additionalEnergyConsumption[1]}
					disabled={!additionalHeating}
				/>
			</div>
			<div class="column">
				<span>Verbrauch</span>
				<input
					name="energieverbrauch_3_heizquelle_2"
					type="number"
					bind:value={additionalEnergyConsumption[2]}
					disabled={!additionalHeating}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.column {
		@apply flex flex-row items-center gap-4;
	}
</style>

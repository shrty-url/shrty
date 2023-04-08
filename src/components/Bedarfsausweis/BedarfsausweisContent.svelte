<script lang="ts">
	import PerformanceScore from "~/components/Ausweis/PerformanceScore.svelte";
	import Progressbar from "~/components/Ausweis/Progressbar.svelte";
	import Hilfe from "~/components/Ausweis/Hilfe.svelte";
	import Ausweisart from "~/components/Ausweis/Ausweisart.svelte";
	import Label from "~/components/Label.svelte";
	import HelpLabel from "~/components/HelpLabel.svelte";
	import ZipSearch from "~/components/ZIPSearch.svelte";
	import HeizungImage from "../Ausweis/HeizungImage.svelte";
	import FensterImage from "../Ausweis/FensterImage.svelte";
	import DaemmungImage from "../Ausweis/DaemmungImage.svelte";
	import { hotWaterProductionTypes } from "./HotWaterProductionTypes";
	import AusweisPreviewContainer from "../Ausweis/AusweisPreviewContainer.svelte";

	let constructionYear: number;
	let apartmentCount: number;
	let certificateReason:
		| "Vermietung"
		| "Neubau"
		| "Verkauf"
		| "Modernisierung"
		| "Sonstiges";
	let sanitationStatus: boolean;

	let zip: string = "";
	let city: string = "";

	let insulationWidths = [0, 0.02, 0.05, 0.08, 0.12, 0.16, 0.2, 0.3, 0.4];

	let windowTypes = {
		Einfachverglasung: 5,
		"Holzfenster Doppelverglasung": 2.7,
		"Kunststofffenster Doppelverglasung": 3,
		"Alu- oder Stahlfenster Doppelverglasung": 4.3,
		"Fenster Doppelverglasung (ab 1995)": 1.8,
		"Fenster Doppelverglasung (U-Wert 1,1)": 1.1,
		"Dreifach-Wärmeschutzverglasung(U-Wert 0,9)": 0.9,
		"Dreifach-Wärmeschutzverglasung(U-Wert 0,85)": 0.85,
		"Passivhausfenster(U-Wert 0,7)": 0.7,
		"Passivhausfenster(U-Wert 0,6)": 0.6,
		"Fenster mit U-Wert 2,3": 2.3,
		"Fenster mit U-Wert 1,6": 1.6,
		"Fenster mit U-Wert 1,7": 1.7,
		"Fenster mit U-Wert 1,3": 1.3,
		"Fenster mit U-Wert 1": 1,
	};

	const arrayRange = (start: number, stop: number, step: number) =>
		Array.from(
			{ length: (stop - start) / step + 1 },
			(value, index) => start + index * step
		);
</script>

<div class="flex flex-row gap-8 items-center mb-8">
	<div class="flex flex-col w-full">
		<h1>Bedarfsausweis erstellen - 75€</h1>
		<Progressbar progress={0} />
	</div>

	<PerformanceScore performance={0} />
</div>

<form
	method="post"
	target="_self"
	action="FORM/transfer/VA_1to2.php"
	enctype="multipart/form-data"
>
	<fieldset
		class="bg-[rgba(252,234,187,0.2)] border-2 p-4 rounded-lg border-[#ffcc03]"
	>
		<div class="flex flex-row justify-between">
			<a class="button" href="/speichern">Später Weitermachen</a>
			<Hilfe />
		</div>

		<hr />
		<Label>A - Prüfung der Ausweisart</Label>
		<Ausweisart
			bind:constructionYear
			bind:apartmentCount
			bind:certificateReason
			bind:sanitationStatus
		/>
		<hr />
		<Label
			>B - Eingabe der Gebäudeadresse - Angaben zu Wohnfläche, Gebäudetyp
			und Gebäudeteil</Label
		>
		<div class="GRB">
			<!-- Strasse -->
			<div>
				<HelpLabel title="Straße, Hausnummer *"
					>Bitte geben Sie hier die Straße und Hausnummer des Gebäudes
					ein.</HelpLabel
				>
				<div>
					<input
						name="objekt_strasse"
						class=" strasse"
						type="text"
						required
					/>
				</div>
			</div>
			<!-- PLZ -->
			<ZipSearch bind:zip bind:city name="zip" />
			<!-- Objekt Ort -->
			<div>
				<HelpLabel title="Ort *"
					>Ort des Gebäudes wird automatisch ermittelt.</HelpLabel
				>
				<div>
					<input name="objekt_ort" class=" buchstaben" type="text" />
				</div>
			</div>

			<!-- Wohnfläche -->
			<div>
				<HelpLabel title="Wohnfläche m² *"
					>Bitte geben Sie hier die beheizte Wohnfläche in m² ein.
					Dabei handelt es sich um die Wohnfläche abzüglich
					vorhandener Flächen die sich außerhalb des Gebäudes
					befinden. (Balkone, Terassen,etc.).</HelpLabel
				>
				<div>
					<input name="wohnflaeche" required />
				</div>
			</div>
			<!-- Gebäudetyp -->
			<div>
				<HelpLabel title="Gebäudetyp *"
					>Bitte wählen Sie hier den Gebäudetyp aus.
				</HelpLabel>
				<div>
					<select name="objekt_typ" required>
						<option>Bitte auswählen</option>
						<option value="Einfamilienhaus">
							Einfamilienhaus</option
						>
						<option value="Freistehendes Einfamilienhaus">
							Freistehendes Einfamilienhaus</option
						>
						<option value="Freistehendes Zweifamilienhaus">
							Freistehendes Zweifamilienhaus</option
						>
						<option value="Doppelhaushälfte">
							Doppelhaushälfte</option
						>
						<option value="Reihenendhaus"> Reihenendhaus</option>
						<option value="Reihenmittelhaus">
							Reihenmittelhaus</option
						>
						<option value="Mehrfamilienhaus">
							Mehrfamilienhaus</option
						>
						<option value="Wohn- und Geschäftshaus">
							Wohn- und Geschäftshaus</option
						>
						<option value="Atrium-Bungalow">
							Atrium-Bungalow</option
						>
						<option value="Winkelbungalow"> Winkelbungalow</option>
					</select>
				</div>
			</div>
			<!-- Gebäudeteil -->
			<div>
				<HelpLabel title="Gebäudeteil *"
					>Bitte geben Sie hier den Gebäudeteil ein. In den meisten
					Fällen handelt es sich um das Gesamtgebäude. Sollte es sich
					allerdings um ein Gebäude mit mehr als 10% Gewerbeanteil
					handeln, so sollten 2 Ausweise erstellt werden. In diesem
					Fall wählen Sie Gebäudeteil 'Wohnen' bzw. Gebäudeteil
					'Gewerbe'.</HelpLabel
				>
				<div>
					<select name="objekt_gebaeudeteil" required>
						<option>Bitte auswählen</option>
						<option value="Gesamtgebäude"> Gesamtgebäude</option>
						<option value="Wohnen"> Wohnen</option>
					</select>
				</div>
			</div>
		</div>

		<hr />
		<Label
			>C - Berechnungshilfe und Tabelle der Hüllflächen, U-Werte und
			Gebäudevolumen</Label
		>
		<div class="grid grid-cols-[3fr_2fr] gap-4">
			<div class="GRB3 gap-4">
				<HelpLabel
					title="Berechnungshilfe - Eingabe der Grundfläche, Gechossanzahl und -höhe"
					>Hier wählen Sie Ihren passenden Grundriss aus, und tragen
					die entsprechenden Maße unten ein. Bitte berücksichtigen Sie
					nur den Grundriss der zum beheizten Gebäude gehört. Garagen
					oder Schuppen die an das Haus herangebaut sind aber keine
					Verbindung zum Wohnhaus haben bitte weglassen.</HelpLabel
				>

				<div class="grid grid-cols-4 gap-4">
					<!-- Anzahl Vollgeschosse -->
					<div>
						<HelpLabel title="Anzahl Vollgeschosse *"
							>Bitte geben Sie hier die Anzahl der Vollgeschosse
							an. Keller und Dachgeschoss mit Schrägen zählen
							nicht dazu.</HelpLabel
						>
						<input
							name="anzahl_vollgeschosse"
							type="number"
							required
						/>
					</div>
					<!-- Geschosshöhe -->
					<div>
						<HelpLabel title="Geschosshöhe *"
							>Bitte geben Sie hier die Geschosshöhe (lichte
							Raumhöhe + Deckenstärke) des Gebäudes ein. Bei
							unterschiedlichen Geschosshöhen bilden Sie einen
							Mittelwert.</HelpLabel
						>
						<select name="geschosshoehe" required>
							<option>Bitte auswählen</option>
							{#each arrayRange(2.1, 4.5, 0.1) as step}
								<option value={step}>{step.toFixed(2)} m</option
								>
							{/each}
						</select>
					</div>
					<!-- Warmwasser Antel -->
					<div>
						<HelpLabel title="Gaubenanzahl"
							>Wenn Ihr Gebäude Dachgauben besitzt geben Sie hier
							die Anzahl ein.</HelpLabel
						>
						<input name="anzahl_gauben" type="number" />
					</div>
					<!-- Warmwasser Antel -->
					<div>
						<HelpLabel title="Breite aller Gauben in m"
							>Bitte geben Sie hier die Gesamtbreite aller Gauben
							in m ein.</HelpLabel
						>
						<select name="breite_gauben">
							<option>Bitte auswählen</option>
							{#each arrayRange(0.5, 10, 0.1) as step}
								<option value={step}>{step.toFixed(2)} m</option
								>
							{/each}
						</select>
					</div>
				</div>

				<div class="grid grid-cols-4 gap-4">
					<img src="/images/r.png" alt="rechteck" />
					<img src="/images/l.png" alt="l-form" />
					<img src="/images/t.png" alt="t-form" />
					<img src="/images/u.png" alt="u-form" />
				</div>

				<div class="grid grid-cols-6 gap-4">
					<div>
						<HelpLabel title="A"
							>Bitte Eingabe in m. Punkt statt Komma verwenden
							z.B.: 10.40 (Eingabebeispiel)</HelpLabel
						>
						<input name="masse_a" type="number" />
					</div>
					<div>
						<Label>B</Label>
						<input name="masse_b" type="number" />
					</div>
					<div>
						<Label>C</Label>
						<input name="masse_c" type="number" />
					</div>
					<div>
						<Label>D</Label>
						<input name="masse_d" type="number" />
					</div>
					<div>
						<Label>E</Label>
						<input name="masse_e" type="number" />
					</div>
					<div>
						<Label>F</Label>
						<input name="masse_f" type="number" />
					</div>
				</div>

				<div class="grid grid-cols-3 gap-4">
					<div>
						<Label>Fensterfläche Südost bis Südwest in m²</Label>
						<input name="fensterflaeche_so_sw" type="number" />
					</div>
					<div>
						<Label>Fensterfläche Nordwest bis Nordost in m²</Label>
						<input name="fensterflaeche_nw_no" type="number" />
					</div>
					<div>
						<Label>Außenwandfläche an unbeheizten Vorbau</Label>
						<input
							name="aussenwandflaeche_unbeheizt"
							type="number"
						/>
					</div>
				</div>
			</div>
			<div class="GRB3">
				<HelpLabel title="Außenflächen, U-Werte und Volumen"
					>Die wärmeübertragende Umfassungsflächen sind die
					Hüllflächen des beheizten Gebäudes die an die Außenluft bzw.
					an unbeheizte Vorbauten grenzen. Wenn Ihnen die
					Außenwand-,Dach-,Decken- und Bodenflächen vorliegen können
					Sie die Eingabe direkt vornehmen. Hier können Sie auch das
					von den Umfassungsflächen eingeschlossene Volumen des
					Gebäudes eingeben. Die ermittelten Werte der
					Berechnungshilfe können hier präzisiert werden.</HelpLabel
				>
				<div>
					<Label>Tabellenwerte manuell ändern</Label>
					<input type="checkbox" name="tabellenwerte_aendern" />
				</div>

				<div class="grid grid-cols-2 gap-4">
					<!-- Verbrauch 1 Monat -->
					<div>
						<Label>Dachfläche in m²</Label>
						<input name="dachflaeche" type="number" />
					</div>
					<div>
						<Label>U-Wert in W/m²K</Label>
						<input name="dach_u_wert" type="number" />
					</div>
					<!-- Verbrauch1-row-close -->
				</div>
				<!-- Verbrauch1-close -->
				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label>Geschoßdecke in m²</Label>
						<input name="deckenflaeche" type="number" />
					</div>
					<div>
						<Label>U-Wert in W/m²K</Label>
						<input name="decke_u_wert" type="number" />
					</div>
					<!-- Verbrauch2-row-close -->
				</div>
				<!-- Verbrauch2-container-close -->
				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label>Außenwand in m²</Label>
						<input name="aussenwand_flaeche" type="number" />
					</div>
					<div>
						<Label>U-Wert in W/m²K</Label>
						<input name="aussenwand_u_wert" type="number" />
					</div>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<Label>Fußboden in m²</Label>
						<input name="fussboden_flaeche" type="number" />
					</div>
					<div>
						<Label>U-Wert in W/m²K</Label>
						<input name="fussboden_u_wert" type="number" />
					</div>
				</div>

				<div>
					<Label
						>Das von den Flächen eingeschlossene Gebäudevolumen in
						m³</Label
					>
					<input name="volumen" type="number" />
				</div>

				<div>
					<Label>Blower-Door-Test erfolgreich durchgeführt</Label>
					<div class="flex flex-row gap-4">
						<label class="radio-inline"
							><input
								type="radio"
								value="Ja"
								name="dichtheit"
							/>Ja</label
						>
						<label class="radio-inline"
							><input
								type="radio"
								value="Nein"
								name="dichtheit"
							/>Nein</label
						>
					</div>
				</div>
			</div>
		</div>
		<hr />
		<Label
			>D - Eingabe der Fensterflächen und Konstruktion von Dach, Wänden
			und Boden</Label
		>
		<div class="box grid grid-cols-4 gap-4">
			<!-- Fensterfläche -->
			<div>
				<HelpLabel title="Fensterfläche 1 in m² *"
					>Bitte geben Sie hier die Fläche der Fenster ein.</HelpLabel
				>
				<input
					name="fenster_flaeche_1"
					type="text"
					required
					placeholder="0"
				/>
			</div>
			<!-- Fensterart -->
			<div>
				<HelpLabel title="Art der Fenster *"
					>Bitte geben Sie hier die Art der Fenster ein.</HelpLabel
				>
				<select name="fenster_art_1">
					<option>bitte auswählen</option>
					{#each Object.entries(windowTypes) as [name, value]}
						<option {value}>{name}</option>
					{/each}
				</select>
			</div>
			<!-- Fensterfläche -->
			<div>
				<HelpLabel title="Fensterfläche 2 in m² *"
					>Wenn vorhanden geben Sie hier die Fläche der Fenster ein
					die älter sind oder einen anderen U-Wert besitzen.</HelpLabel
				>
				<input name="fenster_flaeche_2" type="text" placeholder="0" />
			</div>
			<!-- Fensterart -->
			<div>
				<HelpLabel title="Art der Fenster *"
					>Bitte geben Sie hier die Art der Fenster ein.</HelpLabel
				>
				<select name="fenster_art_2" required>
					<option>bitte auswählen</option>
					{#each Object.entries(windowTypes) as [name, value]}
						<option {value}>{name}</option>
					{/each}
				</select>
			</div>
			<!-- Fensterfläche -->
			<div>
				<HelpLabel title="Dachfenster in m² *"
					>Bitte geben Sie hier die Fläche der Dachfenster ein.</HelpLabel
				>
				<input name="dachfenster_flaeche" type="text" placeholder="0" />
			</div>
			<!-- Fensterart -->
			<div>
				<HelpLabel title="Art der Dachfenster *"
					>Bitte geben Sie hier die Art der Fenster ein.</HelpLabel
				>
				<select name="dachfenster_art">
					<option>bitte auswählen</option>
					{#each Object.entries(windowTypes) as [name, value]}
						<option {value}>{name}</option>
					{/each}
				</select>
			</div>
			<!-- Fensterfläche -->
			<div>
				<HelpLabel title="Haustür in m² *"
					>Bitte geben Sie hier die Fläche der Haustür ein.</HelpLabel
				>
				<input name="haustuer_flaeche" type="text" placeholder="0" />
			</div>
			<!-- Fensterart -->
			<div>
				<HelpLabel title="Art der Tür *"
					>Bitte geben Sie hier die Art der Haustür ein.</HelpLabel
				>
				<select name="haustuer_art" required>
					<option>bitte auswählen</option>
					<option value="1.8">Standard (U-Wert 1,8)</option>
					<option value="5">Ganz alte Tür (U-Wert 5,0)</option>
					<option value="2.7">U-Wert 2,7</option>
					<option value="3">U-Wert 3,0</option>
					<option value="4.3">U-Wert 4,3</option>
					<option value="1.1">U-Wert 1,1</option>
					<option value="0.9">U-Wert 0,9</option>
					<option value="0.85">U-Wert 0,85</option>
					<option value="0.7">Passivhaustür (U-Wert 0,7)</option>
					<option value="0.6">Passivhaustür (U-Wert 0,6)</option>
					<option value="2.3">U-Wert 2,3</option>
					<option value="1.6">U-Wert 1,6</option>
					<option value="1.7">U-Wert 1,7</option>
					<option value="1.3">U-Wert 1,3</option>
					<option value="1">U-Wert 1,0</option>
				</select>
			</div>
		</div>

		<hr />
		<div class="box grid grid-cols-4 gap-4">
			<!-- Bauart Geschossdecke -->
			<div>
				<HelpLabel title="Bauart Dachfläche *"
					>Bitte geben Sie hier die Bauart der Dachfläche ein.</HelpLabel
				>
				<select name="dach_bauart" required>
					<option>bitte auswählen</option>
					<option value="Massive Konstruktion"
						>Massive Konstruktion (insbesondere Flachdächer)</option
					>
					<option value="Holzkonstruktion"
						>Holzkonstruktion (insbesondere Steildächer)</option
					>
				</select>
			</div>
			<!-- nachträgliche Dämmung -->
			<div>
				<HelpLabel title="nachträgliche Dämmung"
					>Bitte geben Sie hier die nachträgliche Dämmung ein.</HelpLabel
				>
				<select name="dach_daemmung" required>
					<option>bitte auswählen</option>
					{#each insulationWidths as width}
						<option value={width}>{width * 100} cm</option>
					{/each}
				</select>
			</div>
			<!-- Bauart Geschossdecke -->
			<div>
				<HelpLabel title="Bauart Geschossdecke *"
					>Bitte geben Sie hier die Bauart der Geschossdecke ein.</HelpLabel
				>
				<select name="decke_bauart" required>
					<option>bitte auswählen</option>
					<option value="Massive Konstruktion"
						>Massive Konstruktion (insbesondere Flachdächer)</option
					>
					<option value="Holzkonstruktion"
						>Holzkonstruktion (insbesondere Steildächer)</option
					>
				</select>
			</div>
			<!-- nachträgliche Dämmung -->
			<div>
				<HelpLabel title="nachträgliche Dämmung"
					>Bitte geben Sie hier die nachträgliche Dämmung ein.</HelpLabel
				>
				<select name="decke_daemmung" required>
					<option>bitte auswählen</option>
					{#each insulationWidths as width}
						<option value={width}>{width * 100} cm</option>
					{/each}
				</select>
			</div>
			<!-- Bauart Geschossdecke -->
			<div>
				<HelpLabel title="Bauart Außenwand *"
					>Bitte geben Sie hier die Bauart der Außenwand ein.</HelpLabel
				>
				<select name="aussenwand_bauart" required>
					<option>bitte auswählen</option>
					<option value="Massive Konstruktion"
						>Massive Konstruktion (insbesondere Flachdächer)</option
					>
					<option value="Holzkonstruktion"
						>Holzkonstruktion (insbesondere Steildächer)</option
					>
				</select>
			</div>
			<!-- nachträgliche Dämmung -->
			<div>
				<HelpLabel title="nachträgliche Dämmung"
					>Bitte geben Sie hier die nachträgliche Dämmung ein.</HelpLabel
				>
				<select name="aussenwand_daemmung" required>
					<option>bitte auswählen</option>
					{#each insulationWidths as width}
						<option value={width}>{width * 100} cm</option>
					{/each}
				</select>
			</div>
			<!-- Bauart Geschossdecke -->
			<div>
				<HelpLabel title="Bauart Fußboden *"
					>Bitte geben Sie hier die Bauart des Fußbodens ein.</HelpLabel
				>
				<select name="boden_bauart" required>
					<option>bitte auswählen</option>
					<option value="Massive Konstruktion"
						>Massive Konstruktion (insbesondere Flachdächer)</option
					>
					<option value="Holzkonstruktion"
						>Holzkonstruktion (insbesondere Steildächer)</option
					>
				</select>
			</div>
			<!-- nachträgliche Dämmung -->
			<div>
				<HelpLabel title="nachträgliche Dämmung"
					>Bitte geben Sie hier die nachträgliche Dämmung ein.</HelpLabel
				>
				<select name="boden_daemmung" required>
					<option>bitte auswählen</option>
					{#each insulationWidths as width}
						<option value={width}>{width * 100} cm</option>
					{/each}
				</select>
			</div>
		</div>

		<hr />
		<Label>E - Angabe zu Keller, Dachgeschoss, Lüftung und Kühlung</Label>
		<div class="box">
			<div class="grid grid-cols-4 gap-4 w-full">
				<!-- Keller -->
				<div>
					<label class="control-label" for="keller_beheizt"
						>Keller *
					</label>
					<div>
						<select name="keller_beheizt" required>
							<option> Bitte auswählen</option>
							<option value="Nicht Vorhanden">
								nicht vorhanden</option
							>
							<option value="Unbeheizt"> unbeheizt</option>
							<option value="Beheizt"> beheizt</option>
						</select>
					</div>
				</div>
				<!-- Dachgeschoss -->
				<div>
					<label class="control-label" for="dachgeschoss"
						>Dachgeschoss *
					</label>
					<div>
						<select name="dachgeschoss" required>
							<option> Bitte auswählen</option>
							<option value="Nicht Vorhanden">
								nicht vorhanden</option
							>
							<option value="Unbeheizt"> unbeheizt</option>
							<option value="Beheizt"> beheizt</option>
						</select>
					</div>
				</div>
				<!-- Lüftung -->
				<div>
					<HelpLabel title="Lüftung erfolgt durch:"
						>Bitte geben Sie hier ein ob über die Fenster natürlich
						belüftet wird oder über eine Lüftungsanlage.</HelpLabel
					>
					<div>
						<select name="lueftungskonzept" required>
							<option> Bitte auswählen</option>
							<option value="Fensterlüftung">
								Fensterlüftung</option
							>
							<option value="Schachtlüftung">
								Schachtlüftung</option
							>
							<option
								value="Lüftungsanlage ohne Wärmerückgewinnung"
							>
								Lüftungsanlage ohne Wärmerückgewinnung</option
							>
							<option
								value="Lüftungsanlage mit Wärmerückgewinnung"
							>
								Lüftungsanlage mit Wärmerückgewinnung</option
							>
						</select>
					</div>
				</div>
				<!-- Lüftung -->
				<div>
					<HelpLabel title="Anlage zur Kühlung"
						>Bitte geben Sie an ob das Gebäude im Sommer zusätzlich
						gekühlt wird.</HelpLabel
					>
					<div>
						<select name="wird_gekuehlt" required>
							<option> Bitte auswählen</option>
							<option value="1"> vorhanden</option>
							<option value="0"> nicht vorhanden</option>
						</select>
					</div>
				</div>
			</div>

			<!-- Alternative Energieversorgungssyteme -->
			<div>
				<HelpLabel
					title="Alternative Energieversorgungssyteme werden genutzt für"
					>Bitte setzen Sie den Haken falls nachhaltige CO2-Effiziente
					Heizungssysteme vorhanden sind. Das wäre beispielsweise bei
					Pelletofen, Wärmepumpe, BHKW, Solarsystem, etc. der Fall.</HelpLabel
				>
				<div class="grid grid-cols-4 gap-4 w-full">
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="energiequelle_2_nutzung_1"
							value="Heizung"
						/>Heizung</label
					>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="energiequelle_2_nutzung_2"
							value="Warmwasser"
						/>Warmwasser</label
					>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="energiequelle_2_nutzung_3"
							value="Lüftung"
						/>Lüftung</label
					>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="energiequelle_2_nutzung_4"
							value="Kühlung"
						/>Kühlung</label
					>
				</div>
			</div>
		</div>

		<hr />
		<Label>F - Eingabe der Heizungsanlage</Label>
		<div class="box grid grid-cols-4 gap-4">
			<!-- Brennstoff -->
			<div>
				<HelpLabel title="Energieträger *"
					>Bitte geben Sie hier den Energieträger der Heizung ein.</HelpLabel
				>
				<select name="energietraeger_1" required>
					<option>Bitte auswählen</option>
				</select>
			</div>
			<!-- Verteilung Warmwasser -->
			<div>
				<HelpLabel title="Verteilung Warmwasser *"
					>Bitte geben Sie hier die Warmwasserverteilung ein.</HelpLabel
				>
				<select name="warmwasser_verteilung">
					<option>Bitte auswählen</option>
					<option value="zvmzbis1978"
						>zentrale Verteilung mit Zirkulation (bis 1978)</option
					>
					<option value="zvmzngbis1978"
						>zentrale Verteilung mit Zirkulation nachträglich
						gedämmt (bis 1978)</option
					>
					<option value="zvmzvon1979bis1994"
						>zentrale Verteilung mit Zirkulation (von 1979 - 1994)</option
					>
					<option value="zvmzab1995"
						>zentrale Verteilung mit Zirkulation (ab 1994)</option
					>
					<option value="zvozbis1978"
						>zentrale Verteilung ohne Zirkulation (bis 1978)</option
					>
					<option value="zvozngbis1978"
						>zentrale Verteilung ohne Zirkulation nachträglich
						gedämmt (bis 1978)</option
					>
					<option value="zvozvon1979bis1994"
						>zentrale Verteilung ohne Zirkulation (von 1979 - 1994)</option
					>
					<option value="zvozab1995"
						>zentrale Verteilung ohne Zirkulation (ab 1994)</option
					>
					<option value="dzsbis1994"
						>dezentrales System (bis 1994)</option
					>
					<option value="dzsab1995"
						>dezentrales System (ab 1995)</option
					>
				</select>
			</div>
			<!-- Speicherung Warmwasser -->
			<div>
				<HelpLabel title="Speicherung Warmwasser"
					>Bitte geben Sie hier wenn vorhanden die Art des
					Warmwasserspeichers ein.</HelpLabel
				>
				<select name="warmwasser_speicherung">
					<option>Bitte auswählen</option>
					<option value="zwwsath"
						>zentrale Warmwasserspeicher außerhalb thermischer Hülle</option
					>
					<option value="zwwsith"
						>zentrale Warmwasserspeicher innerhalb thermischer Hülle</option
					>
					<option value="gasbs">gasbefeuerter Speicher</option>
					<option value="elks">Elektro-Kleinspeicher</option>
				</select>
			</div>
			<!-- Erzeugung Warmwasser -->
			<div>
				<HelpLabel title="Erzeugung Warmwasser *"
					>Bitte geben Sie hier die Wärmeerzeugung für Warmwasser ein.</HelpLabel
				>
				<select name="warmwasser_erzeugung" required>
					<option>Bitte auswählen</option>
					{#each hotWaterProductionTypes as type, i}
						<option value={i}>{type}</option>
					{/each}
				</select>
			</div>
			<!-- Übergabe Heizung -->
			<div>
				<HelpLabel title="Übergabe Heizung *"
					>Bitte geben Sie hier ein ob es sich um Zentralheizung
					handelt oder über Beheizung durch dezentrale Einzelöfen.</HelpLabel
				>
				<select name="heizung_zentral">
					<option>Bitte auswählen</option>
					<option value="1">Zentralheizung</option>
					<option value="0">Einzelfeuerstätte</option>
				</select>
			</div>
			<!-- Verteilung Heizung -->
			<div>
				<HelpLabel title="Verteilung Heizung *"
					>Bitte geben Sie hier die Verteilung der Heizung ein.</HelpLabel
				>
				<select name="heizung_verteilung">
					<option>Bitte auswählen</option>
					<option value="zv7055bis1978"
						>zentrale Verteilung 70/55°C bis 1978</option
					>
					<option value="zv7055ngbis1978"
						>zentrale Verteilung 70/55°C, nachträglich gedämmt bis
						1978</option
					>
					<option value="zv7055von1979bis1994"
						>zentrale Verteilung 70/55°C von 1979 bis 1994</option
					>
					<option value="zv7055ab1995"
						>zentrale Verteilung 70/55°C ab 1995</option
					>
					<option value="zv5545bis1978"
						>zentrale Verteilung 55/45°C bis 1978</option
					>
					<option value="zv5545ngbis1978"
						>zentrale Verteilung 55/45°C, nachträglich gedämmt bis
						1978</option
					>
					<option value="zv5545von1979bis1994"
						>zentrale Verteilung 55/45°C von 1979 bis 1994</option
					>
					<option value="zv5545ab1995"
						>zentrale Verteilung 55/45°C ab 1995</option
					>
					<option value="wwvertbis1978"
						>Wohnungsweise Verteilung bis 1978</option
					>
					<option value="wwvertvon1979bis1994"
						>Wohnungsweise Verteilung von 1979 bis 1994</option
					>
					<option value="wwvertab1995"
						>Wohnungsweise Verteilung ab 1995</option
					>
					<option value="dezensys">dezentrales System</option>
				</select>
			</div>
			<!-- Speicherung Heizung -->
			<div>
				<HelpLabel title="Speicherung Heizung"
					>Bitte geben Sie hier - wenn vorhanden - den Speicher der
					Heizung ein.</HelpLabel
				>
				<select name="heizung_speicherung">
					<option>Bitte auswählen</option>
					<option value="elzs7055bis1994"
						>El.-Zentralspeicher 70/55°C bis 1994</option
					>
					<option value="elzs7055ab1995"
						>El.-Zentralspeicher 70/55°C ab 1995</option
					>
					<option value="puffs5545bis1994"
						>Pufferspeicher El.-Wärmepumpe 55/45°C bis 1994</option
					>
					<option value="puffs5545ab1995"
						>Pufferspeicher El.-Wärmepumpe 55/45°C ab 1995</option
					>
					<option value="puffshk7055bis1994"
						>Pufferspeicher für Holzkessel 70/55°C bis 1994</option
					>
					<option value="puffshk7055ab1995"
						>Pufferspeicher für Holzkessel 70/55°C ab 1995</option
					>
				</select>
			</div>
			<!-- Fensterart -->
			<div>
				<HelpLabel title="Wärmeerzeugung Heizung *"
					>Bitte geben Sie hier den Wärmerzeuger der Heizung ein.</HelpLabel
				>
				<select name="waerme_erzeugung_heizung" required>
					<option>Bitte auswählen</option>
					<option value="ktkesselbis1986h"
						>Konstanttemperatur-Kessel bis 1986</option
					>
					<option value="ktkesselvon1987bis1994h"
						>Konstanttemperatur-Kessel von 1987 bis 1994</option
					>
					<option value="ktkesselab1995h"
						>Konstanttemperatur-Kessel ab 1995</option
					>
					<option value="ntkesselbis1986h"
						>Niedertemperatur-Kessel bis 1986</option
					>
					<option value="ntkesselvon1987bis1994h"
						>Niedertemperatur-Kessel von 1987 bis 1994</option
					>
					<option value="ntkesselab1995h"
						>Niedertemperatur-Kessel ab 1995</option
					>
					<option value="bwkesselbis1986h"
						>Brennwert-Kessel bis 1986</option
					>
					<option value="bwkesselvon1987bis1994h"
						>Brennwert-Kessel von 1987 bis 1994</option
					>
					<option value="bwkesselab1995h"
						>Brennwert-Kessel ab 1995</option
					>
					<option value="bwkesselab1999h"
						>Brennwertkessel verbessert ab 1999</option
					>
					<option value="ewplhvon1979bis1994h"
						>Elektro-Wärmepumpe (Außenluft) von 1979 bis 1994</option
					>
					<option value="ewplhab1995h"
						>Elektro-Wärmepumpe (Außenluft) ab 1995</option
					>
					<option value="ewpemvon1979bis1994h"
						>Elektro-Wärmepumpe (Erdreich) von 1979 bis 1994</option
					>
					<option value="ewpemab1995h"
						>Elektro-Wärmepumpe (Erdreich) ab 1995</option
					>
					<option value="ewpgmvon1979bis1994h"
						>Elektro-Wärmepumpe (Grundwasser) von 1979 bis 1994</option
					>
					<option value="ewpgmab1995h"
						>Elektro-Wärmepumpe (Grundwasser) ab 1995</option
					>
					<option value="fwugsh">Fernwärme-Übergabestation</option>
					<option value="zesh">zentraler elektrischer Speicher</option
					>
					<option value="thermebis1994h"
						>Therme (Umlaufwasserheizer) bis 1994</option
					>
					<option value="thermeab1995h"
						>Therme (Umlaufwasserheizer) ab 1995</option
					>
					<option value="bthermeab1995h"
						>Brennwert-Therme ab 1995</option
					>
					<option value="oeleinzel"
						>ölbefeuerte Einzelöfen mit Verdampfungsbrenner</option
					>
					<option value="kheinzel">Kohle- oder Holzofen</option>
					<option value="greinzel">Gasraumheizer</option>
					<option value="elnseinzelbis1994"
						>Elektro-Nachtspeicherheizung bis 1994</option
					>
					<option value="elnseinzelab1995"
						>Elektro-Nachtspeicherheizung ab 1995</option
					>
					<option value="eldirekt">Elektro-Direktheizgerät</option>
				</select>
			</div>
		</div>

		<hr />
		<div class="box grid grid-cols-4 gap-4">
			<!-- Energieträger Zusatzheizung -->
			<div>
				<HelpLabel title="Energieträger Zusatzheizung"
					>Bitte geben Sie hier - wenn vorhanden - die Zusatzheizung
					ein (z.B. Kamin, Pelletheizung).</HelpLabel
				>
				<select name="energietraeger_2" required>
					<option>Bitte auswählen</option>
				</select>
			</div>
			<!-- Energieträger Zusatzheizung -->
			<div>
				<HelpLabel title="Anteil am Gesamtheizbedarf des Hauses"
					>Bitte geben Sie hier den prozentualen Anteil der
					Zusatzheizung ein.</HelpLabel
				>
				<select name="anteil_zusatzheizung">
					<option value="0" selected
						>Anteil am Gesamtheizbedarf des Hauses</option
					>
					{#each arrayRange(0.01, 0.7, 0.01) as step}
						<option value={step}>{step * 100}%</option>
					{/each}
				</select>
			</div>
			<div>
				Wenn Sie ein Solarsystem für Warmwasser einsetzen geben Sie
				bitte die Kollektorfläche an:
			</div>
			<div class="form-group col-md-1">
				<Label>Eingabe in m²</Label>
				<input name="kollektor_flaeche" type="text" />
			</div>
		</div>
		<hr />
		<Label
			>G - Bitte prüfen Sie hier die Angaben zum Sanierungszustand des
			Gebäudes</Label
		>
		<div class="GRB3">
			<HelpLabel title="Heizungsanlage (bitte zutreffendes ankreuzen) *">
				Wir benötigen diese Angaben um den allgemeinen
				Modernisierungsstand einschätzen zu können. Bitte setzen Sie den
				Haken wenn zutreffend. Das seit Mai 2021 gültige GEG erfordert
				eine genauere Prüfung anhand von Fotos. Bitte laden Sie ein oder
				mehrere Fotos der Heizungsanlage bzw. des Heizungsraums hoch.
			</HelpLabel>
			<hr />

			<div class="grid grid-cols-4">
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage1"
							value="ZH"
						/>Zentral/Etage</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage2"
							value="EO"
						/>Einzelöfen</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage3"
							value="DH"
						/>Durchlauferhitzer</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage4"
							value="SK"
						/>Standardkessel</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage5"
							value="SSWW"
						/>Solarsystem für Warmwasser</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage6"
							value="WP"
						/>Wärmepumpe</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage7"
							value="NK"
						/>Niedertemperaturkessel</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage8"
							value="BWK"
						/>Brennwertkessel</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage9"
							value="WRGD"
						/>Warmwasserrohre gedämmt</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage10"
							value="HRGD"
						/>Heizungsrohre gedämmt</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage11"
							value="ZK"
						/>Zirkulation</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGheizungsanlage12"
							value="RTR"
						/>Raumtemperaturregler</label
					>
				</div>
			</div>
		</div>

		<hr />

		<HeizungImage />

		<hr />

		<div class="GRB3">
			<HelpLabel
				title="Fenster/Dachfenster/Türen (bitte zutreffendes ankreuzen):*"
			>
				Wir benötigen diese Angaben um den allgemeinen
				Modernisierungsstand einschätzen zu können. Bitte setzen Sie den
				Haken wenn zutreffend.
			</HelpLabel>
			<hr />

			<div class="grid grid-cols-4">
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach1"
							value="EG"
						/>Einfachglas</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach2"
							value="DF"
						/>Doppelverglasung</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach3"
							value="IVG"
						/>Isolierverglasung</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach4"
							value="PHF"
						/>Dreifachverglasung</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach5"
							value="FD"
						/>Alle Fenster dicht</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach6"
							value="FTUD"
						/>Fenster teilweise undicht</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach7"
							value="TD"
						/>Alle Türen dicht</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach8"
							value="TUD"
						/>Türen teilweise undicht</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGfensterdach9"
							value="RKD"
						/>Rollladenkästen gedämmt, luftdicht</label
					>
				</div>
			</div>
		</div>

		<hr />

		<FensterImage />

		<hr />

		<div class="GRB3">
			<div class="form-group col-md-12">
				<HelpLabel
					title="Wärmedämmung (bitte zutreffendes ankreuzen) *"
				>
					Wir benötigen diese Angaben um den allgemeinen
					Modernisierungsstand einschätzen zu können. Bitte setzen Sie
					den Haken wenn zutreffend. Das seit Mai 2021 gültige GEG
					erfordert eine genauere Prüfung anhand von Fotos. Bitte
					laden Sie ein oder mehrere Fotos der Außenwand und des
					Dachbereiches hoch.
				</HelpLabel>
				<hr />
			</div>

			<div class="grid grid-cols-4">
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGwaermedaemmung1"
							value="AWD"
						/>Außenwand gedämmt</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGwaermedaemmung2"
							value="KWD"
						/>Kelleraußenwand gedämmt</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGwaermedaemmung3"
							value="KDD"
						/>Kellerdecke gedämmt</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGwaermedaemmung4"
							value="DGD"
						/>Dachgeschoss gedämmt</label
					>
				</div>
				<div>
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGwaermedaemmung5"
							value="OGDDW"
						/>Oberste Geschossdecke gedämmt</label
					>
				</div>
				<div class="form-group col-md-6 mw1">
					<label class="checkbox-inline"
						><input
							type="checkbox"
							name="IGwaermedaemmung6"
							value="OGDD"
						/>Oberste Geschossdecke min. 12cm gedämmt</label
					>
				</div>
			</div>
		</div>

		<hr />

		<DaemmungImage />

		<hr />
		<Label
			>G - Hier können Sie ein Gebäudebild hochladen und sich Ihren
			Energieausweis als PDF anschauen</Label
		>
		<AusweisPreviewContainer />
		<hr />
		<div class="flex flex-row justify-between">
			<button class="weiterbutton">Weiter</button>
		</div>
		<input type="hidden" name="ausweisart" value="BA" />
	</fieldset>
</form>

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

	:global(.box) {
		@apply border-2 border-[#ffcc03] p-4 rounded-lg;
		background: linear-gradient(
			135deg,
			rgba(252, 234, 187, 1) 0%,
			rgba(253, 235, 189, 1) 52%,
			rgba(251, 223, 147, 1) 100%
		);
	}

	:global(.headline) {
		@apply text-lg;
	}

	:global(.radio-inline) {
		@apply flex flex-row gap-2;
	}

	:global(.checkbox-inline) {
		@apply flex flex-row gap-2;
	}

	:global(input[type="checkbox"]) {
		width: auto;
	}
</style>

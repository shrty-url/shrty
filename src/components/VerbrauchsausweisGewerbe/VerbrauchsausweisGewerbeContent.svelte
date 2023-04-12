<script lang="ts">
	import PerformanceScore from "~/components/Ausweis/PerformanceScore.svelte";
	import Progressbar from "~/components/Ausweis/Progressbar.svelte";
	import Hilfe from "~/components/Ausweis/Hilfe.svelte";
	import HelpLabel from "~/components/HelpLabel.svelte";
	import Verbrauch from "~/components/Ausweis/Verbrauch.svelte";
	import Label from "~/components/Label.svelte";
	import Ausweisart from "~/components/Ausweis/Ausweisart.svelte";
	import HeizungImage from "~/components/Ausweis/HeizungImage.svelte";
	import FensterImage from "~/components/Ausweis/FensterImage.svelte";
	import DaemmungImage from "~/components/Ausweis/DaemmungImage.svelte";
	import AusweisPreviewContainer from "~/components/Ausweis/AusweisPreviewContainer.svelte";
	import ZipSearch from "../ZIPSearch.svelte";
	import { buildingTypes } from "./BuildingTypes";

	let additionalHeating: boolean = false;
	let heatedWaterIncluded: boolean = false;
	let heatedWaterPortion: number = 18;
	let hasCellar: boolean = false;
	let conversionFactor: number = 0;
	let calorificValueFactor: number = 0;

	let energyConsumption = [0, 0, 0];
	let additionalEnergyConsumption = [0, 0, 0];
	let climateFactors = [0, 0, 0];

	let area = 0;
	let energyPerformance = 0;
	let zip: string = "";
	let city: string = "";

	let baujahrGebaeude: number;
	let baujahrHeizungsAnlage: number;
	let apartmentCount: number;
	let certificateReason:
		| "Vermietung"
		| "Neubau"
		| "Verkauf"
		| "Modernisierung"
		| "Sonstiges";
	let sanitationStatus: boolean;

	let needsRequirementCertificate: boolean = false;

	$: needsRequirementCertificate =
		(baujahrGebaeude < 1978 &&
			apartmentCount <= 4 &&
			sanitationStatus == false &&
			(certificateReason == "Vermietung" ||
				certificateReason == "Sonstiges")) ||
		certificateReason == "Neubau" ||
		certificateReason == "Modernisierung" ||
		certificateReason == "Verkauf";
</script>

<div class="flex flex-row gap-8 items-center mb-8">
	<div class="flex flex-col w-full">
		<h1>Verbrauchsausweis Gewerbe erstellen - 65€</h1>
		<Progressbar progress={0} />
	</div>

	<PerformanceScore performance={energyPerformance} />
</div>

<form method="post" action="/verbrauchsausweis/erstellen">
	<fieldset
		class="bg-[rgba(252,234,187,0.2)] border-2 p-4 rounded-lg border-[#ffcc03]"
	>
		<div class="flex flex-row justify-between">
			<a class="button" href="/speichern">Später Weitermachen</a>
			<Hilfe />
		</div>

		<hr />

		<div>
			<Label>A - Prüfung der Ausweisart</Label>
		</div>

		<Ausweisart
			bind:baujahrGebaeude
			bind:apartmentCount
			bind:certificateReason
			bind:sanitationStatus
			bind:baujahrHeizungsAnlage
		/>
		<div
			class="flex flex-col p-4"
			class:hidden={!needsRequirementCertificate}
		>
			<div class="form-group col-md-9">
				<HelpLabel
					title="Sie benötigen einen Bedarfsausweis. Bitte führen Sie hier Ihre Eingabe für den Bedarfsausweis fort und klicken auf den Button:"
				>
					Der Bedarfsausweis ist die etwas umfangreichere Berechnung.
					Sie benötigen z.B. Länge, Breite und Geschoßhöhe des
					Gebäudes. Auch müssen genauere Angaben zur Anlagentechnik
					gemacht werden.
				</HelpLabel>
			</div>

			<div>
				<a class="button" href="/bedarfsausweis"
					>Bedarfsausweis erstellen</a
				>
			</div>
		</div>
		<hr />
		<div>
			<Label
				>B - Eingabe der Gebäudeadresse - Angaben zu Wohnfläche,
				Kellerund Dachgeschoss</Label
			>
		</div>

		<div class="GRB">
			<!-- Strasse -->
			<div class="form-group col-md-4">
				<HelpLabel title="Straße, Hausnummer *">
					Bitte geben Sie hier die Straße und Hausnummer des Gebäudes
					ein.
				</HelpLabel>
				<div>
					<input
						name="IGstrasse"
						class="input-md strasse"
						type="text"
						autocomplete="off"
						required
						data-msg-minlength="min. 5 Zeichen"
						data-msg-maxlength="max. 40 Zeichen"
					/>
				</div>
			</div>

			<!-- PLZ -->
			<div class="form-group col-md-4 PLZ">
				<ZipSearch bind:zip bind:city name="zip" />
			</div>

			<!-- IGort: readonly entfernt - Nelson -->
			<div class="form-group col-md-4">
				<HelpLabel title="Ort *">
					Ort des Gebäudes wird automatisch ermittelt.
				</HelpLabel>
				<div>
					<input
						name="IGort"
						class="input-md buchstaben"
						readonly={true}
						bind:value={city}
						type="text"
					/>
				</div>
			</div>
			<!-- Wohnfläche -->
			<div class="form-group col-md-4">
				<HelpLabel title="Wohnfläche m² *">
					Bitte geben Sie hier die beheizte Wohnfläche in m² ein.
					Dabei handelt es sich um die Wohnfläche abzüglich
					vorhandener Flächen die sich außerhalb des Gebäudes
					befinden. (Balkone, Terassen,etc.).
				</HelpLabel>
				<div>
					<input
						name="IGflaeche"
						maxlength="4"
						type="number"
						required
						autocomplete="off"
						data-rule-minlength="2"
						data-msg-minlength="min. 2 Zeichen"
						bind:value={area}
					/>
				</div>
			</div>

			<!-- Keller -->
			<div class="form-group col-md-4">
				<Label>Keller *</Label>
				<div>
					<select name="IGkeller" required bind:value={hasCellar}>
						<option>Bitte auswählen</option>
						<option value={false}>nicht vorhanden</option>
						<option value={false}>unbeheizt</option>
						<option value={true}>beheizt</option>
					</select>
				</div>
			</div>

			<!-- Dachgeschoss -->
			<div class="form-group col-md-4">
				<Label>Dachgeschoss *</Label>
				<div>
					<select name="IGdach" class="form-control" required>
						<option>Bitte auswählen</option>
						<option value="dnein">nicht vorhanden</option>
						<option value="dub">unbeheizt</option>
						<option value="dbh">beheizt</option>
					</select>
				</div>
			</div>
		</div>
		<!-- 2-container-close -->
		<hr />
		<div>
			<Label>C - Eingabe von 3 zusammenhängenden Verbrauchsjahren</Label>
		</div>

		<div class="GRB">
			<Verbrauch
				bind:additionalHeating
				bind:energyConsumption
				bind:additionalEnergyConsumption
				bind:climateFactors
				bind:conversionFactor
				bind:calorificValueFactor
			/>
		</div>
		<hr />
		<div>
			<div>
				<div class="GRB">
					<!-- Anteil WW enthalten -->
					<div class="flex flex-col">
						<div class="flex flex-row gap-6">
							<label class="radio-inline"
								><input
									type="checkbox"
									class="IGwwbool"
									name="IGwwbool"
									bind:checked={heatedWaterIncluded}
								/>Warmwasser im Verbrauch enthalten</label
							>
						</div>
					</div>

					<!-- Warmwasser Antel -->
					<div class="form-group col-md-2">
						<HelpLabel title="% Anteil Warmwasser">
							Wenn bekannt geben Sie den Anteil der
							Warmwasser-Versorgung hier ein. Standardmäßig wird
							ein Anteil von 18% angenommen.
						</HelpLabel>

						<input
							name="IGwarmwasser"
							maxlength="2"
							type="text"
							bind:value={heatedWaterPortion}
							disabled={!heatedWaterIncluded}
							autocomplete="off"
						/>
					</div>

					<div class="form-group col-md-2">
						<HelpLabel title="zusätzliche Heizquelle">
							Wenn bekannt geben Sie den Anteil der
							Warmwasser-Versorgung von der zusätzlichen
							Heizquelle hier ein. Standardmäßig wird ein Anteil
							von 18% angenommen.
						</HelpLabel>
						<input
							name="IGwarmwasser2"
							maxlength="3"
							type="text"
							autocomplete="off"
							disabled={!additionalHeating}
						/>
					</div>

					<!-- Alternative Energieversorgungssyteme -->
					<div class="form-group col-md-5">
						<HelpLabel
							title="Alternative Energieversorgungssysteme genutzt für "
						>
							Bitte setzen Sie den Haken falls nachhaltige
							CO2-Effiziente Heizungssysteme vorhanden sind. Das
							wäre beispielsweise bei Pelletofen, Wärmepumpe,
							BHKW, Solarsystem, etc. der Fall.
						</HelpLabel>
						<div class="flex flex-row gap-4">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGversorgungssysteme1"
									value="Heizung"
								/>Heizung</label
							>
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGversorgungssysteme2"
									value="Warmwasser"
								/>Warmwasser</label
							>
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGversorgungssysteme3"
									value="Lüftung"
								/>Lüftung</label
							>
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGversorgungssysteme4"
									value="Kühlung"
								/>Kühlung</label
							>
						</div>
					</div>
				</div>
				<!-- 2-container-close -->
				<hr />
				<div>
					<label
						class="headline"
						id="headlineg"
						style="font-size:18px;text-align:left;"
						>E - Eingabe von Gebäudetyp, Gebäudeteil, Lüftung,
						Kühlung und Leerstand</label
					>
				</div>
				<div>
					<div class="GRB">
						<div>
							<!-- Gebäudetyp -->
							<div>
								<label class="control-label" for="objekt_typ"
									>Gebäudetyp * <span
										class="help1"
										data-toggle="tooltip"
										data-html="true"
										title="
  <div class='TT'>
  Bitte wählen Sie hier den Gebäudetyp aus. 
  </div>"
									>
										<img
											src="FORM/img/question-mark.png"
											alt="question mark"
											class="mark20"
										/>
									</span>
								</label>
								<div>
									<select
										id="objekt_typ"
										name="objekt_typ"
										class="form-control vergleichswert CHECK"
										required
										autocomplete="off"
										data-msg="Pflichtfeld"
									>
										{#each buildingTypes as type}
											<option value={type}>{type}</option>
										{/each}
									</select>
								</div>
							</div>
							<!-- Gebäudeteil -->
							<div>
								<label class="control-label"
									>Gebäudeteil *
									<span
										class="help1"
										data-toggle="tooltip"
										data-html="true"
										title="
  <div class='TT'>
  Bitte geben Sie hier den Gebäudeteil ein. In den meisten Fällen handelt es sich um das Gesamtgebäude. Sollte es sich allerdings um ein Gebäude mit mehr als 10% Gewerbeanteil handeln, so sollten 2 Ausweise erstellt werden. In diesem Fall wählen Sie Gebäudeteil 'Wohnen' bzw. Gebäudeteil 'Gewerbe'.
  </div>"
									>
										<img
											src="/energieausweis-erstellen/FORM/img/question-mark.png"
											alt="question mark"
											class="mark20"
										/>
									</span>
								</label>
								<div>
									<select
										id="IGeil"
										name="objekt_gebaeudeteil"
										class="form-control"
										required
										autocomplete="off"
										data-msg="Pflichtfeld"
									>
										<option>Bitte auswählen</option>
										<option value="Gesamtgebäude">
											Gesamtgebäude</option
										>
										<option value="Wohnen"> Wohnen</option>
									</select>
								</div>
							</div>
							<!-- Lüftung -->
							<div class="form-group col-md-2">
								<label
									class="control-label"
									for="lueftungskonzept"
									>Lüftung durch *
									<span
										class="help1"
										data-toggle="tooltip"
										data-html="true"
										title="
  <div class='TT'>
  Bitte geben Sie hier ein ob über die Fenster natürlich belüftet wird oder über eine Lüftungsanlage.
  </div>"
									>
										<img
											src="/energieausweis-erstellen/FORM/img/question-mark.png"
											alt="question mark"
											class="mark20"
										/>
									</span>
								</label>
								<div>
									<select
										id="lueftungskonzept"
										name="lueftungskonzept"
										class="form-control"
										required
										autocomplete="off"
										data-msg="Pflichtfeld"
									>
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
											Lüftungsanlage ohne
											Wärmerückgewinnung</option
										>
										<option
											value="Lüftungsanlage mit Wärmerückgewinnung"
										>
											Lüftungsanlage mit
											Wärmerückgewinnung</option
										>
									</select>
								</div>
							</div>
							<!-- Lüftung -->
							<div class="form-group col-md-2">
								<label class="control-label" for="wird_gekuehlt"
									>Anlage Kühlung *
									<span
										class="help1"
										data-toggle="tooltip"
										data-html="true"
										title="
  <div class='TT'>
  Bitte geben Sie an ob das Gebäude im Sommer zusätzlich gekühlt wird.
  </div>"
									>
										<img
											src="/energieausweis-erstellen/FORM/img/question-mark.png"
											alt="question mark"
											class="mark20"
										/>
									</span>
								</label>
								<div>
									<select
										id="wird_gekuehlt"
										name="wird_gekuehlt"
										class="form-control"
										required
										autocomplete="off"
										data-msg="Pflichtfeld"
									>
										<option> Bitte auswählen</option>
										<option value="1"> vorhanden</option>
										<option value="0">
											nicht vorhanden</option
										>
									</select>
								</div>
							</div>
							<!-- Leerstand -->
							<div class="form-group col-md-2">
								<label class="control-label" for="leerstand"
									>Leerstand in %
									<span
										class="help1"
										data-toggle="tooltip"
										data-html="true"
										title="
  <div class='TT'>
  Bitte geben Sie hier den Leerstand in % des Gesamtzeitraumes (3 Jahre) ein. Zum Beispiel 4 Monate Leerstand in 36 Monaten wären dann ca. 11%.
  </div>"
									>
										<img
											src="/energieausweis-erstellen/FORM/img/question-mark.png"
											alt="question mark"
											class="mark20"
										/>
									</span>
								</label>
								<div>
									<input
										id="leerstand"
										name="leerstand"
										maxlength="2"
										class="form-control input-md zahlen"
										type="text"
										autocomplete="off"
										data-msg="Pflichtfeld"
									/>
								</div>
							</div>
						</div>
						<!-- 2-row-close -->
					</div>
				</div>
				<!-- 2-container-close -->
				<hr />
				<div class="form-group col-md-12">
					<Label
						>F - Bitte prüfen Sie hier die Angaben zum
						Sanierungszustand des Gebäudes</Label
					>
				</div>

				<div class="GRB3">
					<HelpLabel
						title="Heizungsanlage (bitte zutreffendes ankreuzen) *"
					>
						Wir benötigen diese Angaben um den allgemeinen
						Modernisierungsstand einschätzen zu können. Bitte setzen
						Sie den Haken wenn zutreffend. Das seit Mai 2021 gültige
						GEG erfordert eine genauere Prüfung anhand von Fotos.
						Bitte laden Sie ein oder mehrere Fotos der
						Heizungsanlage bzw. des Heizungsraums hoch.
					</HelpLabel>
					<hr />

					<div class="grid grid-cols-4">
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage1"
									value="ZH"
								/>Zentral/Etage</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage2"
									value="EO"
								/>Einzelöfen</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage3"
									value="DH"
								/>Durchlauferhitzer</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage4"
									value="SK"
								/>Standardkessel</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage5"
									value="SSWW"
								/>Solarsystem für Warmwasser</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage6"
									value="WP"
								/>Wärmepumpe</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage7"
									value="NK"
								/>Niedertemperaturkessel</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage8"
									value="BWK"
								/>Brennwertkessel</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage9"
									value="WRGD"
								/>Warmwasserrohre gedämmt</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage10"
									value="HRGD"
								/>Heizungsrohre gedämmt</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGheizungsanlage11"
									value="ZK"
								/>Zirkulation</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
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
						Modernisierungsstand einschätzen zu können. Bitte setzen
						Sie den Haken wenn zutreffend.
					</HelpLabel>
					<hr />

					<div class="grid grid-cols-4">
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach1"
									value="EG"
								/>Einfachglas</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach2"
									value="DF"
								/>Doppelverglasung</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach3"
									value="IVG"
								/>Isolierverglasung</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach4"
									value="PHF"
								/>Dreifachverglasung</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach5"
									value="FD"
								/>Alle Fenster dicht</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach6"
									value="FTUD"
								/>Fenster teilweise undicht</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach7"
									value="TD"
								/>Alle Türen dicht</label
							>
						</div>
						<div class="form-group col-md-3">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGfensterdach8"
									value="TUD"
								/>Türen teilweise undicht</label
							>
						</div>
						<div class="form-group col-md-3">
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
							Modernisierungsstand einschätzen zu können. Bitte
							setzen Sie den Haken wenn zutreffend. Das seit Mai
							2021 gültige GEG erfordert eine genauere Prüfung
							anhand von Fotos. Bitte laden Sie ein oder mehrere
							Fotos der Außenwand und des Dachbereiches hoch.
						</HelpLabel>
						<hr />
					</div>

					<div class="grid grid-cols-4">
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGwaermedaemmung1"
									value="AWD"
								/>Außenwand gedämmt</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGwaermedaemmung2"
									value="KWD"
								/>Kelleraußenwand gedämmt</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGwaermedaemmung3"
									value="KDD"
								/>Kellerdecke gedämmt</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
							<label class="checkbox-inline"
								><input
									type="checkbox"
									name="IGwaermedaemmung4"
									value="DGD"
								/>Dachgeschoss gedämmt</label
							>
						</div>
						<div class="form-group col-md-3 mw1">
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
					>G - Hier können Sie ein Gebäudebild hochladen und sich
					Ihren Energieausweis als PDF anschauen</Label
				>

				<AusweisPreviewContainer />

				<div class="flex flex-row justify-between">
					<Hilfe />
					<button formnovalidate>Weiter</button>
				</div>
			</div>
		</div>
	</fieldset>
</form>
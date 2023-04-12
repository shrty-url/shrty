<script lang="ts">
	import HelpLabel from "~/components/HelpLabel.svelte";

	export let baujahrGebaeude: number;
	export let apartmentCount: number;
	export let certificateReason: "Vermietung" | "Neubau" | "Verkauf" | "Modernisierung" | "Sonstiges";
	export let sanitationStatus: boolean;
	export let baujahrHeizungsAnlage: number;
</script>

<div class="GRB">
	<!-- Anlass für Energieausweis -->
	<div class="flex flex-col">
		<label class="control-label CHECK"
			>Anlass für Energieausweis *
		</label>
		<div
			class="grid grid-cols-2 gap-x-2 items-center lg:grid-cols-3"
		>
			<label class="radio-inline">
				<input
					type="radio"
					value="Neubau"
					name="IGanlass"
					bind:group={certificateReason}
				/>Neubau</label
			>
			<label class="radio-inline"
				><input
					type="radio"
					value="Vermietung"
					checked
					name="IGanlass"
					bind:group={certificateReason}
				/>Vermietung</label
			>
			<label class="radio-inline"
				><input
					type="radio"
					value="Verkauf"
					name="IGanlass"
					bind:group={certificateReason}
				/>Verkauf</label
			>
			<label class="radio-inline"
				><input
					type="radio"
					value="Modernisierung"
					name="IGanlass"
					bind:group={certificateReason}
				/>Modernisierung</label
			>
			<label class="radio-inline"
				><input
					type="radio"
					value="Sonstiges"
					name="IGanlass"
					bind:group={certificateReason}
				/>Sonstiges</label
			>
		</div>
	</div>

	<!-- Baujahr Heizung -->
	<div class="form-group col-md-2">
		<HelpLabel title="Baujahr Heizung *">
			Bitte geben Sie hier das Baujahr der
			Heizungsanlage ein. Sollten
			unterschiedliche Baujahre vorliegen,
			dann geben Sie einen Zeitbereich ein <br
			/>z.B. 1994-2001.
		</HelpLabel>
		<div>
			<input
				name="IGheizung"
				type="number"
				required
				bind:value={baujahrHeizungsAnlage}
			/>
		</div>
	</div>

	<!-- Baujahr -->
	<div class="form-group col-md-2">
		<HelpLabel title="Baujahr Gebäude *">
			Bitte geben Sie hier das Baujahr des
			Gebäudes ein. Sollte eine eine
			grundlegende Sanierung von Dach,
			Fenster und Heizung stattgefunden
			haben, dann berücksichtigen Sie das
			in dem Sie bei Sanierungsstatus
			-saniert- angeben.
		</HelpLabel>
		<div>
			<input
				name="IGbaujahr"
				type="number"
				required
				autocomplete="off"
				bind:value={baujahrGebaeude}
			/>
		</div>
	</div>

	<!-- Anzahl der Wohnungen -->
	<div class="form-group col-md-2">
		<HelpLabel title="Anzahl Wohnungen *">
			Bitte geben Sie hier die Anzahl der
			Wohnungen ein, die sich im Gebäude
			befinden.
		</HelpLabel>
		<div>
			<input
				id="IGanzahl"
				name="IGanzahl"
				class="form-control input-md zahlen"
				type="text"
				required
				autocomplete="off"
				data-msg="Pflichtfeld"
				bind:value={apartmentCount}
				maxlength="3"
			/>
		</div>
	</div>

	<!-- Dachgeschoss -->
	<div class="form-group col-md-2">
		<HelpLabel title="Sanierungsstatus *">
			Bitte geben Sie an ob das Gebäude
			energetisch saniert oder unsaniert
			ist. Wenn das Dach mindestens 12 cm
			gedämmt und Heizung sowie Fenster
			nicht älter als 30 Jahre sind,
			können Sie saniert auswählen.
		</HelpLabel>
		<div>
			<select
				id="IGsan"
				name="IGsan"
				class="form-control"
				required
				bind:value={sanitationStatus}
			>
				<option disabled>Bitte auswählen</option>
				<option value={true}
					>saniert</option
				>
				<option value={false}
					>unsaniert</option
				>
			</select>
		</div>
	</div>
</div>

<style>
	input[type="radio"] {
		width: 15px;
		height: 15px;
	}

	.radio-inline {
		@apply flex items-center;
	}
</style>
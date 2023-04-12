<div class="GRB">
	<table>
		<tr>
			<td>Kunde<input type="text" readonly /></td>
		</tr>
		<tr>
			<td>Telefon<input type="text" readonly /></td>
		</tr>
		<tr>
			<td>E-Mail<input type="text" readonly /></td>
		</tr>

		<tr>
			<td colspan="1">
				<hr />
			</td>
		</tr>

		<tr>
			<td> Rechnungsempfänger<input type="text" readonly /></td>
		</tr>

		<tr>
			<td> Zusatzzeile<input type="text" readonly /></td>
		</tr>
		<tr>
			<td> Strasse<input type="text" readonly /></td>
		</tr>
		<tr>
			<td> Telefon<input type="text" readonly /></td>
		</tr>
		<tr>
			<td>
				E-Mail<input type="text" readonly />
			</td>
		</tr>
		<tr>
			<td> PLZ und Ort<input type="text" readonly /></td>
		</tr>
		<tr>
			<td>
				<hr />
			</td>
		</tr>
		<tr>
			<td>Versandempfänger<input type="text" readonly /> </td>
		</tr>
		<tr>
			<td>Zusatzzeile<input type="text" readonly /></td>
		</tr>
		<tr>
			<td>Strasse<input type="text" readonly /></td>
		</tr>
		<tr>
			<td>PLZ und Ort<input type="text" readonly /></td>
		</tr>
	</table>
</div>

<style>
	table tr {
		@apply border-none;
	}

	table, td, tr {
		@apply border-0 p-2;
	}

	tr:not(:last-child) {
		@apply border-b border-b-[rgba(0,0,0,0.1)];
	}
</style>
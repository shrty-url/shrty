<script lang="ts">
	import ProgressBar from "~/components/Ausweis/Progressbar.svelte";
	import PerformanceScore from "~/components/Ausweis/PerformanceScore.svelte";
	import PriceContainer from "~/components/Kaufabschluss/PriceContainer.svelte";
	import KundendatenContainer from "~/components/Kaufabschluss/KundendatenContainer.svelte";

	const prices = [45, 60, 160];
</script>

<div class="gap-8 items-center mb-8 grid grid-cols-2">
	<div>
		<h1>Verbrauchsausweis erstellen - 45€</h1>
		<ProgressBar progress={100} />
	</div>
	<div />
</div>

<form action="FORM/transfer/VA_3to4.php" method="POST" novalidate>
	<fieldset>
		<div class="grid grid-cols-2 gap-6">
			<PriceContainer {prices} />

			<KundendatenContainer />

			<div class="GRB">
				<h4>Bitte wählen sie ihre Bezahlmethode aus.</h4>
				<div class="flex-row justify-between">
					<div>
						<div class="payment-option-card">
							<img src="/images/paypal.png" alt="PayPal" />
							<div
								class="payment-option-label"
								aria-label="Zahlen mit PayPal"
							>
								Zahlen mit PayPal
							</div>
						</div>
						<div class="payment-option-card">
							<img src="/images/giropay.png" alt="Giropay" />
							<div
								class="payment-option-label"
								aria-label="Zahlen mit Giropay"
							>
								Zahlen mit Giropay
							</div>
						</div>
						<div class="payment-option-card">
							<img src="/images/sofort.png" alt="Sofort" />
							<div
								class="payment-option-label"
								aria-label="Zahlen mit Sofort"
							>
								Zahlen mit Sofort
							</div>
						</div>
					</div>
					<div>
						<div class="payment-option-card">
							<img
								src="/images/mastercard.png"
								alt="Mastercard"
							/>
							<div
								class="payment-option-label"
								aria-label="Zahlen mit Kreditkarte"
							>
								Zahlen mit Kreditkarte
							</div>
						</div>
						<div class="payment-option-card">
							<img src="/images/rechnung.png" alt="Rechnung" />
							<div
								class="payment-option-label"
								aria-label="Zahlen mit Rechnung"
							>
								Zahlen mit Rechnung
							</div>
						</div>
						<div class="payment-option-card">
							<img src="/images/sepa.png" alt="SEPA" />
							<div
								class="payment-option-label"
								aria-label="Zahlen mit SEPA über PayPal"
							>
								SEPA über PayPal
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
	<div class="form-group col-md-12">
		<div class="form-group col-md-6" style="text-align:left; ">
			<a class="button" href="/verbrauchsausweis">Daten ändern</a>
		</div>
	</div>
</form>

<style>
	:global(.GRB) {
		@apply flex flex-col border-2 border-[#ffcc03] p-4 rounded-lg;
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

	:global(table, td) {
		@apply border-none;
	}
</style>

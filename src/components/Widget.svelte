<script lang="ts">
	let gebaeudetyp: string = "";
	let anlass: string = "";
	let result: string = "";
	let hasAushangpflicht: boolean = true;

	$: result = gebaeudetyp + " " + anlass;

	$: if (gebaeudetyp == "Einfamilienhaus" || gebaeudetyp == "Zweifamilienhaus" || gebaeudetyp == "Mehrfamilienhaus") {
		hasAushangpflicht = false
	} else if (gebaeudetyp == "Gewerbegebäude" || gebaeudetyp == "Mischgebäude")  {
		hasAushangpflicht = true
	}

	var VA =
		"https://online-energieausweis.org/energieausweis-erstellen/verbrauchsausweis-erstellen"
	var VANW =
		"https://online-energieausweis.org/energieausweis-erstellen/verbrauchsausweis-gewerbe-erstellen"
	var BA =
		"https://online-energieausweis.org/energieausweis-erstellen/bedarfsausweis-erstellen"
	var BANW =
		"https://online-energieausweis.org/energieausweis-erstellen/bedarfsausweis-gewerbe-anfragen"

	let oea_result = "";
	let oea_cta = "";

	$: switch (result) {
			case "Einfamilienhaus Vermietung/Verkauf":
				oea_result =
					'Wenn Sie Ihr Einfamilienhaus vermieten oder verkaufen wollen, haben Sie die Wahl zwischen einem <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Wohngebäude</span> und einem <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In den meisten Fällen können Sie bei Vermietung oder Verkauf Ihrer Immobilie den einfacheren Energieausweis (Verbrauchsausweis)  erstellen lassen. Dieser Ausweis ist verbrauchsorientiert und benötigt als Berechnungsgrundlage 3 zusammenhängende Jahre der Heizenergieabrechnugen des Gebäudes. Wenn Ihnen also diese 3 Abrechnugsjahre vorliegen, und es gab dazwischen keine grundlegenden Sanierungsmaßnahmen bzw. Heizungsaustausch, dann steht der Nutzung eines Verbrauchsausweises nichts im Weg.<br /><br />Laut EnEV gibt es nur eine rechtliche Ausnahme, bei der es nicht zulässig ist einen Verbrauchsausweis bei Vermietung oder Verkauf zu verwenden. Dies ist dann der Fall, wenn Ihr Gebäude gänzlich unsaniert ist, vor 1978 gebaut wurde und weniger als 5 Wohneinheiten besitzt. In diesem Fall oder bei unvollständigen Verbrauchsabrechnungen (z.B. bei Leerstand), sollte ein Bedarfsausweis für Wohngebäude erstellt werden.<br/><hr/><a class="toUS" href="' +
					VA +
					'" target=_"blank">&bull; jetzt Verbrauchsausweis Wohngebäude online erstellen</a> (Empfehlung)<br/><a class="toUS" href="' +
					BA +
					'" target=_"blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';
				oea_cta =
					'<a href="' +
					VA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Einfamilienhaus Modernisierung":
				oea_result =
					'Wenn Sie bei Ihrem Einfamilienhaus eine Modernisierung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Einfamilienhaus Neubau":
				oea_result =
					'Wenn Sie ein Einfamilienhaus bauen wollen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br/><br/>Bei genehmigungspflichtigen Neubaumaßnahmen ist es vorgeschrieben vor Baubeginn einen EnEV-Nachweis (früher Wärmeschutznachweis) zu erstellen. Aus der EnEV-Berechnung kann später, nach Fertigstellung, der Bedarfsausweis erstellt werden. In <a href="https://online-energieausweis.org/enev/" title="§3 EnEV" target="blank">§3 EnEV</a> ist geregelt welche Anforderungen für Wohngebäude eingehalten werden müssen.<br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Einfamilienhaus Erweiterung":
				oea_result =
					'Wenn Sie bei Ihrem Einfamilienhaus eine Erweiterung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Zweifamilienhaus Vermietung/Verkauf":
				oea_result =
					'Wenn Sie Ihr Zweifamilienhaus vermieten oder verkaufen wollen, haben Sie die Wahl zwischen einem <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Wohngebäude</span> und einem <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In den meisten Fällen können Sie bei Vermietung oder Verkauf Ihrer Immobilie den einfacheren Energieausweis (Verbrauchsausweis)  erstellen lassen. Dieser Ausweis ist verbrauchsorientiert und benötigt als Berechnungsgrundlage 3 zusammenhängende Jahre der Heizenergieabrechnugen des Gebäudes. Wenn Ihnen also diese 3 Abrechnugsjahre vorliegen, und es gab dazwischen keine grundlegenden Sanierungsmaßnahmen bzw. Heizungsaustausch, dann steht der Nutzung eines Verbrauchsausweises nichts im Weg.<br /><br />Laut EnEV gibt es nur eine rechtliche Ausnahme, bei der es nicht zulässig ist einen Verbrauchsausweis bei Vermietung oder Verkauf zu verwenden. Dies ist dann der Fall, wenn Ihr Gebäude gänzlich unsaniert ist, vor 1978 gebaut wurde und weniger als 5 Wohneinheiten besitzt. In diesem Fall oder bei unvollständigen Verbrauchsabrechnungen (z.B. bei Leerstand), sollte ein Bedarfsausweis für Wohngebäude erstellt werden.<br/><hr/><a class="toUS" href="' +
					VA +
					'" target="blank">&bull; jetzt Verbrauchsausweis Wohngebäude online erstellen</a> (Empfehlung)<br/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					VA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Zweifamilienhaus Modernisierung":
				oea_result =
					'Wenn Sie bei Ihrem Zweifamilienhaus eine Modernisierung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Zweifamilienhaus Neubau":
				oea_result =
					'Wenn Sie ein Zweifamilienhaus bauen wollen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br/><br/>Bei genehmigungspflichtigen Neubaumaßnahmen ist es vorgeschrieben vor Baubeginn einen EnEV-Nachweis (früher Wärmeschutznachweis) zu erstellen. Aus der EnEV-Berechnung kann später, nach Fertigstellung, der Bedarfsausweis erstellt werden. In <a href="https://online-energieausweis.org/enev/" title="§3 EnEV" target="blank">§3 EnEV</a> ist geregelt welche Anforderungen für Wohngebäude eingehalten werden müssen.<br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Zweifamilienhaus Erweiterung":
				oea_result =
					'Wenn Sie bei Ihrem Zweifamilienhaus eine Erweiterung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mehrfamilienhaus Vermietung/Verkauf":
				oea_result =
					'Wenn Sie Ihr Mehrfamilienhaus vermieten oder verkaufen wollen, haben Sie die Wahl zwischen einem <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Wohngebäude</span> und einem <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In den meisten Fällen können Sie bei Vermietung oder Verkauf Ihrer Immobilie den einfacheren Energieausweis (Verbrauchsausweis)  erstellen lassen. Dieser Ausweis ist verbrauchsorientiert und benötigt als Berechnungsgrundlage 3 zusammenhängende Jahre der Heizenergieabrechnugen des Gebäudes. Wenn Ihnen also diese 3 Abrechnugsjahre vorliegen, und es gab dazwischen keine grundlegenden Sanierungsmaßnahmen bzw. Heizungsaustausch, dann steht der Nutzung eines Verbrauchsausweises nichts im Weg.<br /><br />Laut EnEV gibt es nur eine rechtliche Ausnahme, bei der es nicht zulässig ist einen Verbrauchsausweis bei Vermietung oder Verkauf zu verwenden. Dies ist dann der Fall, wenn Ihr Gebäude gänzlich unsaniert ist, vor 1978 gebaut wurde und weniger als 5 Wohneinheiten besitzt. In diesem Fall oder bei unvollständigen Verbrauchsabrechnungen (z.B. bei Leerstand), sollte ein Bedarfsausweis für Wohngebäude erstellt werden.<br/><hr/><a class="toUS" href="' +
					VA +
					'" target="blank">&bull; jetzt Verbrauchsausweis Wohngebäude online erstellen</a> (Empfehlung)<br/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					VA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mehrfamilienhaus Modernisierung":
				oea_result =
					'Wenn Sie bei Ihrem Mehrfamilienhaus eine Modernisierung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mehrfamilienhaus Neubau":
				oea_result =
					'Wenn Sie ein Mehrfamilienhaus bauen wollen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br/><br/>Bei genehmigungspflichtigen Neubaumaßnahmen ist es vorgeschrieben vor Baubeginn einen EnEV-Nachweis (früher Wärmeschutznachweis) zu erstellen. Aus der EnEV-Berechnung kann später, nach Fertigstellung, der Bedarfsausweis erstellt werden. In <a href="https://online-energieausweis.org/enev/" title="§3 EnEV" target="blank">§3 EnEV</a> ist geregelt welche Anforderungen für Wohngebäude eingehalten werden müssen.<br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mehrfamilienhaus Erweiterung":
				oea_result =
					'Wenn Sie bei Ihrem Mehrfamilienhaus eine Erweiterung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Gewerbegebäude Vermietung/Verkauf":
				oea_result =
					'Wenn Sie Ihr Gewerbegebäude vermieten oder verkaufen wollen, haben Sie die Wahl zwischen einem <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Gewerbegebäude</span> und einem <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br /><br />Bei Vermietung oder Verkauf Ihrer Gewerbeimmobilie können Sie den einfacheren Energieausweis (Verbrauchsausweis) erstellen lassen. Der gewerbliche Verbrauchsausweis benötigt als Berechnungsgrundlage den Stromverbrauch und den Heizenergieverbrauch des Gebäudes. Es werden 3 zusammenhängende Jahre der Heizenergieabrechnugen und der Stromabrechnung des Gebäudes benötigt. Wenn Ihnen also diese 3 Abrechnugsjahre vorliegen und die Verbräuche lassen sich eindeutig zuordnen, dann steht der Dateneingabe nichts im Wege.<br/><br/>Es dürfen keine grundlegenden Sanierungsmaßnahmen bzw. Heizungsaustausch während dieses Zeitraums durchgeführt worden sein. Wenn diese Voraussetzungen nicht vorliegen, oder keine vollständigen Verbrauchsabrechnungen vorliegen (z.B. bei Leerstand), dann sollte der Bedarfsausweis Nichtwohngebäude (Gewerbe) erstellt werden.<br/><hr/><a class="toUS" href="' +
					VANW +
					'" target="blank">&bull; jetzt Verbrauchsausweis Gewerbe online erstellen</a> (Empfehlung)<br/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					VANW +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Gewerbegebäude Modernisierung":
				oea_result =
					'Wenn Sie bei Ihrem Gewerbegebäude eine Modernisierung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					BANW +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Gewerbegebäude Neubau":
				oea_result =
					'Wenn Sie ein Gewerbegebäude bauen wollen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbe</span>.<br/><br/>Bei genehmigungspflichtigen Neubaumaßnahmen ist es vorgeschrieben vor Baubeginn einen EnEV-Nachweis (früher Wärmeschutznachweis) zu erstellen. Aus der EnEV-Berechnung kann später, nach Fertigstellung, der Bedarfsausweis erstellt werden. In <a href="https://online-energieausweis.org/enev/" title="§4 EnEV" target="blank">§4 EnEV</a> ist geregelt welche Anforderungen für Gewerbegebäude eingehalten werden müssen.<br/><hr/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					BANW +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Gewerbegebäude Erweiterung":
				oea_result =
					'Wenn Sie bei Ihrem Gewerbegebäude eine Erweiterung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					BANW +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Gewerbegebäude Aushangpflicht":
				oea_result =
					'Bei starkem Publikumsverkehr in Ihrem Gewerbegebäude benötigen Sie einen <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Gewerbegebäude</span> als öffentlichen Aushang.<br/><hr/><a class="toUS" href="' +
					VANW +
					'" target="blank">&bull; jetzt Verbrauchsausweis Gewerbe online erstellen</a> (Empfehlung)<br/>';

				oea_cta =
					'<a href="' +
					VANW +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mischgebäude Vermietung/Verkauf":
				oea_result =
					'Wenn Sie Ihr Mischgebäude vermieten oder verkaufen wollen, haben Sie für den nichtgewerblichen Teil die Wahl zwischen einem <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Wohngebäude</span> und einem <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span> und für den gewerblichen Teil die Wahl zwischen einem <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Gewerbegebäude</span> und einem <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br /><br /><span class="red">Für den nichtgewerblichen Teil gilt:</span><br />In den meisten Fällen können Sie bei Vermietung oder Verkauf Ihrer Immobilie den einfacheren Energieausweis (Verbrauchsausweis)  erstellen lassen. Dieser Ausweis ist verbrauchsorientiert und benötigt als Berechnungsgrundlage 3 zusammenhängende Jahre der Heizenergieabrechnugen des Gebäudes. Wenn Ihnen also diese 3 Abrechnugsjahre vorliegen, und es gab dazwischen keine grundlegenden Sanierungsmaßnahmen bzw. Heizungsaustausch, dann steht der Nutzung eines Verbrauchsausweises nichts im Weg.<br /><br />Laut EnEV gibt es nur eine rechtliche Ausnahme, bei der es nicht zulässig ist einen Verbrauchsausweis bei Vermietung oder Verkauf zu verwenden. Dies ist dann der Fall, wenn Ihr Gebäude gänzlich unsaniert ist, vor 1978 gebaut wurde und weniger als 5 Wohneinheiten besitzt. In diesem Fall oder bei unvollständigen Verbrauchsabrechnungen (z.B. bei Leerstand), sollte ein Bedarfsausweis für Wohngebäude erstellt werden.<br /><hr /><span class="red">Für den gewerblichen Teil gilt:</span><br/>Bei Vermietung oder Verkauf Ihrer Gewerbeimmobilie können Sie den einfacheren Energieausweis (Verbrauchsausweis) erstellen lassen. Der gewerbliche Verbrauchsausweis benötigt als Berechnungsgrundlage den Stromverbrauch und den Heizenergieverbrauch des Gebäudes. Es werden 3 zusammenhängende Jahre der Heizenergieabrechnugen und der Stromabrechnung des Gebäudes benötigt. Wenn Ihnen also diese 3 Abrechnugsjahre vorliegen und die Verbräuche lassen sich eindeutig zuordnen, dann steht der Dateneingabe nichts im Wege.<br/><br/>Es dürfen keine grundlegenden Sanierungsmaßnahmen bzw. Heizungsaustausch während dieses Zeitraums durchgeführt worden sein. Wenn diese Voraussetzungen nicht vorliegen, oder keine vollständigen Verbrauchsabrechnungen vorliegen (z.B. bei Leerstand), dann sollte der Bedarfsausweis Nichtwohngebäude (Gewerbe) erstellt werden.<br/><hr/><a class="toUS" href="' +
					VA +
					'" target="blank">&bull; jetzt Verbrauchsausweis Wohngebäude online erstellen</a> (Empfehlung)<br/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a><br /><a class="toUS" href="' +
					VANW +
					'" target="blank">&bull; jetzt Verbrauchsausweis Gewerbe online erstellen</a> (Empfehlung)<br/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					VA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mischgebäude Modernisierung":
				oea_result =
					'Wenn Sie bei Ihrem Mischgebäude eine Modernisierung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span> und einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden. <br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a><br/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mischgebäude Neubau":
				oea_result =
					'Wenn Sie ein Mischgebäude bauen wollen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span> und einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br/><br/>Bei genehmigungspflichtigen Neubaumaßnahmen ist es vorgeschrieben vor Baubeginn einen EnEV-Nachweis (früher Wärmeschutznachweis) zu erstellen. Aus der EnEV-Berechnung kann später, nach Fertigstellung, der Bedarfsausweis erstellt werden. In <a href="https://online-energieausweis.org/enev/" title="§3 EnEV" target="blank">§3 EnEV</a> ist geregelt welche Anforderungen für Wohngebäude, und in <a href="https://online-energieausweis.org/enev/" title="§4 EnEV" target="blank">§4 EnEV</a> welche Anforderungen für Gewerbegebäude eingehalten werden müssen.<br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a><br/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mischgebäude Erweiterung":
				oea_result =
					'Wenn Sie bei Ihrem Mischgebäude eine Erweiterung planen, benötigen Sie einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Wohngebäude</span> und einen <span class="hilite">Bedarfsausweis</span> für <span class="hilite">Gewerbegebäude</span>.<br /><br />In der aktuellen EnEV ist geregelt, wie bei Änderungen im Baubestand zu verfahren ist. In <a href="https://online-energieausweis.org/enev/" title="§9 EnEV" target="blank">§9 EnEV</a> der EnEV ist festgelegt, welche Mindestanforderungen bei Änderungen, Erweiterungen und Ausbau eingehalten werden müssen. Außerdem wird beschrieben unter welchen Voraussetzungen ein Bedarfsausweis erstellt werden muß. Dies ist z.B. nicht der Fall wenn nur einzelne Bauteile wie Dach, Außenwand und Fenster erneuert werden oder die Erweiterung < 50 m² ist. Dann muß nur ein Bauteilnachweis geführt werden. Es kann auch vorkommen, daß bei Einzelmaßnahmen eine komplette Bedarfsberechnung durchgeführt werden muss wenn der Bauteilnachweis die EnEV-Anforderungen nicht erfüllt. Bei Austausch der Heizungsanlage muß in jedem Fall ein Bedarfsausweis erstellt werden.<br/><hr/><a class="toUS" href="' +
					BA +
					'" target="blank">&bull; jetzt Bedarfsausweis Wohngebäude online erstellen</a><br/><a class="toUS" href="' +
					BANW +
					'" target="blank">&bull; jetzt Bedarfsausweis Gewerbe online anfragen</a>';

				oea_cta =
					'<a href="' +
					BA +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;

			case "Mischgebäude Aushangpflicht":
				oea_result =
					'Bei starkem Publikumsverkehr in Ihrem Mischgebäude benötigen Sie einen <span class="hilite">Verbrauchsausweis</span> für <span class="hilite">Gewerbegebäude</span> als öffentlichen Aushang.<br/><hr/><a class="toUS" href="' +
					VANW +
					'" target="blank">&bull; jetzt Verbrauchsausweis Gewerbe online erstellen</a> (Empfehlung)<br/>';

				oea_cta =
					'<a href="' +
					VANW +
					'" target="blank">Energieausweis<span>jetzt online erstellen</span></a>';

				break;
		}
</script>

<div class="border p-4 rounded-lg bg-gray-50 my-4">
	<div class="w-full grid grid-cols-2 gap-4">
		<div>
			<div>Gebäudetyp</div>
			<select bind:value={gebaeudetyp}>
				<option value="" selected disabled>bitte auswählen</option>
				<option value="Einfamilienhaus">Einfamilienhaus</option>
				<option value="Zweifamilienhaus">Zweifamilienhaus</option>
				<option value="Mehrfamilienhaus">Mehrfamilienhaus</option>
				<option value="Gewerbegebäude">Gewerbegebäude</option>
				<option value="Mischgebäude">Mischgebäude</option>
			</select>
		</div>

		<div>
			<div>Anlass</div>
			<select bind:value={anlass}>
				<option value="" selected disabled>bitte auswählen</option>
				<option value="Vermietung/Verkauf">Vermietung/Verkauf</option>
				<option value="Modernisierung">Modernisierung</option>
				<option value="Neubau">Neubau</option>
				<option value="Erweiterung">Erweiterung</option>
				{#if hasAushangpflicht}
				<option value="Aushangpflicht" id="aP">Aushangpflicht</option>
				{/if}
			</select>
		</div>
	</div>

	<br />

	<div>{@html oea_result}</div>

	<div>
		<hr />
		<div>
			<div>
				<a
					href="https://online-energieausweis.org?aa=LOGO&recode=online-energieausweis.org"
					title="IB Cornelsen"
				>
					<img src="/images/header/logo-big.png" alt="" width="100px" /></a
				>
			</div>
		</div>
	</div>
</div>

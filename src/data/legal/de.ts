import type { LegalContent } from "@/types/legal";
import { site } from "@/data/site";

/**
 * German legal pages.
 *
 * Every value in square brackets is a placeholder that must be replaced with
 * the real company data before going live. The structure follows the German
 * requirements (§ 5 DDG, § 18 Abs. 2 MStV, DSGVO); the wording still needs a
 * legal review — this is a scaffold, not legal advice.
 */
export const legalDe: LegalContent = {
  strings: {
    back: "Zurück zur Startseite",
    updatedLabel: "Stand:",
    draftNotice:
      "Entwurf – die mit eckigen Klammern markierten Angaben müssen vor der Veröffentlichung " +
      "ergänzt und der Text anwaltlich geprüft werden.",
  },

  /* ------------------------------------------------------------- Impressum */

  imprint: {
    path: "/impressum",
    altPath: "/en/imprint",
    title: "Impressum",
    description: "Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 2 MStV.",
    updated: "2026-08-14",
    blocks: [
      {
        heading: "Angaben gemäß § 5 DDG",
        body: [
          "[Vollständiger Firmenname, z. B. Bildungs Guard GmbH]",
          "[Straße und Hausnummer]",
          "[PLZ und Ort]",
          "Deutschland",
        ],
      },
      {
        heading: "Vertreten durch",
        body: ["[Name der vertretungsberechtigten Person / Geschäftsführung]"],
      },
      {
        heading: "Kontakt",
        body: [`Telefon: ${site.phone}`, `E-Mail: ${site.email}`],
      },
      {
        heading: "Registereintrag",
        body: [
          "Eintragung im Handelsregister",
          "Registergericht: [Amtsgericht]",
          "Registernummer: [HRB ...]",
        ],
      },
      {
        heading: "Umsatzsteuer-Identifikationsnummer",
        body: [
          "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [DE ...]",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        body: [
          "[Name]",
          "[Anschrift, falls abweichend von der oben genannten]",
        ],
      },
      {
        heading: "Verbraucherstreitbeilegung",
        body: [
          "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer " +
            "Verbraucherschlichtungsstelle teilzunehmen.",
          "Hinweis: Die frühere EU-Plattform zur Online-Streitbeilegung (OS-Plattform) wurde " +
            "eingestellt. Ein Link darauf gehört nicht mehr in ein aktuelles Impressum.",
        ],
      },
      {
        heading: "Haftung für Inhalte",
        body: [
          "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen " +
            "Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder " +
            "gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die " +
            "auf eine rechtswidrige Tätigkeit hinweisen.",
          "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den " +
            "allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist " +
            "jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. " +
            "Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte " +
            "umgehend.",
        ],
      },
      {
        heading: "Haftung für Links",
        body: [
          "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen " +
            "Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige " +
            "Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen " +
            "entfernen wir derartige Links umgehend.",
        ],
      },
      {
        heading: "Urheberrecht",
        body: [
          "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten " +
            "unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche " +
            "gekennzeichnet. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der " +
            "Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen " +
            "Zustimmung des jeweiligen Autors bzw. Erstellers.",
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- Datenschutz */

  privacy: {
    path: "/datenschutz",
    altPath: "/en/privacy",
    title: "Datenschutzerklärung",
    description:
      "Informationen zur Verarbeitung personenbezogener Daten auf dieser Website nach Art. 13 DSGVO.",
    intro:
      "Diese Website verarbeitet so wenige personenbezogene Daten wie möglich. Es werden keine " +
      "Cookies gesetzt, kein Tracking eingesetzt und keine Inhalte von Drittanbietern nachgeladen.",
    updated: "2026-08-14",
    blocks: [
      {
        id: "verantwortlicher",
        heading: "1. Verantwortlicher",
        body: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:",
          "[Vollständiger Firmenname]",
          "[Anschrift]",
          `E-Mail: ${site.email}`,
          "[Sofern benannt: Kontaktdaten der/des Datenschutzbeauftragten]",
        ],
      },
      {
        id: "hosting",
        heading: "2. Hosting und Server-Logfiles",
        body: [
          "Diese Website wird bei einem Anbieter mit Serverstandort in Deutschland betrieben: " +
            "[Name und Anschrift des Hosters].",
          "Beim Aufruf der Website werden automatisch Informationen an den Server übermittelt und " +
            "vorübergehend in einer Logdatei gespeichert. Erfasst werden:",
        ],
        bullets: [
          "IP-Adresse des anfragenden Geräts",
          "Datum und Uhrzeit des Zugriffs",
          "Name und URL der abgerufenen Datei",
          "übertragene Datenmenge und Meldung über den erfolgreichen Abruf",
          "verwendeter Browser, Betriebssystem und die zuvor besuchte Seite (Referrer)",
        ],
      },
      {
        heading: "3. Rechtsgrundlage und Zweck der Logfile-Verarbeitung",
        body: [
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im " +
            "sicheren und stabilen Betrieb der Website sowie in der Abwehr von Angriffen.",
          "Die Logdaten werden nach [Anzahl] Tagen gelöscht. Eine Zusammenführung dieser Daten mit " +
            "anderen Datenquellen findet nicht statt.",
          "Mit dem Hosting-Anbieter besteht ein Vertrag über die Auftragsverarbeitung nach " +
            "Art. 28 DSGVO.",
        ],
      },
      {
        id: "formular",
        heading: "4. Webdemo-Anfrage und Kontaktaufnahme",
        body: [
          "Wenn Sie über das Formular auf dieser Website eine Webdemo anfragen, verarbeiten wir " +
            "die von Ihnen angegebenen Daten – Name, E-Mail-Adresse sowie Wunschtermin und " +
            "Uhrzeit – ausschließlich zur Bearbeitung Ihrer Anfrage.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf den Abschluss " +
            "eines Vertrages gerichtet ist, im Übrigen Art. 6 Abs. 1 lit. f DSGVO aufgrund " +
            "unseres berechtigten Interesses an der Beantwortung von Anfragen.",
          "Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine " +
            "gesetzlichen Aufbewahrungsfristen entgegenstehen.",
          "Gleiches gilt für Anfragen, die uns per E-Mail oder Telefon erreichen.",
        ],
      },
      {
        id: "cookies",
        heading: "5. Cookies, Tracking und Analyse",
        body: [
          "Diese Website setzt keine Cookies und verwendet keine Analyse-, Tracking- oder " +
            "Marketing-Dienste. Es findet insbesondere keine Reichweitenmessung und kein " +
            "Profiling statt.",
          "Aus diesem Grund gibt es auf dieser Website auch kein Cookie-Banner und keine " +
            "Cookie-Einstellungen – es ist keine Einwilligung erforderlich, weil keine nicht " +
            "notwendigen Technologien eingesetzt werden.",
        ],
      },
      {
        heading: "6. Schriftarten und externe Inhalte",
        body: [
          "Alle verwendeten Schriftarten werden lokal von unserem Server ausgeliefert. Es besteht " +
            "keine Verbindung zu Google Fonts oder einem anderen Content Delivery Network. " +
            "Ebenso werden keine Videos, Karten, Social-Media-Plugins oder sonstige externe " +
            "Inhalte nachgeladen. Ihre IP-Adresse wird dadurch an keinen Drittanbieter " +
            "übermittelt.",
        ],
      },
      {
        heading: "7. SSL-/TLS-Verschlüsselung",
        body: [
          "Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung. Eine " +
            "verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers " +
            "mit „https://“ beginnt. Daten, die Sie an uns übermitteln, können dadurch nicht von " +
            "Dritten mitgelesen werden.",
        ],
      },
      {
        id: "rechte",
        heading: "8. Ihre Rechte als betroffene Person",
        body: ["Ihnen stehen gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten zu:"],
        bullets: [
          "Recht auf Auskunft (Art. 15 DSGVO)",
          "Recht auf Berichtigung (Art. 16 DSGVO)",
          "Recht auf Löschung (Art. 17 DSGVO)",
          "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
          "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
        ],
      },
      {
        heading: "9. Widerruf und Beschwerderecht",
        body: [
          "Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. " +
            "Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon " +
            "unberührt.",
          "Unabhängig davon steht Ihnen nach Art. 77 DSGVO ein Beschwerderecht bei einer " +
            "Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat Ihres " +
            "Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. " +
            "Zuständige Aufsichtsbehörde für uns ist: [Name und Anschrift der Behörde].",
          `Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an ${site.email}.`,
        ],
      },
      {
        heading: "10. Änderungen dieser Datenschutzerklärung",
        body: [
          "Wir passen diese Datenschutzerklärung an, sobald Änderungen der Website oder der " +
            "Rechtslage dies erforderlich machen. Es gilt jeweils die hier veröffentlichte " +
            "Fassung.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------- AGB */

  terms: {
    path: "/agb",
    altPath: "/en/terms",
    title: "Allgemeine Geschäftsbedingungen",
    description: "Bedingungen für die Nutzung der Bildungs-Guard-Plattform.",
    intro:
      "Diese Bedingungen regeln die Nutzung der Software-as-a-Service-Plattform Bildungs Guard " +
      "durch Unternehmen und Bildungsträger.",
    updated: "2026-08-14",
    blocks: [
      {
        heading: "1. Geltungsbereich",
        body: [
          "Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen " +
            "[Firmenname] (nachfolgend „Anbieter“) und dem Kunden über die Nutzung der Plattform " +
            "Bildungs Guard.",
          "Die Leistungen richten sich ausschließlich an Unternehmer im Sinne des § 14 BGB, " +
            "juristische Personen des öffentlichen Rechts und öffentlich-rechtliche " +
            "Sondervermögen. Abweichende Bedingungen des Kunden werden nicht Vertragsbestandteil, " +
            "sofern der Anbieter ihnen nicht ausdrücklich schriftlich zustimmt.",
        ],
      },
      {
        heading: "2. Vertragsgegenstand",
        body: [
          "Der Anbieter stellt dem Kunden die Plattform Bildungs Guard für die Dauer des Vertrages " +
            "über das Internet zur Nutzung bereit. Der Funktionsumfang ergibt sich aus " +
            "[Leistungsbeschreibung / gewähltem Tarif].",
          "Eine Überlassung der Software zum dauerhaften Verbleib erfolgt nicht.",
        ],
      },
      {
        heading: "3. Vertragsschluss",
        body: [
          "Die Darstellung der Leistungen auf dieser Website stellt kein bindendes Angebot dar. " +
            "Der Vertrag kommt durch [Bestellvorgang / Auftragsbestätigung / Vertragsunterzeichnung] " +
            "zustande.",
        ],
      },
      {
        heading: "4. Leistungsumfang und Verfügbarkeit",
        body: [
          "Der Anbieter schuldet eine Verfügbarkeit der Plattform von [z. B. 99,x] % im " +
            "Jahresmittel, gemessen am Übergabepunkt des Rechenzentrums.",
          "Hiervon ausgenommen sind angekündigte Wartungsfenster sowie Ausfälle, die der Anbieter " +
            "nicht zu vertreten hat.",
        ],
      },
      {
        heading: "5. Pflichten des Kunden",
        bullets: [
          "Zugangsdaten sind geheim zu halten und vor dem Zugriff Dritter zu schützen.",
          "Der Kunde ist für die Rechtmäßigkeit der von ihm eingestellten Inhalte und Daten verantwortlich.",
          "Der Kunde benennt [Anzahl] Administratoren für die Verwaltung der Nutzerkonten.",
        ],
      },
      {
        heading: "6. Vergütung und Zahlungsbedingungen",
        body: [
          "Es gilt die zum Zeitpunkt des Vertragsschlusses gültige Preisliste bzw. das vereinbarte " +
            "Angebot. Alle Preise verstehen sich zuzüglich der gesetzlichen Umsatzsteuer.",
          "Die Abrechnung erfolgt [monatlich / jährlich] im Voraus. Rechnungen sind innerhalb von " +
            "[Anzahl] Tagen ohne Abzug zur Zahlung fällig.",
        ],
      },
      {
        heading: "7. Laufzeit und Kündigung",
        body: [
          "Der Vertrag läuft [Laufzeit] und verlängert sich um jeweils [Verlängerungszeitraum], " +
            "sofern er nicht mit einer Frist von [Frist] zum Laufzeitende gekündigt wird.",
          "Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. " +
            "Kündigungen bedürfen der Textform.",
        ],
      },
      {
        heading: "8. Datenschutz und Auftragsverarbeitung",
        body: [
          "Verarbeitet der Anbieter im Rahmen der Leistungserbringung personenbezogene Daten des " +
            "Kunden, schließen die Parteien einen Vertrag zur Auftragsverarbeitung nach " +
            "Art. 28 DSGVO. Die Datenverarbeitung erfolgt ausschließlich in Rechenzentren in " +
            "[Deutschland / EU].",
        ],
      },
      {
        heading: "9. Datenexport und Löschung nach Vertragsende",
        body: [
          "Nach Beendigung des Vertrages kann der Kunde seine Daten innerhalb von [Anzahl] Tagen " +
            "in einem gängigen Format exportieren. Danach werden die Daten gelöscht, soweit keine " +
            "gesetzlichen Aufbewahrungspflichten entgegenstehen.",
        ],
      },
      {
        heading: "10. Haftung",
        body: [
          "Der Anbieter haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit sowie bei " +
            "Verletzung von Leben, Körper oder Gesundheit.",
          "Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die Haftung auf " +
            "den vertragstypischen, vorhersehbaren Schaden begrenzt. Im Übrigen ist die Haftung " +
            "ausgeschlossen. [Diese Klausel ist zwingend anwaltlich zu prüfen.]",
        ],
      },
      {
        heading: "11. Änderungen dieser Bedingungen",
        body: [
          "Der Anbieter kann diese Bedingungen mit einer Ankündigungsfrist von [Frist] ändern. " +
            "Widerspricht der Kunde nicht innerhalb von [Frist], gelten die Änderungen als " +
            "angenommen. Auf das Widerspruchsrecht wird in der Ankündigung gesondert hingewiesen.",
        ],
      },
      {
        heading: "12. Schlussbestimmungen",
        body: [
          "Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.",
          "Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist [Ort], sofern der Kunde " +
            "Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches " +
            "Sondervermögen ist.",
          "Sollte eine Bestimmung unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen " +
            "unberührt.",
        ],
      },
    ],
  },
};

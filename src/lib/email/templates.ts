import "server-only";

import type { DemoBooking } from "@/lib/validation/demo-booking";
import type { Locale } from "@/lib/i18n";
import { site } from "@/data/site";

/**
 * Escape every value that came from the visitor before it goes into HTML.
 * An email client is a browser; an unescaped name is an injection point.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Berlin's current abbreviation — CET or CEST — never hardcoded. */
function berlinTimezoneLabel(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    timeZoneName: "short",
  }).formatToParts(date);

  return parts.find((part) => part.type === "timeZoneName")?.value ?? "CET";
}

function formatDate(value: string, locale: Locale): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(date);
}

/* --------------------------------------------------------------- layout ---- */

const BRAND_NAVY = "#0F2A47";
const BRAND_BLUE = "#2563EB";

/**
 * Table-based layout with inline styles. Email clients strip <style> blocks and
 * have no flexbox — this is the format that survives Outlook.
 */
function wrapHtml(heading: string, bodyHtml: string, footerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F7FB;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FB;padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#FFFFFF;border-radius:14px;overflow:hidden;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">

    <tr><td style="background-color:${BRAND_NAVY};padding:26px 32px;">
      <span style="color:#FFFFFF;font-size:22px;font-weight:700;letter-spacing:-0.2px;">Bildungs</span>
      <span style="color:#4DD4AC;font-size:22px;font-weight:700;letter-spacing:-0.2px;"> Guard</span>
      <div style="color:#AFC4DC;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;margin-top:4px;">LMS &middot; QM &middot; AZAV</div>
    </td></tr>

    <tr><td style="padding:32px;">
      <h1 style="margin:0 0 18px;color:${BRAND_NAVY};font-size:21px;line-height:1.35;">${escapeHtml(heading)}</h1>
      ${bodyHtml}
    </td></tr>

    <tr><td style="background-color:#F7FAFD;border-top:1px solid #E3EBF4;padding:22px 32px;color:#5B7290;font-size:12px;line-height:1.7;">
      ${footerHtml}
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:9px 0;color:#5B7290;font-size:13px;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:9px 0;color:${BRAND_NAVY};font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

/* ------------------------------------------------------- customer email ---- */

const customerCopy = {
  de: {
    subject: "Ihre Webdemo-Anfrage bei BildungsGuard",
    heading: (name: string) => `Vielen Dank, ${name}!`,
    intro:
      "Ihre Anfrage für eine persönliche Webdemo ist bei uns eingegangen. Ein Mitglied unseres " +
      "Teams prüft Ihren Wunschtermin und bestätigt ihn innerhalb eines Werktags.",
    detailsTitle: "Ihr Wunschtermin",
    link:
      "Den Link zum Online-Meeting erhalten Sie mit der Terminbestätigung per E-Mail. Sie " +
      "benötigen dafür keine Software – der Raum öffnet sich direkt im Browser.",
    expect: "Was Sie in der Demo erwartet:",
    bullets: [
      "Rundgang durch Kursverwaltung, digitale Klassenliste und Teilnehmendenakte",
      "Wie Nachweise revisionssicher dokumentiert und für Audits vorbereitet werden",
      "Ihre Fragen zu AZAV, Förderabrechnung und Datenschutz",
    ],
    closing: "Wir freuen uns auf das Gespräch.",
    team: "Ihr Team von BildungsGuard",
    footerNote:
      "Sie erhalten diese E-Mail, weil auf bildungsguard.de eine Webdemo angefragt wurde. " +
      "Antworten Sie einfach auf diese Nachricht, wenn sich etwas ändert.",
  },
  en: {
    subject: "Your web demo request at BildungsGuard",
    heading: (name: string) => `Thank you, ${name}!`,
    intro:
      "We have received your request for a personal web demo. A member of our team is checking " +
      "your preferred slot and will confirm it within one working day.",
    detailsTitle: "Your preferred slot",
    link:
      "You will receive the link to the online meeting together with the confirmation email. No " +
      "software is required — the room opens directly in your browser.",
    expect: "What to expect in the demo:",
    bullets: [
      "A tour of course management, the digital class book and the participant record",
      "How records are documented in an audit-proof way and prepared for inspections",
      "Your questions on AZAV, funding settlement and data protection",
    ],
    closing: "We look forward to speaking with you.",
    team: "Your BildungsGuard team",
    footerNote:
      "You are receiving this email because a web demo was requested on bildungsguard.de. " +
      "Simply reply to this message if anything changes.",
  },
} as const;

const fieldLabels = {
  de: { date: "Datum", time: "Uhrzeit", company: "Einrichtung", programs: "Parallele Maßnahmen" },
  en: { date: "Date", time: "Time", company: "Organisation", programs: "Parallel programmes" },
} as const;

export function customerEmail(booking: DemoBooking, locale: Locale) {
  const copy = customerCopy[locale];
  const labels = fieldLabels[locale];
  const tz = berlinTimezoneLabel(new Date());
  const firstName = booking.name.trim().split(/\s+/)[0] ?? booking.name;
  const heading = copy.heading(firstName);

  const details = [
    detailRow(labels.date, formatDate(booking.date, locale)),
    detailRow(labels.time, `${booking.time} ${tz}`),
    detailRow(labels.company, booking.company),
  ].join("");

  const bodyHtml = `
    <p style="margin:0 0 20px;color:#33475F;font-size:15px;line-height:1.65;">${escapeHtml(copy.intro)}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7FAFD;border:1px solid #E3EBF4;border-radius:10px;padding:6px 18px;margin-bottom:22px;">
      <tr><td colspan="2" style="padding:12px 0 4px;color:${BRAND_BLUE};font-size:12px;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;">${escapeHtml(copy.detailsTitle)}</td></tr>
      ${details}
    </table>

    <p style="margin:0 0 22px;color:#33475F;font-size:15px;line-height:1.65;">${escapeHtml(copy.link)}</p>

    <p style="margin:0 0 10px;color:${BRAND_NAVY};font-size:15px;font-weight:700;">${escapeHtml(copy.expect)}</p>
    <ul style="margin:0 0 22px;padding-left:20px;color:#33475F;font-size:15px;line-height:1.7;">
      ${copy.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>

    <p style="margin:0 0 6px;color:#33475F;font-size:15px;line-height:1.65;">${escapeHtml(copy.closing)}</p>
    <p style="margin:0;color:${BRAND_NAVY};font-size:15px;font-weight:700;">${escapeHtml(copy.team)}</p>`;

  const footerHtml = `${escapeHtml(copy.footerNote)}<br><br>
    <a href="${site.url}" style="color:${BRAND_BLUE};text-decoration:none;">bildungsguard.de</a>`;

  const text = [
    heading,
    "",
    copy.intro,
    "",
    `${copy.detailsTitle}:`,
    `- ${labels.date}: ${formatDate(booking.date, locale)}`,
    `- ${labels.time}: ${booking.time} ${tz}`,
    `- ${labels.company}: ${booking.company}`,
    "",
    copy.link,
    "",
    copy.expect,
    ...copy.bullets.map((item) => `- ${item}`),
    "",
    copy.closing,
    copy.team,
    "",
    copy.footerNote,
  ].join("\n");

  return { subject: copy.subject, html: wrapHtml(heading, bodyHtml, footerHtml), text };
}

/* ------------------------------------------------------- internal email ---- */

/** The lead notification. Always German — it goes to the internal team. */
export function internalEmail(booking: DemoBooking, locale: Locale) {
  const tz = berlinTimezoneLabel(new Date());
  const heading = `Neue Webdemo-Anfrage: ${booking.company}`;

  const rows = [
    detailRow("Name", booking.name),
    detailRow("E-Mail", booking.email),
    detailRow("Einrichtung", booking.company),
    booking.phone ? detailRow("Telefon", booking.phone) : "",
    detailRow("Wunschtermin", `${formatDate(booking.date, "de")}, ${booking.time} ${tz}`),
    booking.programs ? detailRow("Parallele Maßnahmen", booking.programs) : "",
    detailRow("Sprache der Anfrage", locale === "de" ? "Deutsch" : "Englisch"),
    detailRow("Eingegangen am", new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Berlin",
    }).format(new Date())),
  ].join("");

  const messageBlock = booking.message
    ? `<p style="margin:22px 0 6px;color:${BRAND_NAVY};font-size:14px;font-weight:700;">Nachricht</p>
       <div style="background-color:#F7FAFD;border-left:3px solid ${BRAND_BLUE};padding:14px 16px;color:#33475F;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escapeHtml(booking.message)}</div>`
    : "";

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${messageBlock}
    <p style="margin:24px 0 0;color:#5B7290;font-size:13px;line-height:1.6;">
      Antworten Sie direkt auf diese E-Mail, um dem Interessenten zu schreiben.
    </p>`;

  const text = [
    heading,
    "",
    `Name: ${booking.name}`,
    `E-Mail: ${booking.email}`,
    `Einrichtung: ${booking.company}`,
    booking.phone ? `Telefon: ${booking.phone}` : "",
    `Wunschtermin: ${formatDate(booking.date, "de")}, ${booking.time} ${tz}`,
    booking.programs ? `Parallele Maßnahmen: ${booking.programs}` : "",
    `Sprache: ${locale === "de" ? "Deutsch" : "Englisch"}`,
    booking.message ? `\nNachricht:\n${booking.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Webdemo-Anfrage – ${booking.company} (${formatDate(booking.date, "de")}, ${booking.time})`,
    html: wrapHtml(heading, bodyHtml, "Automatische Benachrichtigung von bildungsguard.de"),
    text,
  };
}

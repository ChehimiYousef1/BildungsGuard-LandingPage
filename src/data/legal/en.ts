import type { LegalContent } from "@/types/legal";
import { site } from "@/data/site";

/**
 * English legal pages.
 *
 * These mirror the German documents block for block. German law governs the
 * relationship, so the German version stays authoritative — that is stated in
 * each document. Placeholders in square brackets must be filled before launch.
 */
export const legalEn: LegalContent = {
  strings: {
    back: "Back to home",
    updatedLabel: "Last updated:",
    draftNotice:
      "Draft – the details marked in square brackets must be completed and the text reviewed by " +
      "a lawyer before publication.",
  },

  /* --------------------------------------------------------------- Imprint */

  imprint: {
    path: "/en/imprint",
    altPath: "/impressum",
    title: "Imprint",
    description: "Provider identification pursuant to § 5 DDG and § 18 (2) MStV.",
    intro:
      "This is a translation for convenience. The German version at /impressum is the legally " +
      "binding one.",
    updated: "2026-08-14",
    blocks: [
      {
        heading: "Information pursuant to § 5 DDG",
        body: [
          "[Full company name, e.g. Bildungs Guard GmbH]",
          "[Street and number]",
          "[Postcode and city]",
          "Germany",
        ],
      },
      {
        heading: "Represented by",
        body: ["[Name of the authorised representative / managing director]"],
      },
      {
        heading: "Contact",
        body: [`Phone: ${site.phone}`, `Email: ${site.email}`],
      },
      {
        heading: "Commercial register",
        body: ["Registered at: [local court]", "Registration number: [HRB ...]"],
      },
      {
        heading: "VAT identification number",
        body: [
          "VAT identification number pursuant to § 27 a of the German VAT Act: [DE ...]",
        ],
      },
      {
        heading: "Responsible for content pursuant to § 18 (2) MStV",
        body: ["[Name]", "[Address, if different from the above]"],
      },
      {
        heading: "Consumer dispute resolution",
        body: [
          "We are neither willing nor obliged to participate in dispute resolution proceedings " +
            "before a consumer arbitration board.",
          "Note: the former EU Online Dispute Resolution platform has been discontinued, so a " +
            "link to it no longer belongs in an imprint.",
        ],
      },
      {
        heading: "Liability for content",
        body: [
          "As a service provider we are responsible for our own content on these pages under " +
            "general law. We are not obliged, however, to monitor transmitted or stored " +
            "third-party information or to investigate circumstances that indicate unlawful " +
            "activity.",
          "Obligations to remove or block the use of information under general law remain " +
            "unaffected. Liability in this respect is only possible from the point at which a " +
            "concrete infringement becomes known. We remove such content immediately once we " +
            "become aware of it.",
        ],
      },
      {
        heading: "Liability for links",
        body: [
          "Our pages contain links to external websites over whose content we have no control. " +
            "The respective provider or operator of the linked pages is always responsible for " +
            "their content. We remove such links immediately if we become aware of legal " +
            "infringements.",
        ],
      },
      {
        heading: "Copyright",
        body: [
          "Content and works created by the site operators on these pages are subject to German " +
            "copyright law. Contributions by third parties are marked as such. Reproduction, " +
            "adaptation, distribution and any kind of exploitation outside the limits of " +
            "copyright require the written consent of the respective author or creator.",
        ],
      },
    ],
  },

  /* --------------------------------------------------------- Privacy policy */

  privacy: {
    path: "/en/privacy",
    altPath: "/datenschutz",
    title: "Privacy Policy",
    description:
      "Information on the processing of personal data on this website pursuant to Art. 13 GDPR.",
    intro:
      "This website processes as little personal data as possible. It sets no cookies, uses no " +
      "tracking and loads no third-party content. The German version at /datenschutz is the " +
      "legally binding one.",
    updated: "2026-08-14",
    blocks: [
      {
        id: "controller",
        heading: "1. Controller",
        body: [
          "The controller for data processing on this website within the meaning of the GDPR is:",
          "[Full company name]",
          "[Address]",
          `Email: ${site.email}`,
          "[If appointed: contact details of the data protection officer]",
        ],
      },
      {
        id: "hosting",
        heading: "2. Hosting and server log files",
        body: [
          "This website is operated by a provider with servers located in Germany: " +
            "[name and address of the host].",
          "When you visit the website, information is automatically transmitted to the server and " +
            "temporarily stored in a log file. The following is recorded:",
        ],
        bullets: [
          "IP address of the requesting device",
          "date and time of access",
          "name and URL of the file retrieved",
          "volume of data transferred and confirmation of successful retrieval",
          "browser, operating system and the previously visited page (referrer)",
        ],
      },
      {
        heading: "3. Legal basis and purpose of log file processing",
        body: [
          "The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest lies in the secure and " +
            "stable operation of the website and in defending against attacks.",
          "Log data is deleted after [number] days. This data is not combined with other data " +
            "sources.",
          "A data processing agreement pursuant to Art. 28 GDPR is in place with the hosting " +
            "provider.",
        ],
      },
      {
        id: "form",
        heading: "4. Web demo requests and contacting us",
        body: [
          "If you request a web demo via the form on this website, we process the data you " +
            "provide – name, email address and your preferred date and time – solely to handle " +
            "your enquiry.",
          "The legal basis is Art. 6 (1) (b) GDPR where the enquiry is aimed at concluding a " +
            "contract, and otherwise Art. 6 (1) (f) GDPR based on our legitimate interest in " +
            "responding to enquiries.",
          "The data is deleted once your enquiry has been fully dealt with, provided no statutory " +
            "retention periods apply.",
          "The same applies to enquiries reaching us by email or telephone.",
        ],
      },
      {
        id: "cookies",
        heading: "5. Cookies, tracking and analytics",
        body: [
          "This website sets no cookies and uses no analytics, tracking or marketing services. " +
            "In particular, there is no audience measurement and no profiling.",
          "For that reason there is no cookie banner and no cookie settings on this site – no " +
            "consent is required because no non-essential technologies are used.",
        ],
      },
      {
        heading: "6. Fonts and external content",
        body: [
          "All fonts used are served locally from our own server. There is no connection to " +
            "Google Fonts or any other content delivery network. Likewise, no videos, maps, " +
            "social media plugins or other external content are loaded. Your IP address is " +
            "therefore not transmitted to any third party.",
        ],
      },
      {
        heading: "7. SSL/TLS encryption",
        body: [
          "For security reasons this website uses TLS encryption. You can recognise an encrypted " +
            "connection by the browser address bar starting with “https://”. Data you transmit to " +
            "us cannot be read by third parties.",
        ],
      },
      {
        id: "rights",
        heading: "8. Your rights as a data subject",
        body: ["You have the following rights regarding your personal data:"],
        bullets: [
          "right of access (Art. 15 GDPR)",
          "right to rectification (Art. 16 GDPR)",
          "right to erasure (Art. 17 GDPR)",
          "right to restriction of processing (Art. 18 GDPR)",
          "right to data portability (Art. 20 GDPR)",
          "right to object to processing (Art. 21 GDPR)",
        ],
      },
      {
        heading: "9. Withdrawal and right to lodge a complaint",
        body: [
          "You may withdraw any consent you have given at any time with effect for the future. " +
            "The lawfulness of processing carried out until withdrawal remains unaffected.",
          "Independently of this, Art. 77 GDPR gives you the right to lodge a complaint with a " +
            "data protection supervisory authority, in particular in the member state of your " +
            "residence, place of work or the place of the alleged infringement. The authority " +
            "responsible for us is: [name and address of the authority].",
          `An informal message to ${site.email} is enough to exercise your rights.`,
        ],
      },
      {
        heading: "10. Changes to this privacy policy",
        body: [
          "We adapt this privacy policy whenever changes to the website or the legal situation " +
            "make it necessary. The version published here applies in each case.",
        ],
      },
    ],
  },

  /* ----------------------------------------------------------------- Terms */

  terms: {
    path: "/en/terms",
    altPath: "/agb",
    title: "Terms and Conditions",
    description: "Conditions for using the Bildungs Guard platform.",
    intro:
      "These terms govern the use of the Bildungs Guard software-as-a-service platform by " +
      "companies and education providers. The German version at /agb is the legally binding one.",
    updated: "2026-08-14",
    blocks: [
      {
        heading: "1. Scope",
        body: [
          "These terms and conditions apply to all contracts between [company name] (the " +
            "“provider”) and the customer concerning use of the Bildungs Guard platform.",
          "The services are directed exclusively at entrepreneurs within the meaning of § 14 of " +
            "the German Civil Code, legal entities under public law and special funds under " +
            "public law. Deviating terms of the customer do not become part of the contract " +
            "unless the provider expressly agrees to them in writing.",
        ],
      },
      {
        heading: "2. Subject matter",
        body: [
          "The provider makes the Bildungs Guard platform available to the customer for use over " +
            "the internet for the term of the contract. The scope of functions follows from " +
            "[service description / selected plan].",
          "The software is not transferred to the customer permanently.",
        ],
      },
      {
        heading: "3. Conclusion of contract",
        body: [
          "The presentation of services on this website does not constitute a binding offer. The " +
            "contract is concluded by [ordering process / order confirmation / signature].",
        ],
      },
      {
        heading: "4. Scope of service and availability",
        body: [
          "The provider owes availability of the platform of [e.g. 99.x] % on an annual average, " +
            "measured at the handover point of the data centre.",
          "Announced maintenance windows and outages for which the provider is not responsible " +
            "are excluded from this.",
        ],
      },
      {
        heading: "5. Customer obligations",
        bullets: [
          "Access credentials must be kept secret and protected from third-party access.",
          "The customer is responsible for the lawfulness of the content and data it uploads.",
          "The customer designates [number] administrators to manage user accounts.",
        ],
      },
      {
        heading: "6. Fees and payment terms",
        body: [
          "The price list valid at the time the contract is concluded, or the agreed quotation, " +
            "applies. All prices are exclusive of statutory VAT.",
          "Billing takes place [monthly / annually] in advance. Invoices are payable in full " +
            "within [number] days.",
        ],
      },
      {
        heading: "7. Term and termination",
        body: [
          "The contract runs for [term] and renews for [renewal period] unless terminated with " +
            "[notice period] notice to the end of the term.",
          "The right to extraordinary termination for good cause remains unaffected. Termination " +
            "must be in text form.",
        ],
      },
      {
        heading: "8. Data protection and processing on behalf",
        body: [
          "Where the provider processes the customer's personal data in the course of providing " +
            "the service, the parties conclude a data processing agreement pursuant to " +
            "Art. 28 GDPR. Data is processed exclusively in data centres in [Germany / the EU].",
        ],
      },
      {
        heading: "9. Data export and deletion after the contract ends",
        body: [
          "After the contract ends, the customer may export its data in a common format within " +
            "[number] days. The data is deleted thereafter unless statutory retention obligations " +
            "apply.",
        ],
      },
      {
        heading: "10. Liability",
        body: [
          "The provider is liable without limitation for intent and gross negligence and for " +
            "injury to life, body or health.",
          "In the event of slightly negligent breach of material contractual obligations, " +
            "liability is limited to the foreseeable damage typical for this type of contract. " +
            "Liability is otherwise excluded. [This clause must be reviewed by a lawyer.]",
        ],
      },
      {
        heading: "11. Changes to these terms",
        body: [
          "The provider may amend these terms with [notice period] notice. If the customer does " +
            "not object within [period], the changes are deemed accepted. The right to object is " +
            "pointed out separately in the notice.",
        ],
      },
      {
        heading: "12. Final provisions",
        body: [
          "The law of the Federal Republic of Germany applies, excluding the UN Convention on " +
            "Contracts for the International Sale of Goods.",
          "The place of jurisdiction for all disputes arising from this contract is [city], " +
            "provided the customer is a merchant, a legal entity under public law or a special " +
            "fund under public law.",
          "Should any provision be invalid, the validity of the remaining provisions remains " +
            "unaffected.",
        ],
      },
    ],
  },
};

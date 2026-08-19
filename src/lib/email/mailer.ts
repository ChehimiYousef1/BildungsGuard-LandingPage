import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

/**
 * Thrown when SMTP configuration is missing. Carries variable NAMES only —
 * never a value — so it stays safe to log.
 */
export class MailConfigError extends Error {
  constructor(missing: string[]) {
    super(`Missing mail environment variables: ${missing.join(", ")}`);
    this.name = "MailConfigError";
  }
}

export interface MailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  /** "Bildungs Guard <noreply@...>" — what the customer sees as sender. */
  from: string;
  /** Internal inbox that receives the lead. */
  to: string;
  /** Where customer replies should land. */
  replyTo: string;
}

/**
 * Read at call time, not at module load: a missing variable must fail the one
 * request that needs it, not the whole build.
 */
export function getMailConfig(): MailConfig {
  const required = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "MAIL_FROM", "MAIL_TO"] as const;
  const missing = required.filter((key) => !process.env[key]?.trim());

  if (missing.length > 0) throw new MailConfigError(missing);

  const port = Number(process.env.SMTP_PORT ?? 587);

  return {
    host: process.env.SMTP_HOST!,
    port,
    // Port 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user: process.env.SMTP_USER!,
    password: process.env.SMTP_PASSWORD!,
    from: process.env.MAIL_FROM!,
    to: process.env.MAIL_TO!,
    replyTo: process.env.MAIL_REPLY_TO?.trim() || process.env.MAIL_TO!,
  };
}

let transporter: Transporter | null = null;

/** One pooled transport per server process, reused across requests. */
function getTransport(config: MailConfig): Transporter {
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    pool: true,
    maxConnections: 3,
  });

  return transporter;
}

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendMail(config: MailConfig, message: MailMessage): Promise<void> {
  await getTransport(config).sendMail({
    from: config.from,
    to: message.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
    replyTo: message.replyTo,
  });
}

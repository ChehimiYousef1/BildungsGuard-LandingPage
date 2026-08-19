import { z } from "zod";

/** How many parallel programmes the visitor runs — drives our follow-up. */
export const PROGRAM_COUNTS = [
  "1-2",
  "3-5",
  "6-10",
  "10+",
] as const;

/**
 * Bookable demo slots in Europe/Berlin.
 *
 * Business hours: 09:00–18:00.
 * Each demo occupies 30 minutes, therefore the final starting slot is 17:30.
 */
export const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
] as const;

/** Field length caps. */
export const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  message: 2000,
} as const;

/** Validation messages shared between client and server. */
export interface ValidationMessages {
  name: string;
  email: string;
  company: string;
  date: string;
  datePast: string;
  time: string;
  privacy: string;
  tooLong: string;
}

const defaultMessages: ValidationMessages = {
  name: "Bitte geben Sie Ihren Namen an.",
  email: "Bitte geben Sie eine gültige E-Mail-Adresse an.",
  company: "Bitte geben Sie Ihre Einrichtung an.",
  date: "Bitte wählen Sie einen Wunschtermin.",
  datePast: "Bitte wählen Sie ein Datum in der Zukunft.",
  time: "Bitte wählen Sie eine Uhrzeit.",
  privacy: "Bitte stimmen Sie der Datenschutzerklärung zu.",
  tooLong: "Diese Angabe ist zu lang.",
};

/**
 * Returns today's date in Europe/Berlin as:
 *
 * YYYY-MM-DD
 *
 * Example:
 * 2026-08-19
 */
export function getBerlinToday(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year =
    parts.find((part) => part.type === "year")?.value ?? "";

  const month =
    parts.find((part) => part.type === "month")?.value ?? "";

  const day =
    parts.find((part) => part.type === "day")?.value ?? "";

  return `${year}-${month}-${day}`;
}

/**
 * Returns the current Berlin time as HH:mm.
 *
 * Example:
 * 14:35
 */
export function getBerlinCurrentTime(): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const hour =
    parts.find((part) => part.type === "hour")?.value ?? "00";

  const minute =
    parts.find((part) => part.type === "minute")?.value ?? "00";

  return `${hour}:${minute}`;
}

/**
 * Returns true when a selected demo slot has already passed.
 *
 * Examples:
 *
 * Yesterday -> true
 * Tomorrow -> false
 *
 * Today at 15:00:
 * 14:30 -> true
 * 16:00 -> false
 */
export function isPastBerlinSlot(
  date: string,
  time: string,
): boolean {
  const today = getBerlinToday();

  if (date < today) {
    return true;
  }

  if (date > today) {
    return false;
  }

  const currentTime = getBerlinCurrentTime();

  return time <= currentTime;
}

/**
 * Schema factory.
 *
 * The browser validates using translated messages, while the server
 * validates the same payload again.
 */
export function createDemoBookingSchema(
  messages: Partial<ValidationMessages> = {},
) {
  const m = {
    ...defaultMessages,
    ...messages,
  };

  return z.object({
    name: z
      .string()
      .trim()
      .min(2, m.name)
      .max(LIMITS.name, m.tooLong),

    email: z
      .string()
      .trim()
      .email(m.email)
      .max(LIMITS.email, m.tooLong),

    company: z
      .string()
      .trim()
      .min(2, m.company)
      .max(LIMITS.company, m.tooLong),

    phone: z
      .string()
      .trim()
      .max(LIMITS.phone, m.tooLong)
      .optional()
      .or(z.literal("")),

    /**
     * Date remains YYYY-MM-DD.
     *
     * String comparison is safe here because the format is ordered:
     *
     * 2026-08-19
     * 2026-08-20
     */
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, m.date)
      .refine(
        (value) => value >= getBerlinToday(),
        m.datePast,
      ),

    time: z.enum(TIME_SLOTS, {
      message: m.time,
    }),

    programs: z
      .enum(PROGRAM_COUNTS)
      .optional()
      .or(z.literal("")),

    message: z
      .string()
      .trim()
      .max(LIMITS.message, m.tooLong)
      .optional()
      .or(z.literal("")),

    privacy: z.literal(true, {
      message: m.privacy,
    }),

    /**
     * Honeypot.
     *
     * Real visitors never see/fill this field.
     */
    website: z
      .string()
      .max(200)
      .optional(),
  });
}

export const demoBookingSchema =
  createDemoBookingSchema();

export type DemoBooking =
  z.infer<typeof demoBookingSchema>;

/** What POST /api/demo-booking returns. */
export interface DemoBookingResponse {
  ok: boolean;

  /** Present when ok is false. */
  error?: string;
}
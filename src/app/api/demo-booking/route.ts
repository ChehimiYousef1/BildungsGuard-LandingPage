import { NextResponse } from "next/server";

import {
  demoBookingSchema,
  isPastBerlinSlot,
  type DemoBookingResponse,
} from "@/lib/validation/demo-booking";

import {
  customerEmail,
  internalEmail,
} from "@/lib/email/templates";

import {
  getMailConfig,
  sendMail,
  MailConfigError,
} from "@/lib/email/mailer";

import { prisma } from "@/lib/prisma";
import { isLocale, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Messages the visitor may see. Never leak internal detail into these. */
const messages = {
  de: {
    invalid: "Bitte prüfen Sie Ihre Angaben.",

    rateLimited:
      "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.",

    failed:
      "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",

    unavailable:
      "Dieser Termin ist nicht mehr verfügbar. Bitte wählen Sie eine andere Uhrzeit.",

    justBooked:
      "Dieser Termin wurde gerade gebucht. Bitte wählen Sie eine andere verfügbare Uhrzeit.",
  },

  en: {
    invalid: "Please check your details.",

    rateLimited:
      "Too many requests. Please try again in a few minutes.",

    failed:
      "Your request could not be sent. Please try again later.",

    unavailable:
      "This time is no longer available. Please choose another time.",

    justBooked:
      "This time has just been booked. Please choose another available time.",
  },
} as const;

/* ------------------------------------------------------------ rate limit ---- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

/**
 * In-process counter.
 *
 * Fine for a single instance. If the application later runs on multiple
 * serverless instances, move rate limiting to Redis / Upstash / similar.
 */
const hits = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return false;
  }

  entry.count += 1;

  return entry.count > MAX_REQUESTS;
}

/** Opportunistic cleanup so the map cannot grow without bound. */
function pruneExpired(): void {
  const now = Date.now();

  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) {
      hits.delete(ip);
    }
  }
}

function clientIp(request: Request): string {
  const forwarded =
    request.headers.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ------------------------------------------------------ Prisma helpers ---- */

/**
 * Prisma returns P2002 when the unique constraint on:
 *
 * date + time
 *
 * is violated.
 *
 * We avoid depending on instanceof here so this remains robust with the
 * generated Prisma 7 client.
 */
function isUniqueConstraintError(
  error: unknown,
): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "P2002"
  );
}

/* ----------------------------------------------------------------- route ---- */

export async function POST(
  request: Request,
): Promise<NextResponse<DemoBookingResponse>> {
  const localeHeader =
    request.headers.get("x-locale");

  const locale: Locale =
    isLocale(localeHeader)
      ? localeHeader
      : "de";

  const copy = messages[locale];

  /* ----------------------------------------------------------- rate limit */

  pruneExpired();

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        error: copy.rateLimited,
      },
      {
        status: 429,
      },
    );
  }

  /* -------------------------------------------------------------- payload */

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: copy.invalid,
      },
      {
        status: 400,
      },
    );
  }

  /*
   * Always validate again on the server.
   * Browser validation is only for visitor convenience.
   */
  const parsed =
    demoBookingSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: copy.invalid,
      },
      {
        status: 400,
      },
    );
  }

  const booking = parsed.data;

  /* ------------------------------------------------------------ honeypot */

  /*
   * Bot filled the hidden field.
   *
   * Pretend success so the bot does not learn which field caught it.
   */
  if (
    booking.website &&
    booking.website.length > 0
  ) {
    return NextResponse.json({
      ok: true,
    });
  }

  /* ----------------------------------------------------- slot validation */

  /*
   * Never trust the availability shown in the browser.
   *
   * The selected date/time might have passed between page load and submit.
   */
  if (
    isPastBerlinSlot(
      booking.date,
      booking.time,
    )
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: copy.unavailable,
      },
      {
        status: 409,
      },
    );
  }

  /* ------------------------------------------------------- mail config */

  let config;

  try {
    config = getMailConfig();
  } catch (error) {
    if (
      error instanceof MailConfigError
    ) {
      /*
       * Variable names only.
       * Never print SMTP passwords.
       */
      console.error(
        "[demo-booking] mail not configured:",
        error.message,
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: copy.failed,
      },
      {
        status: 500,
      },
    );
  }

  /* ---------------------------------------------------- reserve database */

  /*
   * IMPORTANT:
   *
   * Reserve the appointment BEFORE sending email.
   *
   * Your Prisma model should contain:
   *
   * @@unique([date, time])
   *
   * Therefore the database itself guarantees that two visitors cannot book
   * the same slot.
   */
  try {
    await prisma.demoReservation.create({
      data: {
        name: booking.name,
        email: booking.email,
        company: booking.company,

        phone:
          booking.phone?.trim() || null,

        date: booking.date,
        time: booking.time,

        programs:
          booking.programs || null,

        message:
          booking.message?.trim() || null,

        locale,
      },
    });
  } catch (error) {
    /*
     * Another visitor may have booked this exact slot after the current
     * visitor loaded the availability list but before they clicked Submit.
     */
    if (isUniqueConstraintError(error)) {
      return NextResponse.json(
        {
          ok: false,
          error: copy.justBooked,
        },
        {
          status: 409,
        },
      );
    }

    console.error(
      "[demo-booking] reservation database error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error: copy.failed,
      },
      {
        status: 500,
      },
    );
  }

  /* ----------------------------------------------------------- templates */

  /*
   * The booking is now safely stored in Neon.
   */
  const customer =
    customerEmail(booking, locale);

  const internal =
    internalEmail(booking, locale);

  /* --------------------------------------------------------------- email */

  /*
   * Send independently:
   *
   * 1. notification to Bildungs Guard
   * 2. confirmation to customer
   *
   * The reservation stays in the database even if SMTP temporarily fails.
   */
  const [
    internalResult,
    customerResult,
  ] = await Promise.allSettled([
    sendMail(config, {
      to: config.to,

      subject: internal.subject,
      html: internal.html,
      text: internal.text,

      /*
       * Team can click Reply and answer the prospect directly.
       */
      replyTo: booking.email,
    }),

    sendMail(config, {
      to: booking.email,

      subject: customer.subject,
      html: customer.html,
      text: customer.text,

      /*
       * Customer replies go to the Bildungs Guard inbox.
       */
      replyTo: config.replyTo,
    }),
  ]);

  /* ---------------------------------------------------------- mail errors */

  if (
    internalResult.status === "rejected"
  ) {
    console.error(
      "[demo-booking] internal mail failed:",
      internalResult.reason,
    );
  }

  if (
    customerResult.status === "rejected"
  ) {
    console.error(
      "[demo-booking] customer mail failed:",
      customerResult.reason,
    );
  }

  /*
   * IMPORTANT:
   *
   * Do not return "booking failed" here if an email failed.
   *
   * The reservation already exists in the database. Returning an error would
   * encourage the visitor to submit again, but their slot is already booked.
   *
   * The database is now the source of truth.
   */
  return NextResponse.json(
    {
      ok: true,
    },
    {
      status: 201,
    },
  );
}
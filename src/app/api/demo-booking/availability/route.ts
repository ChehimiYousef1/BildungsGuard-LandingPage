import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { rateLimit, pruneRateLimits, clientIp } from "@/lib/rate-limit";
import {
  TIME_SLOTS,
  getBerlinToday,
  isPastBerlinSlot,
} from "@/lib/validation/demo-booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** How far ahead a slot can be requested. Bounds the queryable date space. */
const MAX_DAYS_AHEAD = 180;

export async function GET(request: NextRequest) {
  pruneRateLimits();

  // Cheapest endpoint on the site, and it hits the database on every call.
  if (rateLimit(`availability:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  try {
    const date = request.nextUrl.searchParams.get("date");

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ ok: false, error: "Invalid date." }, { status: 400 });
    }

    // Format validation is not range validation: without a ceiling an attacker
    // can walk a million distinct dates, each an uncacheable database round-trip.
    const horizon = new Date(`${getBerlinToday()}T00:00:00Z`);
    horizon.setUTCDate(horizon.getUTCDate() + MAX_DAYS_AHEAD);

    if (date > horizon.toISOString().slice(0, 10)) {
      return NextResponse.json({ ok: false, error: "Date out of range." }, { status: 400 });
    }

    // Past date — answer normally rather than erroring, the UI just shows nothing.
    if (date < getBerlinToday()) {
      return NextResponse.json(
        { ok: true, available: [] },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    // Past date
    if (date < getBerlinToday()) {
      return NextResponse.json(
        {
          ok: true,
          available: [],
        },
        {
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    // Get booked slots for this date
    const reservations = await prisma.demoReservation.findMany({
      where: {
        date,
      },
      select: {
        time: true,
      },
    });

    const bookedTimes = new Set(
      reservations.map((reservation) => reservation.time),
    );

    // Remove booked slots and already-passed slots
    const available = TIME_SLOTS.filter((slot) => {
      if (bookedTimes.has(slot)) {
        return false;
      }

      if (isPastBerlinSlot(date, slot)) {
        return false;
      }

      return true;
    });

    return NextResponse.json(
      {
        ok: true,
        date,
        available,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "[demo-booking] availability error:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to load available times.",
      },
      { status: 500 },
    );
  }
}
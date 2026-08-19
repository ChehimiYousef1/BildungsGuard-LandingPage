"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

import {
  Button,
  Card,
} from "@/components/ui";

import {
  createDemoBookingSchema,
  PROGRAM_COUNTS,
  LIMITS,
  getBerlinToday,
  type DemoBooking,
  type DemoBookingResponse,
} from "@/lib/validation/demo-booking";

import type { DemoFormContent } from "@/types/content";
import type { Locale } from "@/lib/i18n";

import { cn } from "@/lib/utils";

const inputClass =
  "border-line h-11 w-full rounded-[10px] border px-4 text-[15px] text-ink placeholder:text-muted focus:border-blue focus:outline-none";

const labelClass =
  "text-ink mt-5 block text-[13px] font-bold";

/* -------------------------------------------------------------- errors ---- */

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-[13px] text-red-600"
    >
      {message}
    </p>
  );
}

/* --------------------------------------------------------------- types ---- */

interface DemoRequestFormProps {
  content: DemoFormContent;
  locale: Locale;
}

interface AvailabilityResponse {
  ok: boolean;
  available?: string[];
  error?: string;
}

/* --------------------------------------------------------------- form ---- */

export function DemoRequestForm({
  content,
  locale,
}: DemoRequestFormProps) {
  const [sent, setSent] = useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [
    availableSlots,
    setAvailableSlots,
  ] = useState<string[]>([]);

  const [
    loadingSlots,
    setLoadingSlots,
  ] = useState(false);

  const [
    availabilityError,
    setAvailabilityError,
  ] = useState<string | null>(null);

  /* --------------------------------------------------------- validation */

  const schema = useMemo(
    () =>
      createDemoBookingSchema(
        content.errors,
      ),
    [content.errors],
  );

  /* --------------------------------------------------------------- RHF */

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<DemoBooking>({
    resolver: zodResolver(schema),

    defaultValues: {
      privacy:
        false as unknown as true,

      website: "",
    },
  });

  const selectedDate =
    watch("date");

  /* ---------------------------------------------------- fresh page load */

  /**
   * Whenever this booking form is mounted,
   * always begin with a fresh booking.
   *
   * This means:
   *
   * - old success state disappears
   * - old errors disappear
   * - previous date/time disappear
   * - visitor receives a clean new form
   */
  useEffect(() => {
    setSent(false);

    setSubmitError(null);

    setAvailableSlots([]);

    setAvailabilityError(null);

    setLoadingSlots(false);

    reset();
  }, [reset]);

  /* ------------------------------------------------------ availability */

  const loadAvailability =
    useCallback(
      async (
        date: string,
        signal?: AbortSignal,
      ) => {
        setLoadingSlots(true);

        setAvailabilityError(null);

        try {
          const response =
            await fetch(
              `/api/demo-booking/availability?date=${encodeURIComponent(
                date,
              )}`,
              {
                method: "GET",

                cache: "no-store",

                signal,
              },
            );

          const data =
            (await response.json()) as AvailabilityResponse;

          if (
            !response.ok ||
            !data.ok
          ) {
            throw new Error(
              data.error ??
                "Unable to load available times.",
            );
          }

          setAvailableSlots(
            data.available ?? [],
          );
        } catch (error) {
          /**
           * Changing the selected date aborts
           * the previous request.
           */
          if (
            error instanceof DOMException &&
            error.name ===
              "AbortError"
          ) {
            return;
          }

          console.error(
            "[demo-booking] availability loading failed:",
            error,
          );

          setAvailableSlots([]);

          setAvailabilityError(
            locale === "de"
              ? "Die verfügbaren Zeiten konnten nicht geladen werden."
              : "Available times could not be loaded.",
          );
        } finally {
          setLoadingSlots(false);
        }
      },
      [locale],
    );

  /* ---------------------------------------------------- date changes */

  useEffect(() => {
    /**
     * A time belonging to the previous date
     * must never remain selected.
     */
    resetField("time");

    setAvailableSlots([]);

    setAvailabilityError(null);

    if (!selectedDate) {
      return;
    }

    const controller =
      new AbortController();

    void loadAvailability(
      selectedDate,
      controller.signal,
    );

    return () => {
      controller.abort();
    };
  }, [
    selectedDate,
    loadAvailability,
    resetField,
  ]);

  /* ---------------------------------------------------------- submit */

  const onSubmit = async (
    values: DemoBooking,
  ) => {
    setSubmitError(null);

    try {
      const response =
        await fetch(
          "/api/demo-booking",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              "x-locale":
                locale,
            },

            body: JSON.stringify(
              values,
            ),
          },
        );

      const data =
        (await response.json()) as DemoBookingResponse;

      if (
        !response.ok ||
        !data.ok
      ) {
        setSubmitError(
          data.error ??
            content.errorGeneric,
        );

        /**
         * HTTP 409 means another visitor
         * booked the slot before this
         * request reached the server.
         *
         * Reload availability immediately.
         */
        if (
          response.status === 409 &&
          selectedDate
        ) {
          resetField("time");

          await loadAvailability(
            selectedDate,
          );
        }

        return;
      }

      setSent(true);
    } catch (error) {
      console.error(
        "[demo-booking] submit failed:",
        error,
      );

      setSubmitError(
        content.errorGeneric,
      );
    }
  };

  /* --------------------------------------------------- another booking */

  const startNewBooking = () => {
    reset();

    setSent(false);

    setSubmitError(null);

    setAvailableSlots([]);

    setAvailabilityError(null);

    setLoadingSlots(false);
  };

  /* --------------------------------------------------------- success */

  if (sent) {
    return (
      <Card className="flex min-h-[420px] flex-col items-center justify-center p-9 text-center">
        <CheckCircle2
          aria-hidden
          className="text-success size-10"
        />

        <p className="text-navy mt-5 text-lg font-extrabold">
          {content.successTitle}
        </p>

        <p className="text-ink mt-3 max-w-[360px] text-[15px] leading-6">
          {content.success}
        </p>

        <p className="text-muted mt-4 max-w-[360px] text-[13px] leading-5">
          {content.successHint}
        </p>

        <Button
          type="button"
          onClick={
            startNewBooking
          }
          className="mt-6"
        >
          {locale === "de"
            ? "Neue Demo buchen"
            : "Book another demo"}
        </Button>
      </Card>
    );
  }

  /* ------------------------------------------------------------ form */

  return (
    <Card className="w-full p-8 shadow-[0_18px_50px_rgba(15,42,71,0.08)] lg:max-w-[560px] lg:p-9">
      <h3 className="text-[22px] font-extrabold">
        {content.title}
      </h3>

      <p className="mt-2 text-sm leading-[22px]">
        {content.subtitle}
      </p>

      <form
        onSubmit={(event) =>
          void handleSubmit(
            onSubmit,
          )(event)
        }
        noValidate
        className="mt-5"
      >
        {/* Honeypot */}
        <div
          aria-hidden
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register(
              "website",
            )}
          />
        </div>

        {/* ------------------------------------------------------ name */}

        <label
          htmlFor="name"
          className={labelClass}
        >
          {content.nameLabel} *
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          placeholder={
            content.namePlaceholder
          }
          aria-invalid={
            !!errors.name
          }
          aria-describedby={
            errors.name
              ? "name-error"
              : undefined
          }
          className={cn(
            inputClass,
            "mt-2",
            errors.name &&
              "border-red-500",
          )}
          {...register("name")}
        />

        <FieldError
          id="name-error"
          message={
            errors.name?.message
          }
        />

        {/* ----------------------------------------------------- email */}

        <label
          htmlFor="email"
          className={labelClass}
        >
          {content.emailLabel} *
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          maxLength={LIMITS.email}
          placeholder={
            content.emailPlaceholder
          }
          aria-invalid={
            !!errors.email
          }
          aria-describedby={
            errors.email
              ? "email-error"
              : undefined
          }
          className={cn(
            inputClass,
            "mt-2",
            errors.email &&
              "border-red-500",
          )}
          {...register("email")}
        />

        <FieldError
          id="email-error"
          message={
            errors.email?.message
          }
        />

        {/* --------------------------------------------------- company */}

        <label
          htmlFor="company"
          className={labelClass}
        >
          {content.companyLabel} *
        </label>

        <input
          id="company"
          type="text"
          autoComplete="organization"
          maxLength={
            LIMITS.company
          }
          placeholder={
            content.companyPlaceholder
          }
          aria-invalid={
            !!errors.company
          }
          aria-describedby={
            errors.company
              ? "company-error"
              : undefined
          }
          className={cn(
            inputClass,
            "mt-2",
            errors.company &&
              "border-red-500",
          )}
          {...register(
            "company",
          )}
        />

        <FieldError
          id="company-error"
          message={
            errors.company
              ?.message
          }
        />

        {/* ----------------------------------------------------- phone */}

        <label
          htmlFor="phone"
          className={labelClass}
        >
          {content.phoneLabel}{" "}
          <span className="text-muted font-normal">
            ({content.optional})
          </span>
        </label>

        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          maxLength={LIMITS.phone}
          placeholder={
            content.phonePlaceholder
          }
          className={cn(
            inputClass,
            "mt-2",
          )}
          {...register("phone")}
        />

        {/* ------------------------------------------------ date / time */}

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label
              htmlFor="date"
              className={
                labelClass
              }
            >
              {content.dateLabel} *
            </label>

            <input
              id="date"
              type="date"

              /**
               * Prevent selecting
               * yesterday/past dates.
               */
              min={
                getBerlinToday()
              }

              aria-invalid={
                !!errors.date
              }

              aria-describedby={
                errors.date
                  ? "date-error"
                  : undefined
              }

              className={cn(
                inputClass,
                "mt-2",
                errors.date &&
                  "border-red-500",
              )}

              {...register(
                "date",
              )}
            />

            <FieldError
              id="date-error"
              message={
                errors.date
                  ?.message
              }
            />
          </div>

          <div className="flex-1">
            <label
              htmlFor="time"
              className={
                labelClass
              }
            >
              {content.timeLabel} *
            </label>

            <select
              id="time"
              defaultValue=""

              /**
               * Time cannot be selected
               * until we know which
               * date the visitor wants.
               */
              disabled={
                !selectedDate ||
                loadingSlots ||
                !!availabilityError ||
                availableSlots.length ===
                  0
              }

              aria-invalid={
                !!errors.time
              }

              aria-describedby={
                errors.time
                  ? "time-error"
                  : undefined
              }

              className={cn(
                inputClass,
                "mt-2 bg-white",

                errors.time &&
                  "border-red-500",

                (!selectedDate ||
                  loadingSlots) &&
                  "cursor-not-allowed opacity-60",
              )}

              {...register(
                "time",
              )}
            >
              <option
                value=""
                disabled
              >
                {!selectedDate
                  ? locale ===
                    "de"
                    ? "Bitte zuerst Datum wählen"
                    : "Select a date first"

                  : loadingSlots
                    ? locale ===
                      "de"
                      ? "Verfügbarkeit wird geladen..."
                      : "Loading availability..."

                    : availableSlots.length ===
                        0
                      ? locale ===
                        "de"
                        ? "Keine Termine verfügbar"
                        : "No available times"

                      : content.timePlaceholder}
              </option>

              {availableSlots.map(
                (slot) => (
                  <option
                    key={slot}
                    value={slot}
                  >
                    {slot}
                  </option>
                ),
              )}
            </select>

            {availabilityError && (
              <p
                role="alert"
                className="mt-1.5 text-[13px] text-red-600"
              >
                {
                  availabilityError
                }
              </p>
            )}

            <FieldError
              id="time-error"
              message={
                errors.time
                  ?.message
              }
            />
          </div>
        </div>

        {/* -------------------------------------------------- programs */}

        <label
          htmlFor="programs"
          className={labelClass}
        >
          {content.programsLabel}{" "}
          <span className="text-muted font-normal">
            ({content.optional})
          </span>
        </label>

        <select
          id="programs"
          defaultValue=""
          className={cn(
            inputClass,
            "mt-2 bg-white",
          )}
          {...register(
            "programs",
          )}
        >
          <option value="">
            {
              content.programsPlaceholder
            }
          </option>

          {PROGRAM_COUNTS.map(
            (count) => (
              <option
                key={count}
                value={count}
              >
                {count}
              </option>
            ),
          )}
        </select>

        {/* --------------------------------------------------- message */}

        <label
          htmlFor="message"
          className={labelClass}
        >
          {content.messageLabel}{" "}
          <span className="text-muted font-normal">
            ({content.optional})
          </span>
        </label>

        <textarea
          id="message"
          rows={3}
          maxLength={
            LIMITS.message
          }
          placeholder={
            content.messagePlaceholder
          }
          className={cn(
            inputClass,
            "mt-2 h-auto py-3 leading-6",
          )}
          {...register(
            "message",
          )}
        />

        {/* --------------------------------------------------- privacy */}

        <div className="mt-6 flex gap-3">
          <input
            id="privacy"
            type="checkbox"
            aria-invalid={
              !!errors.privacy
            }
            aria-describedby={
              errors.privacy
                ? "privacy-error"
                : undefined
            }
            className="border-line accent-blue mt-0.5 size-4 shrink-0 rounded border"
            {...register(
              "privacy",
            )}
          />

          <label
            htmlFor="privacy"
            className="text-ink text-[13px] leading-5"
          >
            {
              content.privacyLabel
            }{" "}

            <Link
              href={
                content.privacyHref
              }
              className="text-blue font-semibold hover:underline"
            >
              {
                content.privacyLinkLabel
              }
            </Link>{" "}
            *
          </label>
        </div>

        <FieldError
          id="privacy-error"
          message={
            errors.privacy
              ?.message
          }
        />

        {/* ------------------------------------------------ submit error */}

        {submitError && (
          <div
            role="alert"
            className="mt-5 flex gap-2.5 rounded-[10px] border border-red-200 bg-red-50 p-3.5"
          >
            <AlertCircle
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-red-600"
            />

            <p className="text-[13px] leading-5 text-red-700">
              {submitError}
            </p>
          </div>
        )}

        {/* ------------------------------------------------------ submit */}

        <Button
          type="submit"
          full
          disabled={
            isSubmitting ||
            loadingSlots
          }
          className="mt-6"
        >
          {isSubmitting
            ? content.submitting
            : content.submit}
        </Button>
      </form>

      <p className="text-muted mt-4 text-center text-xs leading-[19px]">
        {content.note}
      </p>
    </Card>
  );
}
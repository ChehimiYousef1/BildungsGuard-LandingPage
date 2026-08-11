"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { demoRequestSchema, type DemoRequest } from "@/lib/validation/demo-request";
import type { DemoContent } from "@/types/content";
import { cn } from "@/lib/utils";

const inputClass =
  "border-line h-11 w-full rounded-[10px] border px-4 text-[15px] text-ink placeholder:text-muted focus:border-blue focus:outline-none";

export function DemoRequestForm({ content }: { content: DemoContent["form"] }) {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequest>({ resolver: zodResolver(demoRequestSchema) });

  /**
   * No backend yet. When the API route exists, replace the body of this
   * function with a POST — nothing else in the component changes.
   */
  const onSubmit = async (values: DemoRequest) => {
    console.info("demo request", values);
    setSent(true);
  };

  if (sent) {
    return (
      <Card className="flex min-h-[420px] flex-col items-center justify-center p-9 text-center">
        <CheckCircle2 aria-hidden className="text-success size-10" />
        <p className="text-navy mt-5 max-w-[360px] text-lg font-bold">{content.success}</p>
      </Card>
    );
  }

  return (
    <Card className="w-full p-8 shadow-[0_18px_50px_rgba(15,42,71,0.08)] lg:max-w-[560px] lg:p-9">
      <h3 className="text-[22px] font-extrabold">{content.title}</h3>
      <p className="mt-2 text-sm leading-[22px]">{content.subtitle}</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5">
        <label htmlFor="name" className="text-ink mt-5 block text-[13px] font-bold">
          {content.nameLabel} *
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder={content.namePlaceholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={cn(inputClass, "mt-2", errors.name && "border-red-500")}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-[13px] text-red-600">
            {errors.name.message}
          </p>
        )}

        <label htmlFor="email" className="text-ink mt-5 block text-[13px] font-bold">
          {content.emailLabel} *
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={content.emailPlaceholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={cn(inputClass, "mt-2", errors.email && "border-red-500")}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-[13px] text-red-600">
            {errors.email.message}
          </p>
        )}

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="date" className="text-ink mt-5 block text-[13px] font-bold">
              {content.dateLabel} *
            </label>
            <input
              id="date"
              type="date"
              aria-invalid={!!errors.date}
              className={cn(inputClass, "mt-2", errors.date && "border-red-500")}
              {...register("date")}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="time" className="text-ink mt-5 block text-[13px] font-bold">
              {content.timeLabel} *
            </label>
            <select
              id="time"
              defaultValue=""
              aria-invalid={!!errors.time}
              className={cn(inputClass, "mt-2 bg-white", errors.time && "border-red-500")}
              {...register("time")}
            >
              <option value="" disabled>
                {content.timePlaceholder}
              </option>
              {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button type="submit" full disabled={isSubmitting} className="mt-7">
          {content.submit}
        </Button>
      </form>

      <p className="text-muted mt-4 text-center text-xs leading-[19px]">{content.note}</p>
    </Card>
  );
}

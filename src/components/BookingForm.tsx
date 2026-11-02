"use client";

import { useActionState, useState } from "react";
import { createBooking } from "@/app/actions";
import { Field, Honeypot, StatusMessage, inputClass, submitClass } from "@/components/Field";
import { formatDate, initialState } from "@/lib/form";
import { tours } from "@/data/tours";

export default function BookingForm({
  defaultTour,
  defaultDate,
}: {
  defaultTour?: string;
  defaultDate?: string;
}) {
  const [state, action, pending] = useActionState(createBooking, initialState);
  const [slug, setSlug] = useState(
    tours.some((t) => t.slug === defaultTour) ? (defaultTour as string) : tours[0].slug,
  );
  const tour = tours.find((t) => t.slug === slug)!;
  const e = state.errors ?? {};

  if (state.ok) return <StatusMessage state={state} />;

  return (
    <form action={action} className="relative space-y-4">
      <Honeypot />
      <Field label="Tour" error={e.tour}>
        <select
          name="tour"
          value={slug}
          onChange={(ev) => setSlug(ev.target.value)}
          className={inputClass}
        >
          {tours.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Departure date" error={e.date}>
        <select name="date" defaultValue={defaultDate} required className={inputClass} key={slug}>
          <option value="">Select a departure</option>
          {tour.departures.map((d) => (
            <option key={d} value={d}>
              {formatDate(d)}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Full name" error={e.name}>
        <input name="name" required maxLength={100} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" error={e.email}>
          <input name="email" type="email" required maxLength={150} className={inputClass} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" maxLength={40} className={inputClass} />
        </Field>
      </div>
      <Field label="Guests" error={e.guests}>
        <input name="guests" type="number" min={1} max={50} defaultValue={2} required className={inputClass} />
      </Field>
      <Field label="Notes (optional)">
        <textarea name="notes" rows={3} maxLength={1000} className={inputClass} />
      </Field>

      <StatusMessage state={state} />
      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Sending..." : "Request booking"}
      </button>
    </form>
  );
}

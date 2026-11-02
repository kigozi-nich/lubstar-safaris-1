"use client";

import { useActionState } from "react";
import { submitReview } from "@/app/actions";
import { Field, Honeypot, StatusMessage, inputClass, submitClass } from "@/components/Field";
import { initialState } from "@/lib/form";
import { tours } from "@/data/tours";

export default function ReviewForm() {
  const [state, action, pending] = useActionState(submitReview, initialState);
  const e = state.errors ?? {};

  if (state.ok) return <StatusMessage state={state} />;

  return (
    <form action={action} className="relative space-y-4">
      <Honeypot />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={e.name}>
          <input name="name" required maxLength={100} className={inputClass} />
        </Field>
        <Field label="Country (optional)">
          <input name="country" maxLength={80} className={inputClass} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tour (optional)" error={e.tour}>
          <select name="tour" defaultValue="" className={inputClass}>
            <option value="">General</option>
            {tours.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Rating" error={e.rating}>
          <select name="rating" defaultValue="5" className={inputClass}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Your review" error={e.comment}>
        <textarea name="comment" rows={5} required maxLength={2000} className={inputClass} />
      </Field>
      <StatusMessage state={state} />
      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Sending..." : "Submit review"}
      </button>
    </form>
  );
}

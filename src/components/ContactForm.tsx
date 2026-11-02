"use client";

import { useActionState } from "react";
import { createInquiry } from "@/app/actions";
import { Field, Honeypot, StatusMessage, inputClass, submitClass } from "@/components/Field";
import { initialState } from "@/lib/form";

export default function ContactForm({
  kind = "general",
  placeholder,
}: {
  kind?: "general" | "custom";
  placeholder?: string;
}) {
  const [state, action, pending] = useActionState(createInquiry, initialState);
  const e = state.errors ?? {};

  if (state.ok) return <StatusMessage state={state} />;

  return (
    <form action={action} className="relative space-y-4">
      <Honeypot />
      <input type="hidden" name="kind" value={kind} />
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
      <Field label="Message" error={e.message}>
        <textarea
          name="message"
          rows={6}
          required
          maxLength={3000}
          placeholder={placeholder}
          className={inputClass}
        />
      </Field>
      <StatusMessage state={state} />
      <button type="submit" disabled={pending} className={submitClass}>
        {pending ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}

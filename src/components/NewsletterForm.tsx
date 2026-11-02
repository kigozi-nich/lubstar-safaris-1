"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/actions";
import { Honeypot } from "@/components/Field";
import { initialState } from "@/lib/form";

export default function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initialState);

  if (state.ok) return <p role="status" className="text-sm text-green-400">{state.message}</p>;

  return (
    <form action={action} className="relative">
      <Honeypot />
      <div className="flex">
        <input
          name="email"
          type="email"
          required
          maxLength={150}
          placeholder="Your email"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-stone-800 px-3 py-2.5 text-white placeholder:text-stone-500"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-700 px-4 text-xs uppercase tracking-widest text-white hover:bg-amber-800 disabled:opacity-60"
        >
          Subscribe
        </button>
      </div>
      {state.errors?.email && <p className="mt-1 text-xs text-red-400">{state.errors.email}</p>}
    </form>
  );
}

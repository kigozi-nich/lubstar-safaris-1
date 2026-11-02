import type { ReactNode } from "react";
import type { FormState } from "@/lib/form";

export const inputClass =
  "mt-1 w-full border border-stone-300 bg-white px-3 py-2.5 text-stone-900 focus:border-amber-700 focus:outline-none";

export const submitClass =
  "bg-amber-700 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-amber-800 disabled:opacity-60";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-stone-800">
      {label}
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}

// Honeypot input hidden from people; bots tend to fill it.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function StatusMessage({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={`p-4 text-sm ${state.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
    >
      {state.message}
    </p>
  );
}

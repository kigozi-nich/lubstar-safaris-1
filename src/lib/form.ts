export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

export const initialState: FormState = { ok: false, message: "" };

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

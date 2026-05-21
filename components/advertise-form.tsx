"use client";

import { FormEvent, useState } from "react";

import type { LocaleContent } from "@/lib/site-content";

type AdvertiseFormProps = {
  content: LocaleContent;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  brand_or_product: string;
  budget_or_scope: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  brand_or_product: "",
  budget_or_scope: "",
  message: ""
};

export function AdvertiseForm({ content }: AdvertiseFormProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          locale: content.locale
        })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setForm(initialFormState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label={content.form.name}
          value={form.name}
          onChange={(value) => setForm((current) => ({ ...current, name: value }))}
        />
        <Field
          label={content.form.email}
          type="email"
          value={form.email}
          onChange={(value) => setForm((current) => ({ ...current, email: value }))}
        />
        <Field
          label={content.form.company}
          value={form.company}
          onChange={(value) => setForm((current) => ({ ...current, company: value }))}
        />
        <Field
          label={content.form.product}
          value={form.brand_or_product}
          onChange={(value) => setForm((current) => ({ ...current, brand_or_product: value }))}
        />
      </div>

      <Field
        label={content.form.budget}
        required={false}
        value={form.budget_or_scope}
        onChange={(value) => setForm((current) => ({ ...current, budget_or_scope: value }))}
      />

      <label className="block space-y-3">
        <span className="text-sm uppercase tracking-[0.2em] text-white/62">{content.form.message}</span>
        <textarea
          required
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="min-h-40 w-full rounded-[1.5rem] border border-white/10 bg-black/25 px-5 py-4 text-sm text-mist outline-none transition placeholder:text-white/28 focus:border-accent/60"
        />
      </label>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-[#efffae] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? content.form.sending : content.form.submit}
        </button>

        <div className="text-sm text-white/72">
          {status === "success" && <p className="text-accent">{content.form.success}</p>}
          {status === "error" && <p className="text-coral">{content.form.error}</p>}
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
};

function Field({ label, value, onChange, type = "text", required = true }: FieldProps) {
  return (
    <label className="block space-y-3">
      <span className="text-sm uppercase tracking-[0.2em] text-white/62">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[1.5rem] border border-white/10 bg-black/25 px-5 py-4 text-sm text-mist outline-none transition placeholder:text-white/28 focus:border-accent/60"
      />
    </label>
  );
}

"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  formatDetailSpec,
  formatGBP,
  useDetailSpec,
  type DetailSpec,
} from "./detail-spec";
import { ArrowIcon } from "./ui";
import {
  isEnquirySubmissionConfigured,
  submitEnquiry,
  type EnquiryPayload,
} from "@/lib/submit-enquiry";

type FieldName = "name" | "email" | "phone" | "vehicle";
type TextField = FieldName | "message";
type ContactMethod = "email" | "phone";

type Values = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  contactMethod: ContactMethod;
  message: string;
};

type FieldErrors = Partial<Record<FieldName, string>>;

type Notice = {
  tone: "success" | "error" | "info";
  message: ReactNode;
};

const EMPTY_VALUES: Values = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  contactMethod: "email",
  message: "",
};

const FIELD_ORDER: FieldName[] = ["name", "email", "phone", "vehicle"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NOTICE_HEADING: Record<Notice["tone"], string> = {
  success: "Enquiry sent",
  error: "Enquiry not sent",
  info: "Preview mode",
};

const NOTICE_TONE_CLASS: Record<Notice["tone"], string> = {
  success: "border-accent/50 bg-accent/5",
  error: "border-red-400/50 bg-red-400/5",
  info: "border-line bg-surface",
};

const NOTICE_HEADING_CLASS: Record<Notice["tone"], string> = {
  success: "text-accent",
  error: "text-red-400",
  info: "text-accent",
};

function validateField(field: FieldName, values: Values): string | undefined {
  const value = values[field].trim();
  switch (field) {
    case "name":
      return value ? undefined : "Please tell us your name.";
    case "email":
      if (!value) return "Please add your email address.";
      return EMAIL_PATTERN.test(value)
        ? undefined
        : "That email address doesn\u2019t look quite right.";
    case "vehicle":
      return value
        ? undefined
        : "Please tell us your vehicle\u2019s make and model.";
    case "phone":
      if (value) return undefined;
      return values.contactMethod === "phone"
        ? "Add a phone number so we can call you \u2014 or choose email instead."
        : undefined;
  }
}

/** Re-check only the fields that already carry an error, so typing clears them. */
function refreshErrors(
  currentValues: Values,
  previousErrors: FieldErrors,
): FieldErrors {
  const next: FieldErrors = { ...previousErrors };
  for (const field of Object.keys(previousErrors) as FieldName[]) {
    const message = validateField(field, currentValues);
    if (message) {
      next[field] = message;
    } else {
      delete next[field];
    }
  }
  return next;
}

function inputClasses(invalid: boolean): string {
  return `mt-3 w-full border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-foreground/30 hover:border-foreground/30 focus:border-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
    invalid ? "border-red-400/70" : "border-line"
  }`;
}

function FieldBlock({
  id,
  label,
  hint,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label flex items-baseline gap-2 text-muted">
        {label}
        {optional ? (
          <span className="text-[0.6875rem] normal-case tracking-normal text-foreground/40">
            (optional)
          </span>
        ) : (
          <span aria-hidden="true" className="text-accent">
            *
          </span>
        )}
      </label>
      {hint && (
        <p
          id={`${id}-hint`}
          className="mt-2 text-sm leading-relaxed text-foreground/55"
        >
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function SpecificationSummary({ spec }: { spec: DetailSpec }) {
  return (
    <div>
      <div className="border border-line bg-surface">
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
          <p className="label text-muted">
            <span className="text-accent">C</span>
            <span aria-hidden="true"> — </span>
            Your specification
          </p>
          <p className="label text-foreground">{spec.vehicleLabel}</p>
        </div>
        <ul className="min-h-24 px-6 py-3 md:px-8">
          {spec.services.length === 0 ? (
            <li className="py-3 text-muted">No services selected yet.</li>
          ) : (
            spec.services.map((service) => (
              <li
                key={service.id}
                className="flex items-baseline justify-between gap-4 border-b border-line/60 py-3.5 last:border-b-0"
              >
                <span className="text-foreground/85">{service.label}</span>
                <span className="font-mono text-[0.9375rem] tabular-nums">
                  {formatGBP(service.price)}
                </span>
              </li>
            ))
          )}
        </ul>
        <div className="flex items-baseline justify-between gap-4 border-t border-line px-6 py-5 md:px-8">
          <p className="label text-muted">Indicative from</p>
          <p className="font-mono text-lg tabular-nums">
            {formatGBP(spec.total)}
            <span className="text-accent">.</span>
          </p>
        </div>
      </div>
      <p className="label mt-4 flex flex-wrap items-center gap-3 text-muted">
        Sent with your enquiry
        <span aria-hidden="true" className="h-px w-4 bg-line" />
        <a href="#build" className="transition-colors hover:text-accent">
          Adjust in the configurator
        </a>
      </p>
    </div>
  );
}

export function EnquiryForm() {
  const { spec, clearSpec } = useDetailSpec();
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState<Notice | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);

  const configured = isEnquirySubmissionConfigured();

  // When the configurator hands a specification over, scroll to the booking
  // form and move focus onto it.
  const requestedAt = spec?.requestedAt ?? null;
  useEffect(() => {
    if (requestedAt === null) return;
    formRef.current?.focus({ preventScroll: true });
    wrapperRef.current?.scrollIntoView();
  }, [requestedAt]);

  // Keep submission outcomes announced and in view.
  useEffect(() => {
    if (notice) noticeRef.current?.focus();
  }, [notice]);

  const updateText = (field: TextField, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setErrors((previous) => refreshErrors(nextValues, previous));
  };

  const setContactMethod = (contactMethod: ContactMethod) => {
    const nextValues = { ...values, contactMethod };
    setValues(nextValues);
    setErrors((previous) => refreshErrors(nextValues, previous));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Guard against duplicate submissions while one is in flight.
    if (submitting) return;

    const nextErrors: FieldErrors = {};
    for (const field of FIELD_ORDER) {
      const message = validateField(field, values);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setNotice(null);
      document.getElementById(`enquiry-${firstInvalid}`)?.focus();
      return;
    }

    setSubmitting(true);
    setNotice(null);

    const payload: EnquiryPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      vehicle: values.vehicle.trim(),
      contactMethod: values.contactMethod === "email" ? "Email" : "Phone",
      message: values.message.trim(),
      specification: spec
        ? formatDetailSpec(spec)
        : "No configurator specification attached \u2014 general enquiry.",
    };

    const result = await submitEnquiry(payload);
    setSubmitting(false);

    if (result.outcome === "sent") {
      const firstName = payload.name.split(/\s+/)[0];
      const specSummary = spec
        ? ` We\u2019ve noted your ${spec.vehicleLabel} specification \u2014 ${spec.services.length} ${
            spec.services.length === 1 ? "service" : "services"
          }, indicative from ${formatGBP(spec.total)}.`
        : "";
      // Clear the form only once the enquiry is confirmed sent.
      setValues(EMPTY_VALUES);
      setErrors({});
      clearSpec();
      setNotice({
        tone: "success",
        message: `Thank you${
          firstName ? `, ${firstName}` : ""
        } \u2014 your enquiry is with the studio and we reply within one working day.${specSummary}`,
      });
      return;
    }

    if (result.outcome === "failed") {
      setNotice({
        tone: "error",
        message: (
          <>
            Something went wrong and your enquiry hasn&rsquo;t been sent &mdash;
            your details are still in the form. Try again, or call{" "}
            <a
              href="tel:+442079460321"
              className="text-accent underline-offset-4 hover:underline"
            >
              +44 (0)20 7946 0321
            </a>
            {result.status ? ` (error ${result.status}).` : "."}
          </>
        ),
      });
      return;
    }

    setNotice({
      tone: "info",
      message: (
        <>
          Online submission isn&rsquo;t connected in this preview, so your
          enquiry hasn&rsquo;t been sent anywhere. Please call{" "}
          <a
            href="tel:+442079460321"
            className="text-accent underline-offset-4 hover:underline"
          >
            +44 (0)20 7946 0321
          </a>{" "}
          and we&rsquo;ll take care of it.
        </>
      ),
    });
  };

  return (
    <div id="enquiry" ref={wrapperRef} className="scroll-mt-24">
      {spec && <SpecificationSummary spec={spec} />}

      <h3
        id="enquiry-form-title"
        className={`label flex w-full items-center gap-3 border-b border-line pb-4 text-muted ${
          spec ? "mt-12" : "mt-0"
        }`}
      >
        <span className="text-accent">D</span>
        <span aria-hidden="true" className="h-px w-6 bg-line" />
        <span>Your details</span>
      </h3>

      <form
        ref={formRef}
        id="enquiry-form"
        aria-labelledby="enquiry-form-title"
        aria-busy={submitting}
        tabIndex={-1}
        noValidate
        onSubmit={handleSubmit}
        className="mt-10 outline-none"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <FieldBlock id="enquiry-name" label="Name" error={errors.name}>
            <input
              id="enquiry-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
              value={values.name}
              onChange={(event) => updateText("name", event.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "enquiry-name-error" : undefined}
              className={inputClasses(Boolean(errors.name))}
            />
          </FieldBlock>

          <FieldBlock id="enquiry-email" label="Email" error={errors.email}>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={values.email}
              onChange={(event) => updateText("email", event.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={
                errors.email ? "enquiry-email-error" : undefined
              }
              className={inputClasses(Boolean(errors.email))}
            />
          </FieldBlock>

          <FieldBlock id="enquiry-phone" label="Phone" optional error={errors.phone}>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="07xxx xxxxxx"
              value={values.phone}
              onChange={(event) => updateText("phone", event.target.value)}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
              className={inputClasses(Boolean(errors.phone))}
            />
          </FieldBlock>

          <FieldBlock
            id="enquiry-vehicle"
            label="Vehicle make / model"
            error={errors.vehicle}
          >
            <input
              id="enquiry-vehicle"
              name="vehicle"
              type="text"
              placeholder="e.g. Porsche 911 GT3"
              required
              value={values.vehicle}
              onChange={(event) => updateText("vehicle", event.target.value)}
              aria-invalid={errors.vehicle ? true : undefined}
              aria-describedby={
                errors.vehicle ? "enquiry-vehicle-error" : undefined
              }
              className={inputClasses(Boolean(errors.vehicle))}
            />
          </FieldBlock>
        </div>

        <fieldset className="mt-10">
          <legend className="label text-muted">Preferred contact method</legend>
          <div className="mt-4 grid max-w-sm grid-cols-2 gap-px border border-line bg-line">
            {(["email", "phone"] as const).map((method) => {
              const active = values.contactMethod === method;
              return (
                <label
                  key={method}
                  className={`relative flex cursor-pointer items-center justify-between gap-3 px-5 py-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-accent ${
                    active
                      ? "bg-foreground text-background"
                      : "bg-background hover:bg-surface"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={active}
                    onChange={() => setContactMethod(method)}
                    className="sr-only"
                  />
                  <span className="text-lg font-medium">
                    {method === "email" ? "Email" : "Phone"}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 transition-colors ${
                      active
                        ? "bg-accent outline outline-background"
                        : "bg-foreground/20"
                    }`}
                  />
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-10">
          <FieldBlock
            id="enquiry-message"
            label="Message"
            optional
            hint="Dates, paint condition, or anything else we should know."
          >
            <textarea
              id="enquiry-message"
              name="message"
              rows={5}
              placeholder={"Tell us about your car and what you have in mind\u2026"}
              value={values.message}
              onChange={(event) => updateText("message", event.target.value)}
              aria-describedby="enquiry-message-hint"
              className={`${inputClasses(false)} resize-y`}
            />
          </FieldBlock>
        </div>

        {notice && (
          <div
            ref={noticeRef}
            tabIndex={-1}
            role={notice.tone === "error" ? "alert" : "status"}
            className={`mt-10 border px-5 py-4 md:px-6 md:py-5 ${NOTICE_TONE_CLASS[notice.tone]}`}
          >
            <p className={`label ${NOTICE_HEADING_CLASS[notice.tone]}`}>
              {NOTICE_HEADING[notice.tone]}
            </p>
            <p className="mt-2 text-foreground/85">{notice.message}</p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex w-full items-center justify-between gap-6 bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
          >
            {submitting ? "Sending\u2026" : "Send enquiry"}
            {submitting ? (
              <span
                aria-hidden="true"
                className="size-4 animate-spin border-2 border-current border-t-transparent"
              />
            ) : (
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>
          <p className="max-w-xs text-sm leading-relaxed text-foreground/55">
            We only use your details to reply to this enquiry &mdash; nothing
            else.
          </p>
        </div>

        {!configured && (
          <p className="label mt-6 text-muted">
            Preview mode &mdash; online submission is not configured yet.
          </p>
        )}
      </form>
    </div>
  );
}

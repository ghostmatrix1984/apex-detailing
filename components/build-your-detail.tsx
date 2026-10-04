"use client";

import { useState } from "react";
import { useDetailSpec } from "./detail-spec";
import { ArrowIcon, SectionLabel } from "./ui";

const VEHICLES = [
  { id: "compact", label: "Compact", example: "Hatch / Coupé", factor: 1 },
  { id: "saloon", label: "Saloon", example: "Saloon / Estate", factor: 1.15 },
  { id: "suv", label: "SUV", example: "SUV / 4x4", factor: 1.35 },
  { id: "exotic", label: "Exotic", example: "Supercar / GT", factor: 1.6 },
] as const;

const PACKAGES = [
  { id: "enhance", label: "Enhancement Polish", note: "Single stage", base: 395 },
  { id: "correct", label: "Paint Correction", note: "Multi-stage", base: 750 },
  { id: "ceramic", label: "Ceramic Coating", note: "5 year system", base: 895 },
  { id: "ppf-front", label: "PPF Front End", note: "Bonnet, wings, bumper, mirrors", base: 1950 },
  { id: "ppf-full", label: "PPF Full Body", note: "Wrapped edges", base: 5400 },
  { id: "interior", label: "Interior Detail", note: "Leather & Alcantara", base: 285 },
] as const;

type VehicleId = (typeof VEHICLES)[number]["id"];
type PackageId = (typeof PACKAGES)[number]["id"];

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const roundTo5 = (n: number) => Math.round(n / 5) * 5;

function StepLegend({ letter, children }: { letter: string; children: string }) {
  return (
    <legend className="label flex w-full items-center gap-3 border-b border-line pb-4 text-muted">
      <span className="text-accent">{letter}</span>
      <span aria-hidden="true" className="h-px w-6 bg-line" />
      <span>{children}</span>
    </legend>
  );
}

export function BuildYourDetail() {
  const { requestDetail } = useDetailSpec();
  const [vehicle, setVehicle] = useState<VehicleId>("saloon");
  const [selected, setSelected] = useState<PackageId[]>(["correct", "ceramic"]);

  const activeVehicle = VEHICLES.find((v) => v.id === vehicle)!;
  const lines = PACKAGES.filter((p) => selected.includes(p.id)).map((p) => ({
    ...p,
    price: roundTo5(p.base * activeVehicle.factor),
  }));
  const total = lines.reduce((sum, l) => sum + l.price, 0);

  const toggle = (id: PackageId) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  // Hand the specification to the booking section and let it pull the visitor
  // through to the enquiry form.
  const handleRequestDetail = () =>
    requestDetail({
      vehicleId: activeVehicle.id,
      vehicleLabel: activeVehicle.label,
      services: lines.map(({ id, label, price }) => ({ id, label, price })),
      total,
    });

  return (
    <section
      id="build"
      aria-labelledby="build-title"
      className="scroll-mt-20 py-20 md:py-32"
    >
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="03">Build your detail</SectionLabel>
            <h2
              id="build-title"
              className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)] max-[24.5rem]:text-[calc(12.2vw_-_8px)]"
            >
              Spec it
              <br />
              like a car<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-foreground/75 md:col-span-5 md:justify-self-end md:pb-2">
            Choose your vehicle and the work you want. We&apos;ll confirm the
            final specification after an in-person paint inspection.
          </p>
        </div>

        <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-14 lg:col-span-7">
            <fieldset>
              <StepLegend letter="A">Vehicle class</StepLegend>
              <div className="mt-6 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
                {VEHICLES.map((v) => {
                  const active = v.id === vehicle;
                  return (
                    <label
                      key={v.id}
                      className={`relative flex cursor-pointer flex-col justify-between gap-8 p-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-accent md:p-6 ${
                        active
                          ? "bg-foreground text-background"
                          : "bg-background hover:bg-surface"
                      }`}
                    >
                      <input
                        type="radio"
                        name="vehicle"
                        value={v.id}
                        checked={active}
                        onChange={() => setVehicle(v.id)}
                        className="sr-only"
                      />
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-display text-[clamp(1.375rem,2vw,1.75rem)]">
                          {v.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`mt-1 size-2 shrink-0 transition-colors ${
                            active ? "bg-accent outline outline-background" : "bg-foreground/20"
                          }`}
                        />
                      </span>
                      <span
                        className={`label ${active ? "text-background/70" : "text-muted"}`}
                      >
                        {v.example}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <StepLegend letter="B">Services</StepLegend>
              <ul>
                {PACKAGES.map((p) => {
                  const active = selected.includes(p.id);
                  return (
                    <li key={p.id} className="border-b border-line">
                      <label className="group flex cursor-pointer items-center gap-5 py-5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent md:py-6">
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggle(p.id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex size-5 shrink-0 items-center justify-center border transition-colors ${
                            active
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-foreground/30 group-hover:border-foreground"
                          }`}
                        >
                          {active && (
                            <svg viewBox="0 0 12 12" className="size-3" fill="none">
                              <path
                                d="m2 6 2.5 2.5L10 3"
                                stroke="currentColor"
                                strokeWidth="1.75"
                              />
                            </svg>
                          )}
                        </span>
                        <span className="flex flex-1 items-baseline justify-between gap-4">
                          <span className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:gap-4">
                            <span
                              className={`text-lg font-medium transition-colors md:text-xl ${
                                active ? "text-foreground" : "text-foreground/80"
                              }`}
                            >
                              {p.label}
                            </span>
                            <span className="label text-muted">{p.note}</span>
                          </span>
                          <span
                            className={`shrink-0 font-mono text-[0.9375rem] tabular-nums transition-colors ${
                              active ? "text-foreground" : "text-foreground/60"
                            }`}
                          >
                            {gbp.format(roundTo5(p.base * activeVehicle.factor))}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>

          <aside
            aria-label="Your detail summary"
            className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9"
          >
            <div className="border border-line bg-surface lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
                <p className="label text-muted">
                  <span className="text-accent">C</span>
                  <span aria-hidden="true"> — </span>
                  Your specification
                </p>
                <p className="label text-foreground">{activeVehicle.label}</p>
              </div>

              <ul className="min-h-44 px-6 py-3 md:px-8" aria-live="polite">
                {lines.length === 0 ? (
                  <li className="py-3 text-muted">Select at least one service.</li>
                ) : (
                  lines.map((l) => (
                    <li
                      key={l.id}
                      className="flex items-baseline justify-between gap-4 border-b border-line/60 py-3.5 last:border-b-0"
                    >
                      <span className="text-foreground/85">{l.label}</span>
                      <span className="font-mono text-[0.9375rem] tabular-nums">
                        {gbp.format(l.price)}
                      </span>
                    </li>
                  ))
                )}
              </ul>

              <div className="border-t border-line px-6 pt-6 pb-7 md:px-8">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="label text-muted">Indicative from</p>
                  <p className="label text-muted tabular-nums">
                    {String(lines.length).padStart(2, "0")} items
                  </p>
                </div>
                <p
                  className="font-display mt-4 text-[clamp(3rem,5vw,4.5rem)] tabular-nums"
                  aria-live="polite"
                >
                  {gbp.format(total)}
                  <span className="text-accent">.</span>
                </p>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-foreground/65">
                  Including VAT. Final price confirmed after paint depth and
                  condition assessment.
                </p>
              </div>

              <a
                href="#book"
                onClick={(event) => {
                  event.preventDefault();
                  handleRequestDetail();
                }}
                className="group flex items-center justify-between gap-4 border-t border-line px-6 py-5 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent md:px-8"
              >
                Request this detail
                <span className="flex size-10 items-center justify-center bg-accent text-accent-foreground">
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

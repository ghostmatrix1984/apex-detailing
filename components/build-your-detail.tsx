"use client";

import { useState } from "react";
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

export function BuildYourDetail() {
  const [vehicle, setVehicle] = useState<VehicleId>("saloon");
  const [selected, setSelected] = useState<PackageId[]>(["correct", "ceramic"]);

  const factor = VEHICLES.find((v) => v.id === vehicle)!.factor;
  const lines = PACKAGES.filter((p) => selected.includes(p.id)).map((p) => ({
    ...p,
    price: roundTo5(p.base * factor),
  }));
  const total = lines.reduce((sum, l) => sum + l.price, 0);

  const toggle = (id: PackageId) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  return (
    <section
      id="build"
      aria-labelledby="build-title"
      className="scroll-mt-20 py-24 md:py-36"
    >
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionLabel index="03">Build your detail</SectionLabel>
          <h2
            id="build-title"
            className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)]"
          >
            Spec it
            <br />
            like a car<span className="text-accent">.</span>
          </h2>
          <p className="mt-8 max-w-md text-foreground/70">
            Choose your vehicle and the work you want. We&apos;ll confirm the
            final specification after an in-person paint inspection.
          </p>

          <fieldset className="mt-14">
            <legend className="label flex w-full items-center justify-between border-b border-line pb-4 text-muted">
              <span>
                <span className="text-accent">A</span> — Vehicle class
              </span>
            </legend>
            <div className="mt-6 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
              {VEHICLES.map((v) => {
                const active = v.id === vehicle;
                return (
                  <label
                    key={v.id}
                    className={`relative flex cursor-pointer flex-col gap-6 p-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent ${
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
                    <span className="font-display text-2xl">{v.label}</span>
                    <span
                      className={`label text-[0.6rem] ${active ? "text-background/60" : "text-muted"}`}
                    >
                      {v.example}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-14">
            <legend className="label w-full border-b border-line pb-4 text-muted">
              <span className="text-accent">B</span> — Services
            </legend>
            <ul className="mt-2">
              {PACKAGES.map((p) => {
                const active = selected.includes(p.id);
                return (
                  <li key={p.id} className="border-b border-line">
                    <label className="group flex cursor-pointer items-center gap-5 py-5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent">
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
                      <span className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <span className="text-lg font-medium md:text-xl">
                          {p.label}
                          <span className="label ml-3 hidden text-[0.6rem] text-muted md:inline">
                            {p.note}
                          </span>
                        </span>
                        <span className="font-mono text-sm text-foreground/70">
                          {gbp.format(roundTo5(p.base * factor))}
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
          className="lg:col-span-4 lg:col-start-9"
        >
          <div className="border border-line bg-surface lg:sticky lg:top-28">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="label text-muted">Your specification</p>
              <p className="label text-accent">
                {VEHICLES.find((v) => v.id === vehicle)!.label}
              </p>
            </div>
            <ul className="min-h-40 px-6 py-4" aria-live="polite">
              {lines.length === 0 ? (
                <li className="py-3 text-sm text-muted">
                  Select at least one service.
                </li>
              ) : (
                lines.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-baseline justify-between gap-4 py-3 text-sm"
                  >
                    <span className="text-foreground/80">{l.label}</span>
                    <span className="font-mono">{gbp.format(l.price)}</span>
                  </li>
                ))
              )}
            </ul>
            <div className="border-t border-line px-6 py-6">
              <p className="label text-muted">Indicative from</p>
              <p
                className="font-display mt-3 text-6xl md:text-7xl"
                aria-live="polite"
              >
                {gbp.format(total)}
              </p>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Including VAT. Final price confirmed after paint depth and
                condition assessment.
              </p>
            </div>
            <a
              href="#book"
              className="group flex items-center justify-between bg-accent px-6 py-5 text-sm font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-colors hover:bg-foreground"
            >
              Request this detail
              <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

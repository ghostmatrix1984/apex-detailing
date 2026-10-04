"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionLabel } from "./ui";

const READINGS = [
  { label: "Defect removal", value: "94%" },
  { label: "Clear coat removed", value: "4µm" },
  { label: "Correction stages", value: "3" },
  { label: "Studio hours", value: "26" },
];

export function BeforeAfter() {
  const [position, setPosition] = useState(50);
  const [handleFocused, setHandleFocused] = useState(false);

  return (
    <section
      id="results"
      aria-labelledby="results-title"
      className="scroll-mt-20 border-t border-line bg-surface py-20 md:py-32"
    >
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel index="02">Results</SectionLabel>
            <h2
              id="results-title"
              className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)]"
            >
              Swirls out.
              <br />
              Depth in<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-foreground/75 md:col-span-4 md:justify-self-end md:pb-2">
            Drag across the panel. Same door, same inspection light — before and
            after a three-stage correction on a 2019 gloss-black saloon.
          </p>
        </div>
      </div>

      <div className="mt-14 md:mt-20 md:px-10 xl:px-16 3xl:mx-auto 3xl:max-w-[120rem]">
        <div className="relative aspect-[4/3] w-full select-none overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="/images/after.png"
            alt="After correction: flawless black paint with a crisp mirror reflection"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="/images/before.png"
              alt="Before correction: black paint covered in swirl marks and scratches"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-px bg-accent"
            style={{ left: `${position}%` }}
          >
            <div
              className={`absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-accent text-accent-foreground ${
                handleFocused
                  ? "outline-2 outline-offset-4 outline-foreground"
                  : ""
              }`}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none">
                <path
                  d="M9 6 3 12l6 6M15 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </div>

          <span className="label pointer-events-none absolute top-5 left-5 bg-background/80 px-3 py-2 text-foreground">
            Before
          </span>
          <span className="label pointer-events-none absolute top-5 right-5 flex items-center gap-2 bg-background/80 px-3 py-2 text-foreground">
            <span aria-hidden="true" className="size-1.5 bg-accent" />
            After
          </span>

          <label htmlFor="ba-slider" className="sr-only">
            Before and after comparison position
          </label>
          <input
            id="ba-slider"
            type="range"
            min={0}
            max={100}
            value={position}
            aria-valuetext={`${position}% before, ${100 - position}% after`}
            onChange={(e) => setPosition(Number(e.target.value))}
            onFocus={() => setHandleFocused(true)}
            onBlur={() => setHandleFocused(false)}
            className="absolute inset-0 h-full w-full cursor-ew-resize touch-pan-y opacity-0"
          />
        </div>
      </div>

      <div className="container-x">
        <dl className="mt-10 grid grid-cols-2 gap-y-8 border-t border-line pt-8 md:grid-cols-4">
          {READINGS.map((r) => (
            <div key={r.label}>
              <dt className="label text-muted">{r.label}</dt>
              <dd className="font-display mt-3 text-4xl md:text-5xl">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

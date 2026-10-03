"use client";

import Image from "next/image";
import { useDetailSpec } from "./detail-spec";
import { EnquiryForm } from "./enquiry-form";
import { GhostLink, PrimaryButton } from "./ui";

export function BookingSection() {
  const { spec } = useDetailSpec();

  return (
    <section
      id="book"
      aria-labelledby="book-title"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-line"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/cta.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/70" />
      </div>

      <div className="container-x py-24 md:py-32">
        <div className="flex min-h-[80svh] flex-col justify-between gap-16">
          <p className="label flex items-center gap-3 text-foreground/70">
            <span aria-hidden="true" className="size-1.5 bg-accent" />
            Now booking — limited studio slots each month
          </p>

          <div>
            <h2
              id="book-title"
              className="font-display text-[clamp(3.5rem,13vw,14rem)]"
            >
              Book your
              <br />
              detail<span className="text-accent">.</span>
            </h2>

            <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:items-end">
              <p className="max-w-md text-foreground/75 md:col-span-5">
                Start with a free consultation and paint inspection at the
                studio. We&apos;ll specify the work, agree a price and lock in
                your slot.
              </p>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center md:col-span-7 md:justify-end">
                <a
                  href="tel:+442079460321"
                  className="text-lg font-medium transition-colors hover:text-accent"
                >
                  +44 (0)20 7946 0321
                </a>
                <PrimaryButton href="#enquiry" className="w-full sm:w-auto">
                  Book a consultation
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-14 border-t border-line pt-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          <aside
            aria-label="Studio contact details"
            className="lg:col-span-4 lg:col-start-9"
          >
            <div className="border border-line bg-surface lg:sticky lg:top-28">
              <div className="border-b border-line px-6 py-5 md:px-8">
                <p className="label text-muted">Studio direct</p>
              </div>

              <div className="px-6 py-6 md:px-8">
                <a
                  href="tel:+442079460321"
                  className="text-xl font-medium tracking-tight transition-colors hover:text-accent"
                >
                  +44 (0)20 7946 0321
                </a>
                <dl className="mt-6 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label text-muted">Weekdays</dt>
                    <dd className="label text-foreground/85">08:00 — 18:00</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="label text-muted">Saturday</dt>
                    <dd className="label text-foreground/85">By appointment</dd>
                  </div>
                </dl>
                <p className="mt-6 text-sm leading-relaxed text-foreground/65">
                  Every enquiry gets a reply within one working day.
                </p>
              </div>

              <div className="border-t border-line px-6 py-5 md:px-8">
                {spec ? (
                  <p className="label flex items-start gap-3 text-foreground/80">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 bg-accent"
                    />
                    Specification attached — sent with your enquiry
                  </p>
                ) : (
                  <div className="flex flex-col items-start gap-4">
                    <p className="text-sm leading-relaxed text-foreground/65">
                      Prefer to spec first? Build your detail in the
                      configurator and request it here.
                    </p>
                    <GhostLink href="#build">Build your detail</GhostLink>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

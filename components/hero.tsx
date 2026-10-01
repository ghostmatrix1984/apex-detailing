import Image from "next/image";
import { GhostLink, PrimaryButton } from "./ui";

const STATS = [
  { value: "2,400+", label: "Vehicles finished" },
  { value: "4.9/5", label: "312 verified reviews" },
  { value: "10 yr", label: "Coating warranty" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.png"
          alt="Black supercar under a linear studio light, its mirror-finish paint reflecting sharp highlights"
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
        <p
          className="label animate-rise mb-8 flex items-center gap-3 text-foreground/70"
          style={{ animationDelay: "100ms" }}
        >
          <span aria-hidden="true" className="size-1.5 bg-accent" />
          Paint correction / Ceramic / PPF — London studio
        </p>

        <h1
          id="hero-title"
          className="font-display animate-rise max-w-[14ch] text-[clamp(3.25rem,11vw,12.5rem)] text-balance"
          style={{ animationDelay: "200ms" }}
        >
          Paint,
          <br />
          perfected<span className="text-accent">.</span>
        </h1>

        <div
          className="animate-rise mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end"
          style={{ animationDelay: "400ms" }}
        >
          <p className="max-w-md text-base leading-relaxed text-foreground/75 md:col-span-5 md:text-lg">
            A specialist studio for owners who notice everything. Machine
            correction, ceramic and film protection, delivered by hand — one car
            at a time.
          </p>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center md:col-span-7 md:justify-end">
            <PrimaryButton href="#book" className="w-full sm:w-auto">
              Book Your Detail
            </PrimaryButton>
            <GhostLink href="#services">Explore services</GhostLink>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-3 border-t border-line pt-6 md:mt-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 pr-4">
              <dt className="label order-2 text-[0.6rem] text-muted md:text-[0.6875rem]">
                {stat.label}
              </dt>
              <dd className="order-1 text-xl font-semibold tracking-tight md:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

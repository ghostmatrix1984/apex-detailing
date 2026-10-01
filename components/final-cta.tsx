import Image from "next/image";
import { PrimaryButton } from "./ui";

export function FinalCta() {
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

      <div className="container-x flex min-h-[80svh] flex-col justify-between gap-16 py-24 md:py-32">
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
              <PrimaryButton href="#book" className="w-full sm:w-auto">
                Book a consultation
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

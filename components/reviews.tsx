import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";

const REVIEWS = [
  {
    quote:
      "Collected my M4 and genuinely didn't recognise it. Paint looks deeper than the day it left the factory.",
    name: "James R.",
    car: "BMW M4 Competition",
  },
  {
    quote:
      "Full-body PPF is completely invisible — every edge wrapped. The communication throughout was flawless.",
    name: "Priya S.",
    car: "Porsche Taycan 4S",
  },
  {
    quote:
      "Honest advice on what the paint could take. No upselling, just extraordinary work.",
    name: "Tom W.",
    car: "Audi RS6 Avant",
  },
];

function Stars() {
  return (
    <span className="flex gap-1 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className="size-3" fill="currentColor">
          <path d="M6 0.5 7.6 4.2l4 .3-3 2.6.9 3.9L6 8.9 2.5 11l.9-3.9-3-2.6 4-.3z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="scroll-mt-20 py-24 md:py-36"
    >
      <div className="container-x">
        <SectionLabel index="06">Reputation</SectionLabel>
        <h2 id="reviews-title" className="sr-only">
          Customer reviews
        </h2>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="font-display text-[clamp(6rem,16vw,14rem)]">4.9</p>
            <div className="mt-6 flex items-center gap-4">
              <Stars />
              <span className="label text-muted">312 verified reviews</span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-foreground/60">
              Average rating across Google and independent owners&apos; club
              reviews since 2014.
            </p>
          </div>

          <Reveal className="lg:col-span-8">
            <figure className="border-t border-line pt-8 lg:border-t-0 lg:pt-0">
              <blockquote>
                <p className="text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.1] font-medium tracking-tight text-balance">
                  &ldquo;Three detailers turned the car away. APEX spent four
                  days on it — the result is the best paint I&apos;ve ever seen
                  on a twenty-year-old car.&rdquo;
                </p>
              </blockquote>
              <figcaption className="label mt-8 flex items-center gap-3 text-muted">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Daniel K. — Ferrari 360 Modena
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px bg-line md:mt-28 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li key={r.name} className="bg-background">
              <Reveal delay={i * 100} className="flex h-full flex-col justify-between gap-10 py-8 md:p-8 md:first:pl-0">
                <figure>
                  <Stars />
                  <blockquote className="mt-6">
                    <p className="leading-relaxed text-foreground/85">
                      &ldquo;{r.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-8">
                    <p className="font-medium">{r.name}</p>
                    <p className="label mt-1 text-muted">{r.car}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

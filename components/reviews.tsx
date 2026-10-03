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
      className="scroll-mt-20 py-20 md:py-32"
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
            <p className="mt-6 max-w-xs leading-relaxed text-foreground/70">
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

        <ul className="mt-16 grid border-t border-line md:mt-24 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <li
              key={r.name}
              className="border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <Reveal delay={i * 100} className="flex h-full flex-col">
                <figure className="flex h-full flex-col">
                  <Stars />
                  <blockquote className="mt-6 flex-1">
                    <p className="text-[1.0625rem] leading-relaxed text-pretty text-foreground/85 md:text-lg">
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

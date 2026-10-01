import Image from "next/image";
import { Reveal } from "./reveal";
import { GhostLink, SectionLabel } from "./ui";

function Caption({
  index,
  title,
  spec,
}: {
  index: string;
  title: string;
  spec: string;
}) {
  return (
    <figcaption className="mt-5 flex items-start justify-between gap-6 border-t border-line pt-5">
      <div>
        <p className="text-lg font-medium md:text-xl">{title}</p>
        <p className="label mt-2 text-muted">{spec}</p>
      </div>
      <span className="label text-accent">{index}</span>
    </figcaption>
  );
}

export function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="scroll-mt-20 border-t border-line py-24 md:py-36"
    >
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04">Selected work</SectionLabel>
            <h2
              id="work-title"
              className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)]"
            >
              Recently
              <br />
              <span className="text-muted">in the studio.</span>
            </h2>
          </div>
          <GhostLink href="#work">View full portfolio</GhostLink>
        </div>

        <Reveal className="mt-16 md:mt-24">
          <figure className="group">
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src="/images/work-1.png"
                alt="Satin grey rear-engined sports car in profile under a horizontal studio light"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <Caption
              index="/01"
              title="911 GT3 Touring — Satin Full-Body PPF"
              spec="Stealth film / 5 day install / Ceramic over film"
            />
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <figure className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/work-2.png"
                  alt="Deep green grand tourer from the rear three-quarter with glossy reflections"
                  fill
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <Caption
                index="/02"
                title="DB11 V8 — Stage 3 Correction"
                spec="Racing green / 10 year ceramic"
              />
            </figure>
          </Reveal>

          <div className="flex flex-col justify-between gap-16 md:col-span-6 md:col-start-7">
            <blockquote className="max-w-lg md:pt-16">
              <p className="text-2xl leading-snug font-medium text-balance md:text-3xl">
                &ldquo;We don&apos;t chase volume. Each car gets the time the
                paint actually needs.&rdquo;
              </p>
              <footer className="label mt-6 text-muted">
                Marcus Hale — Founder & Lead Technician
              </footer>
            </blockquote>
            <Reveal>
              <figure className="group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src="/images/work-3.png"
                    alt="White supercar front end raked by a single cool light in a dark studio"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <Caption
                  index="/03"
                  title="720S Spider — Front End PPF + Correction"
                  spec="Gloss film / Wrapped edges"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

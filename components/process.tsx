import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";

const STEPS = [
  {
    title: "Inspect",
    meta: "Day 01",
    body: "Paint depth readings across every panel and a full defect map under calibrated light.",
  },
  {
    title: "Decontaminate",
    meta: "Day 01",
    body: "Snow foam, two-bucket wash, iron fallout and clay treatment to a bare, clean surface.",
  },
  {
    title: "Perfect",
    meta: "Day 02 – 04",
    body: "Machine correction staged to your paint — as much as it needs, never more than it can take.",
  },
  {
    title: "Protect",
    meta: "Final day",
    body: "Coating or film applied and infrared-cured, followed by a final inspection and handover.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-20 border-t border-line bg-surface py-20 md:py-28"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="05">Process</SectionLabel>
            <h2
              id="process-title"
              className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)] max-[24.5rem]:text-[calc(12.2vw_-_8px)]"
            >
              No shortcuts<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-foreground/75 md:pb-2 md:text-right">
            Four stages, the same order, every car. Nothing is skipped to hit a
            handover date.
          </p>
        </div>

        <ol className="mt-12 grid border-t border-line sm:grid-cols-2 md:mt-16 2xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="@container border-b border-line py-8 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 md:py-10 md:odd:pr-8 md:even:pl-8 2xl:border-r 2xl:px-8 2xl:first:pl-0 2xl:last:border-r-0 2xl:last:pr-0"
            >
              <Reveal delay={i * 100} className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-accent">
                    0{i + 1}
                  </span>
                  <span className="label text-muted">{step.meta}</span>
                </div>
                <h3 className="font-display mt-10 text-[clamp(1.25rem,7cqi,2.75rem)] tracking-[-0.045em] md:mt-14">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-sm text-pretty leading-relaxed text-foreground/75">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

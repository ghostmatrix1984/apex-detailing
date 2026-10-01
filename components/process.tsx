import { Reveal } from "./reveal";
import { SectionLabel } from "./ui";

const STEPS = [
  {
    title: "Inspect",
    body: "Paint depth readings across every panel and a full defect map under calibrated light.",
  },
  {
    title: "Decontaminate",
    body: "Snow foam, two-bucket wash, iron fallout and clay treatment to a bare, clean surface.",
  },
  {
    title: "Perfect",
    body: "Machine correction staged to your paint — as much as it needs, never more than it can take.",
  },
  {
    title: "Protect",
    body: "Coating or film applied and infrared-cured, followed by a final inspection and handover.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="scroll-mt-20 border-t border-line bg-surface py-24 md:py-36"
    >
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionLabel index="05">Process</SectionLabel>
            <h2
              id="process-title"
              className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)]"
            >
              No shortcuts<span className="text-accent">.</span>
            </h2>
          </div>
        </div>

        <ol className="mt-16 grid gap-px bg-line sm:grid-cols-2 md:mt-24 xl:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="bg-surface">
              <Reveal delay={i * 100} className="flex h-full flex-col p-6 md:p-8">
                <span className="font-mono text-sm text-accent">0{i + 1}</span>
                <h3 className="font-display mt-16 text-4xl md:mt-24 md:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-xs leading-relaxed text-foreground/65">
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

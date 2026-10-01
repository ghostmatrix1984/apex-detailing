import Image from "next/image";
import { Reveal } from "./reveal";
import { ArrowIcon, SectionLabel } from "./ui";

const SERVICES = [
  {
    title: "Paint Correction",
    body: "Multi-stage machine polishing that removes swirls, holograms and oxidation — measured by paint depth gauge, never guessed.",
    from: "£450",
    time: "1–3 days",
    image: "/images/service-correction.png",
    alt: "Machine polisher refining dark metallic paint under an inspection light",
  },
  {
    title: "Ceramic Coating",
    body: "Professional-grade SiO₂ coatings in 2, 5 and 10 year systems. Extreme gloss, hydrophobic behaviour, effortless maintenance.",
    from: "£695",
    time: "2–4 days",
    image: "/images/service-ceramic.png",
    alt: "Tight water beads on a black ceramic-coated bonnet",
  },
  {
    title: "Paint Protection Film",
    body: "Self-healing, optically clear urethane film. Pattern-cut or bulk-installed with wrapped edges for invisible full-body protection.",
    from: "£1,450",
    time: "2–7 days",
    image: "/images/service-ppf.png",
    alt: "Technician applying clear protection film to a dark bumper",
  },
  {
    title: "Interior Detailing",
    body: "Leather cleaning and conditioning, Alcantara restoration, steam sanitation and fabric protection for a cabin that feels delivery-fresh.",
    from: "£285",
    time: "1 day",
    image: "/images/service-interior.png",
    alt: "Immaculate black leather sports car interior with carbon trim",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-20 py-24 md:py-36"
    >
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="01">Services</SectionLabel>
            <h2
              id="services-title"
              className="font-display mt-8 text-[clamp(2.5rem,7vw,7rem)]"
            >
              Four disciplines.
              <br />
              <span className="text-muted">One standard.</span>
            </h2>
          </div>
          <p className="max-w-sm text-foreground/70 md:col-span-4 md:col-start-9 md:pb-3">
            Every vehicle is inspected under calibrated studio lighting before a
            single pad touches the paint. We specify the work — then we perfect
            it.
          </p>
        </div>

        <ul className="mt-16 border-t border-line md:mt-24">
          {SERVICES.map((service, i) => (
            <li key={service.title} className="border-b border-line">
              <Reveal>
                <a
                  href="#book"
                  className="group grid gap-6 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10"
                >
                  <span className="label text-muted md:col-span-1">
                    0{i + 1}
                  </span>
                  <div className="md:col-span-5">
                    <h3 className="font-display text-[clamp(2rem,4.2vw,4.5rem)] transition-colors duration-300 group-hover:text-accent">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-md leading-relaxed text-foreground/65">
                      {service.body}
                    </p>
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden md:col-span-4">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover grayscale-[40%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="flex items-end justify-between md:col-span-2 md:flex-col md:items-end md:gap-6">
                    <dl className="text-left md:text-right">
                      <dt className="label text-muted">From</dt>
                      <dd className="mt-1 text-2xl font-semibold tracking-tight">
                        {service.from}
                      </dd>
                      <dt className="label mt-3 text-muted">Duration</dt>
                      <dd className="mt-1 text-sm text-foreground/80">
                        {service.time}
                      </dd>
                    </dl>
                    <span className="flex size-12 items-center justify-center border border-line transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                      <ArrowIcon />
                      <span className="sr-only">Book {service.title}</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

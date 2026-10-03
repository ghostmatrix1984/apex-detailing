const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Paint Correction", href: "#services" },
      { label: "Ceramic Coating", href: "#services" },
      { label: "Paint Protection Film", href: "#services" },
      { label: "Interior Detailing", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Selected Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Reviews", href: "#reviews" },
      { label: "Book", href: "#book" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "TikTok", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background pt-20 md:pt-28">
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="label text-muted">Visit the studio</p>
            <address className="mt-5 text-lg leading-relaxed not-italic">
              Unit 7, Arches Yard
              <br />
              Battersea, London SW11 8AB
            </address>
            <p className="mt-6 text-sm leading-relaxed text-foreground/60">
              Mon–Fri 08:00–18:00
              <br />
              Sat 09:00–14:00 · By appointment only
            </p>
            <a
              href="mailto:studio@apexdetailing.co.uk"
              className="mt-6 inline-block border-b border-line pb-1 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              studio@apexdetailing.co.uk
            </a>
          </div>

          {COLUMNS.map((col) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className="md:col-span-2 first-of-type:md:col-start-7"
            >
              <p className="label text-muted">{col.title}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p
          aria-hidden="true"
          className="font-display mt-20 select-none text-[25.5vw] leading-[0.78] text-surface md:mt-28 3xl:text-[30rem]"
        >
          Ape<span className="text-accent/20">x</span>
        </p>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} APEX Detailing Ltd. All rights reserved.</p>
          <ul className="flex gap-8">
            <li>
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

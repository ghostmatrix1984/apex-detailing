"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowIcon } from "./ui";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#build", label: "Build" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#reviews", label: "Reviews" },
];

export function Logo() {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-2xl leading-none">
        Ape<span className="text-accent">x</span>
      </span>
      <span className="label hidden text-[0.6875rem] text-muted sm:inline">
        Detailing
      </span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-background/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Link href="/" aria-label="APEX Detailing home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="label text-foreground/70 transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#book"
            className="group hidden items-center gap-3 border border-accent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
          >
            Book
            <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden="true"
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              aria-hidden="true"
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] border-t border-line bg-background lg:hidden"
      >
        <ul className="container-x flex flex-col pt-6">
          {NAV.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-5"
              >
                <span className="font-display text-4xl">{item.label}</span>
                <span className="label text-muted">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="container-x pt-8">
          <a
            href="#book"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent-foreground"
          >
            Book Your Detail
            <ArrowIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <p className="label flex items-center gap-3 text-muted">
      <span className="text-accent">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-line" />
      <span>{children}</span>
    </p>
  );
}

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-between gap-6 bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent-foreground transition-colors hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}
    >
      {children}
      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function GhostLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 border-b border-line pb-1 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {children}
      <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

import Link from "next/link";

import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-ink py-20 text-mist">
      <Container className="space-y-6">
        <p className="text-sm uppercase tracking-[0.28em] text-accent">404</p>
        <h1 className="font-display text-6xl uppercase leading-none text-mist md:text-7xl">Page Not Found</h1>
        <p className="max-w-xl text-lg leading-8 text-white/72">
          The page you tried to open is not available. Let&apos;s get you back to the main experience.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center rounded-xl border border-accent/35 bg-accent/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent transition hover:border-accent/75 hover:bg-accent/18"
        >
          Go to homepage
        </Link>
      </Container>
    </div>
  );
}

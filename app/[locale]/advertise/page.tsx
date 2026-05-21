import Link from "next/link";
import { notFound } from "next/navigation";

import { AdvertiseForm } from "@/components/advertise-form";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { StatsGrid } from "@/components/stats-grid";
import { getLocaleContent, isLocale } from "@/lib/site-content";

type AdvertisePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdvertisePage({ params }: AdvertisePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getLocaleContent(locale);

  return (
    <section className="py-16 md:py-20">
      <Container className="space-y-8">
        <div className="grid gap-8 rounded-[2.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 md:p-8 xl:grid-cols-[1.05fr_0.95fr] xl:p-10">
          <SectionHeading {...content.advertise.hero} />

          <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.28em] text-accent">{content.advertise.formTitle}</p>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/72">{content.advertise.formDescription}</p>
            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm uppercase tracking-[0.22em] text-white/45">{content.advertise.directEmailLabel}</p>
              <Link
                href={`mailto:${content.contactEmail}`}
                className="mt-4 block font-display text-3xl uppercase tracking-[0.08em] text-mist transition hover:text-accent"
              >
                {content.contactEmail}
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <p className="mb-8 text-sm uppercase tracking-[0.28em] text-accent">{content.advertise.audienceTitle}</p>
          <StatsGrid content={content} />
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.48fr_0.52fr]">
          <article className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-accent">{content.advertise.platformTitle}</p>
            <div className="mt-6 space-y-5">
              {content.advertise.platformBullets.map((bullet) => (
                <div key={bullet} className="rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-5 text-sm leading-7 text-white/72">
                  {bullet}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.5rem] border border-white/10 bg-black/25 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-coral">{content.advertise.formatsTitle}</p>
            <div className="mt-6 space-y-5">
              {content.advertise.formats.map((format) => (
                <div key={format.name}>
                  <h3 className="font-display text-3xl uppercase tracking-[0.08em] text-mist">{format.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/72">{format.description}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="rounded-[2.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(215,255,100,0.06),rgba(255,255,255,0.03))] p-6 md:p-8">
          <div className="grid gap-8 xl:grid-cols-[0.36fr_0.64fr]">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">{content.advertise.formTitle}</p>
              <h2 className="font-display text-5xl uppercase leading-none text-mist md:text-6xl">
                {locale === "en" ? "Let’s shape the right brand fit." : "Vamos encontrar o melhor encaixe para a marca."}
              </h2>
              <p className="text-lg leading-8 text-white/72">{content.advertise.formDescription}</p>
            </div>

            <AdvertiseForm content={content} />
          </div>
        </div>
      </Container>
    </section>
  );
}

import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { FeatureGrid } from "@/components/feature-grid";
import { SectionHeading } from "@/components/section-heading";
import { getLocaleContent, isLocale } from "@/lib/site-content";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getLocaleContent(locale);

  return (
    <section className="py-16 md:py-20">
      <Container className="space-y-8">
        <div className="grid gap-8 rounded-[2.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 md:p-8 xl:grid-cols-[1.08fr_0.92fr] xl:p-10">
          <div className="space-y-8">
            <SectionHeading {...content.about.hero} />
            <div className="space-y-7 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              {content.about.story.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-white/72">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 md:p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-accent">
                {locale === "en" ? "Editorial posture" : "Postura editorial"}
              </p>
              <p className="mt-6 font-display text-5xl uppercase leading-none text-mist">
                {locale === "en"
                  ? "Built to make football content feel considered."
                  : "Feita para dar mais peso ao conteudo de futebol."}
              </p>
              <p className="mt-6 text-base leading-7 text-white/70">
                {locale === "en"
                  ? "The site reinforces that FootAnalysis is not just another profile page. It is a media property designed to grow with better campaigns, better storytelling, and stronger commercial clarity."
                  : "O site reforca que a FootAnalysis nao e apenas mais um perfil. E uma propriedade de midia pensada para crescer com campanhas melhores, narrativa mais forte e mais clareza comercial."}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <p className="mb-6 text-sm uppercase tracking-[0.28em] text-accent">
                {locale === "en" ? "Operating principles" : "Principios da marca"}
              </p>
              <FeatureGrid items={content.about.principles} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { notFound } from "next/navigation";
import { DeferredImage } from "@/components/deferred-image";

import { Container } from "@/components/container";
import { HomeHero } from "@/components/home-hero";
import { TrackedSponsorLink } from "@/components/tracked-sponsor-link";
import { getLocaleContent, isLocale } from "@/lib/site-content";
import { getYouTubeStats } from "@/lib/youtube-stats";

export const revalidate = 21600;

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getLocaleContent(locale);
  const isPortuguese = locale === "pt";
  const youtubeStats = await getYouTubeStats(content.locale);
  const latestVideo = youtubeStats?.latestVideo;

  const palette = isPortuguese
    ? {
        accent: "text-[#b9ff19]",
        button: "bg-[#b9ff19] text-[#07110a] hover:bg-[#ceff57]",
        outline: "border-white/18 text-white hover:border-[#b9ff19] hover:text-[#b9ff19]"
      }
    : {
        accent: "text-[#7cf0ff]",
        button: "bg-[#59d4ff] text-[#051018] hover:bg-[#85e1ff]",
        outline: "border-white/18 text-white hover:border-[#59d4ff] hover:text-[#59d4ff]"
      };

  const pageCopy = isPortuguese
    ? {
        contactTitle: "Se quiser anunciar ou fechar parceria, a conversa começa aqui.",
        coverageDescription:
          "Tabelas, ritmo de campeao, classificacoes, wrap-ups, comparativos e leituras rapidas dos campeonatos que mais movimentam o publico.",
        heroDescription:
          "Conteudo curto de futebol com identidade visual forte, leitura rapida e formatos que fazem o torcedor parar para assistir.",
        heroPrimary: "Seja um patrocinador",
        heroTitle: "Futebol.\nAnalise.\nEntretenimento.\nGrande audiencia.",
        sampleTitle: "Exemplos do visual do canal",
        sampleEyebrow: "Preview do conteudo"
      }
    : {
        contactTitle: "If you want to sponsor or partner, this is where the conversation starts.",
        coverageDescription:
          "Tables, title pace, standings, season wrap-ups, comparisons, and fast football breakdowns built for short-form attention.",
        heroDescription:
          "Short football content with strong visual identity, fast analysis, and repeatable formats designed to stop the scroll.",
        heroPrimary: "Become a sponsor",
        heroTitle: "Football.\nAnalysis.\nEntertainment.\nGreat audience.",
        sampleTitle: "Examples of the channel style",
        sampleEyebrow: "Content preview"
      };

  const sampleImages = isPortuguese
    ? [
        { src: "/video-example-1.png", alt: "Ritmo de campeao" },
        { src: "/video-example-4.png", alt: "Tabela Serie A" },
        { src: "/video-example-3.png", alt: "Tabela Serie B" },
        { src: "/video-example-pt-4.png", alt: "Resultados Serie C" }
      ]
    : [
        { src: "/video-example-en-1.png", alt: "La Liga results" },
        { src: "/video-example-en-2.png", alt: "Championship top scorers" },
        { src: "/video-example-en-3.png", alt: "Serie A season wrap-up" },
        { src: "/video-example-en-4.png", alt: "Bundesliga season wrap-up" }
      ];

  return (
    <div className="pb-12">
      <HomeHero
        contactEmail={content.contactEmail}
        isPortuguese={isPortuguese}
        latestVideo={latestVideo}
        locale={locale}
        pageCopy={{
          floatingSubtitle: isPortuguese ? "Shorts de futebol" : "Football shorts",
          floatingTitle: youtubeStats?.channelTitle || "FootAnalysis",
          heroDescription: pageCopy.heroDescription,
          heroTitle: pageCopy.heroTitle,
          primaryCta: pageCopy.heroPrimary
        }}
        palette={palette}
        socials={content.socials}
      />

      <section id="samples" className="pt-10">
        <Container>
          <div className="space-y-6">
            <div className="max-w-5xl">
              <p className={`text-sm uppercase tracking-[0.28em] ${palette.accent}`}>{pageCopy.sampleEyebrow}</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">{pageCopy.sampleTitle}</h2>
              <p className="mt-4 text-base leading-8 text-white/64">{pageCopy.coverageDescription}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {sampleImages.map((image) => (
                <article key={image.src} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                  <div className="relative aspect-[9/16] bg-[#0b0d12]">
                    <DeferredImage
                      src={image.src.replace("/video-", "/optimized/video-").replace(".png", ".webp")}
                      alt={image.alt}
                      sizes="(min-width: 1280px) calc((100vw - 176px) / 4), (min-width: 1024px) calc((100vw - 112px) / 2), (min-width: 768px) calc((100vw - 80px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                      quality={85}
                      className="object-cover object-top"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {isPortuguese ? (
        <section id="partner-banner" className="pt-10">
          <Container>
            <div className="overflow-hidden rounded-[1.8rem] border border-[#d7ff64]/25 bg-[#d7ff64]/[0.05] p-4 md:p-5">
              <div className="grid items-center gap-5 lg:grid-cols-[1.35fr_0.65fr]">
                <div className="relative aspect-[1983/793] overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/30">
                  <DeferredImage src="/optimized/fake-banner-en.webp" alt="Espaço para marca parceira" sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" />
                </div>
                <div className="px-2 py-2 lg:px-4">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#d7ff64]">Espaço para parceiros</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">Sua marca pode aparecer aqui.</h2>
                  <p className="mt-4 text-sm leading-7 text-white/60">Fale com a FootAnalysis para criar uma parceria com o público que vive futebol.</p>
                  <TrackedSponsorLink
                    href="mailto:footanalysisshorts@gmail.com"
                    locale={locale}
                    ctaText="Seja um parceiro"
                    className="mt-6 inline-flex items-center rounded-xl bg-[#d7ff64] px-5 py-3 text-sm font-bold text-[#0b0d12] transition hover:bg-[#efffae]"
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section id="contact" className="pt-10">
        <Container>
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,#0a0d11_0%,#10161e_52%,#0a0d11_100%)] px-6 py-8 md:px-8">
            <div className="grid gap-6 xl:grid-cols-[0.68fr_0.32fr] xl:items-center">
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">{pageCopy.contactTitle}</h2>
              </div>
              <div className="flex flex-col gap-4 xl:items-end">
                <TrackedSponsorLink
                  href={`mailto:${content.contactEmail}`}
                  locale={locale}
                  ctaText={pageCopy.heroPrimary}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${palette.button}`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

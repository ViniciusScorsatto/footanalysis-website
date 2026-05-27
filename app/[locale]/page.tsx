import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { HomeHero } from "@/components/home-hero";
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
        affiliateHint: "Troque os links quando os afiliados estiverem prontos.",
        affiliateTitle: "Banners afiliados para publico em portugues.",
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
        affiliateHint: "Replace the links once your affiliate campaigns are ready.",
        affiliateTitle: "Affiliate banners for the English audience.",
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

  const sidebarPreviewAffiliate = content.affiliates.items.find((item) => item.format === "sidebar" && item.imageSrc);
  const homepageAffiliates = content.affiliates.items.filter((item) => item !== sidebarPreviewAffiliate);
  const featuredAffiliate = homepageAffiliates.find((item) => item.format === "feature");

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

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {sampleImages.map((image) => (
                <article key={image.src} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]">
                  <div className="aspect-[9/16] bg-[#0b0d12]">
                    <img src={image.src} alt={image.alt} className="h-full w-full object-cover object-top" />
                  </div>
                </article>
              ))}

              {sidebarPreviewAffiliate ? (
                <Link
                  href={sidebarPreviewAffiliate.href}
                  target={sidebarPreviewAffiliate.href.startsWith("http") ? "_blank" : undefined}
                  rel={sidebarPreviewAffiliate.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition hover:-translate-y-1"
                >
                  <div className="aspect-[9/16] bg-[#0b0d12]">
                    <img
                      src={sidebarPreviewAffiliate.imageSrc}
                      alt={sidebarPreviewAffiliate.imageAlt ?? sidebarPreviewAffiliate.title}
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section id="affiliates" className="pt-10">
        <Container>
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,10,13,0.94)_0%,rgba(10,14,19,0.92)_100%)] px-6 py-7 md:px-8">
            <div className="mx-auto max-w-4xl">
              {featuredAffiliate ? (
                <Link
                  href={featuredAffiliate.href}
                  target={featuredAffiliate.href.startsWith("http") ? "_blank" : undefined}
                  rel={featuredAffiliate.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group block overflow-hidden rounded-[1.45rem] border border-[#b9ff19]/30 bg-[linear-gradient(135deg,rgba(185,255,25,0.16)_0%,rgba(255,255,255,0.02)_55%,rgba(255,255,255,0.02)_100%)] p-5 transition hover:-translate-y-1"
                >
                  {featuredAffiliate.imageSrc ? (
                    <div
                      className="overflow-hidden rounded-[1rem] border border-white/10 bg-black/20"
                    >
                      <img
                        src={featuredAffiliate.imageSrc}
                        alt={featuredAffiliate.imageAlt ?? featuredAffiliate.title}
                        className="h-auto w-full object-contain object-center"
                      />
                    </div>
                  ) : null}
                </Link>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="pt-10">
        <Container>
          <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,#0a0d11_0%,#10161e_52%,#0a0d11_100%)] px-6 py-8 md:px-8">
            <div className="grid gap-6 xl:grid-cols-[0.68fr_0.32fr] xl:items-center">
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">{pageCopy.contactTitle}</h2>
              </div>
              <div className="flex flex-col gap-4 xl:items-end">
                <Link
                  href={`mailto:${content.contactEmail}`}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${palette.button}`}
                >
                  {pageCopy.heroPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

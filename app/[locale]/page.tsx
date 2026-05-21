import Link from "next/link";
import {
  ArrowRight,
  Clapperboard,
  Eye,
  Globe2,
  Heart,
  Instagram,
  Megaphone,
  Music2,
  PlaySquare,
  Share2,
  Shirt,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Youtube
} from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { HomeHero } from "@/components/home-hero";
import { getLocaleContent, isLocale } from "@/lib/site-content";
import { getYouTubeStats } from "@/lib/youtube-stats";

export const revalidate = 21600;

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

type PlatformSnapshot = {
  platform: string;
  value: string;
  label: string;
};

type FormatCard = {
  title: string;
  description: string;
  icon: keyof typeof formatIcons;
};

function envValue(key: string, fallback: string) {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function optionalEnv(key: string) {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : undefined;
}

const formatIcons = {
  sponsor: Sparkles,
  series: PlaySquare,
  products: Shirt,
  activations: Megaphone,
  branded: Clapperboard
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
        hero: "bg-[radial-gradient(circle_at_top_left,rgba(215,255,100,0.18),transparent_30%),linear-gradient(135deg,#042c19_0%,#0b5a2e_55%,#02160c_100%)]",
        heroBorder: "border-[#d2ff52]/16",
        accent: "text-[#f2d534]",
        button: "bg-[#f2d534] text-[#072f1b] hover:bg-[#f7df69]",
        outline: "border-[#f7f4e9]/20 text-[#f7f4e9] hover:border-[#f2d534] hover:text-[#f2d534]",
        statGlow: "bg-[linear-gradient(180deg,#07140d_0%,#0c1711_100%)] border-[#d2ff52]/14",
        mediaBand: "bg-[linear-gradient(135deg,#072c18_0%,#0a361e_100%)] border-[#d2ff52]/12",
        closing: "bg-[radial-gradient(circle_at_top_left,rgba(210,255,82,0.16),transparent_28%),linear-gradient(135deg,#031d11_0%,#062b18_100%)] border-[#d2ff52]/14",
        phoneAccent: "from-[#f2d534]/40 to-transparent",
        chipDark: "bg-[#0a4126] text-[#f7f4e9]",
        chipLight: "bg-[#f2d534] text-[#0a2e1b]",
        lightEyebrow: "text-[#1f8a3b]",
        lightHeading: "text-[#0d2819]",
        lightText: "text-[#375142]",
        lightPanel: "bg-white"
      }
    : {
        hero: "bg-[radial-gradient(circle_at_top_left,rgba(83,140,255,0.18),transparent_32%),linear-gradient(135deg,#06111d_0%,#10243f_55%,#040911_100%)]",
        heroBorder: "border-[#5b95ff]/16",
        accent: "text-[#5b95ff]",
        button: "bg-[#2f7dff] text-white hover:bg-[#4b90ff]",
        outline: "border-[#eaf0f8]/18 text-[#f4f7fb] hover:border-[#5b95ff] hover:text-[#5b95ff]",
        statGlow: "bg-[linear-gradient(180deg,#08111c_0%,#101722_100%)] border-[#5b95ff]/12",
        mediaBand: "bg-[linear-gradient(135deg,#07111d_0%,#101b2c_100%)] border-[#5b95ff]/10",
        closing: "bg-[radial-gradient(circle_at_top_left,rgba(91,149,255,0.14),transparent_28%),linear-gradient(135deg,#040b14_0%,#0b1727_100%)] border-[#5b95ff]/12",
        phoneAccent: "from-[#5b95ff]/30 to-transparent",
        chipDark: "bg-[#14253c] text-[#eef4fb]",
        chipLight: "bg-[#2f7dff] text-white",
        lightEyebrow: "text-[#2f7dff]",
        lightHeading: "text-[#101b2c]",
        lightText: "text-[#42536a]",
        lightPanel: "bg-white"
      };

  const pageCopy = isPortuguese
    ? {
        heroTitle: "Futebol.\nEmocao.\nSegundos.",
        heroDescription: "Os melhores shorts de futebol com foco no Brasil e nos campeonatos sul-americanos.",
        primaryCta: "Conheca nossos numeros",
        secondaryCta: "Baixe o media kit",
        socialProof: "Milhoes de fas. Bilhoes de visualizacoes.",
        floatingTitle: youtubeStats?.channelTitle || "Footanalysys",
        floatingSubtitle: "Shorts de futebol",
        phoneLabel: "Brasil e America do Sul",
        numbersEyebrow: "Numeros publicos do canal",
        whereEyebrow: "Onde estamos",
        mediaEyebrow: "Media kit",
        mediaTitle: "Parcerias que entregam resultados",
        mediaDescription:
          "Solucoes criativas para conectar sua marca ao publico certo, com autenticidade e alto impacto.",
        mediaButton: "Baixe o media kit",
        formatsEyebrow: "Formatos de parceria",
        brandsCta: "Vamos juntos levar sua marca para o coracao do futebol.",
        brandsButton: "Vamos conversar"
      }
    : {
        heroTitle: "Football.\nEmotion.\nIn seconds.",
        heroDescription: "The best football shorts covering Brazil and South American competitions.",
        primaryCta: "See our numbers",
        secondaryCta: "Download media kit",
        socialProof: "Millions of fans. Billions of views.",
        floatingTitle: youtubeStats?.channelTitle || "Footanalysys",
        floatingSubtitle: "Football shorts",
        phoneLabel: "Brazil and South America",
        numbersEyebrow: "Public channel numbers",
        whereEyebrow: "Where we are",
        mediaEyebrow: "Media kit",
        mediaTitle: "Partnerships that deliver results",
        mediaDescription:
          "Creative solutions to connect your brand with the right audience, with authenticity and high impact.",
        mediaButton: "Download media kit",
        formatsEyebrow: "Partnership formats",
        brandsCta: "Let's take your brand to the heart of football.",
        brandsButton: "Let's talk"
      };

  const sharedStats = {
    instagram: envValue("HOMEPAGE_INSTAGRAM", isPortuguese ? "5,2M" : "5.2M"),
    tiktok: envValue("HOMEPAGE_TIKTOK", isPortuguese ? "6,1M" : "6.1M"),
    youtube: optionalEnv("HOMEPAGE_YOUTUBE") ?? youtubeStats?.subscribers ?? (isPortuguese ? "2,8M" : "2.8M"),
    youtubeVideos: optionalEnv("HOMEPAGE_YOUTUBE_VIDEOS") ?? youtubeStats?.videos ?? (isPortuguese ? "500+" : "500+")
  };

  const platformSnapshots: PlatformSnapshot[] = isPortuguese
    ? [
        { platform: "Instagram", value: sharedStats.instagram, label: "Seguidores" },
        { platform: "TikTok", value: sharedStats.tiktok, label: "Seguidores" },
        { platform: "YouTube", value: sharedStats.youtube, label: "Inscritos" },
        { platform: "Videos", value: sharedStats.youtubeVideos, label: "Publicados" }
      ]
    : [
        { platform: "Instagram", value: sharedStats.instagram, label: "Followers" },
        { platform: "TikTok", value: sharedStats.tiktok, label: "Followers" },
        { platform: "YouTube", value: sharedStats.youtube, label: "Subscribers" },
        { platform: "Videos", value: sharedStats.youtubeVideos, label: "Published" }
      ];

  const mediaPoints = isPortuguese
    ? [
        {
          title: "Alcance gigante",
          description: "Milhoes de visualizacoes todos os dias nas principais redes sociais."
        },
        {
          title: "Conteudo que conecta",
          description: "Linguagem nativa, rapida e envolvente que gera identificacao e engajamento."
        },
        {
          title: "Resultados reais",
          description: "Campanhas que geram visibilidade, trafego e conversa."
        },
        {
          title: "Formatos flexiveis",
          description: "Diversas possibilidades de parceria para atender seus objetivos."
        }
      ]
    : [
        {
          title: "Massive reach",
          description: "Millions of views every day across the top social platforms."
        },
        {
          title: "Content that connects",
          description: "Native, fast and engaging content that drives identification and engagement."
        },
        {
          title: "Real results",
          description: "Campaigns that generate visibility, traffic and conversation."
        },
        {
          title: "Flexible formats",
          description: "Multiple partnership opportunities to meet your goals."
        }
      ];

  const formats: FormatCard[] = isPortuguese
    ? [
        {
          title: "Publipost / Patrocinio",
          description: "Sua marca em destaque de forma nativa e criativa nos nossos videos.",
          icon: "sponsor"
        },
        {
          title: "Quadros e series",
          description: "Patrocine quadros exclusivos e associe sua marca ao nosso conteudo.",
          icon: "series"
        },
        {
          title: "Produtos e servicos",
          description: "Mostre seu produto ou servico para milhoes de fas de futebol.",
          icon: "products"
        }
      ]
    : [
        {
          title: "Sponsored post",
          description: "Highlight your brand in a native and creative way in our videos.",
          icon: "sponsor"
        },
        {
          title: "Shows & series",
          description: "Sponsor exclusive shows and associate your brand with our content.",
          icon: "series"
        },
        {
          title: "Products & services",
          description: "Show your product or service to millions of football fans.",
          icon: "products"
        }
      ];

  const leagueChips = content.coverage.items.slice(0, 4);

  return (
    <div className="pb-10">
      <HomeHero
        contentEyebrow={content.hero.eyebrow}
        isPortuguese={isPortuguese}
        latestVideo={latestVideo}
        leagueChips={leagueChips}
        locale={locale}
        pageCopy={pageCopy}
        palette={palette}
        socials={content.socials}
      />

      <section id="platforms" className="bg-[#f5f6f4] py-8 md:py-10">
        <Container>
          <div className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
            <div className="rounded-[1.7rem] bg-transparent p-2">
              <p className={`text-sm uppercase tracking-[0.24em] ${palette.lightEyebrow}`}>{pageCopy.whereEyebrow}</p>
              <h2 className={`mt-3 max-w-md text-4xl font-semibold leading-tight ${palette.lightHeading}`}>
                {isPortuguese ? "Presenca publica nas plataformas" : "Public platform presence"}
              </h2>
              <p className={`mt-4 max-w-md text-base leading-7 ${palette.lightText}`}>
                {isPortuguese
                  ? "Esta area mostra apenas numeros publicos ou informacoes controladas manualmente, sem dados privados de Analytics."
                  : "This section only shows public numbers or manually controlled information, with no private Analytics data."}
              </p>
            </div>

            <div className={`rounded-[1.7rem] border border-slate-200 ${palette.lightPanel} p-5 shadow-[0_20px_50px_rgba(10,20,30,0.08)]`}>
              <p className={`text-sm uppercase tracking-[0.24em] ${palette.lightEyebrow}`}>{pageCopy.whereEyebrow}</p>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                {platformSnapshots.map((snapshot) => (
                  <div key={snapshot.platform} className="rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className={`text-sm font-semibold ${palette.lightHeading}`}>{snapshot.platform}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">{snapshot.value}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{snapshot.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {isPortuguese ? (
        <section id="campeonatos" className="bg-[#f5f6f4] pb-8">
          <Container>
            <div className="space-y-5">
              <div className="px-2">
                <p className={`text-sm uppercase tracking-[0.24em] ${palette.lightEyebrow}`}>
                  {content.coverage.heading.eyebrow}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {content.coverage.items.map((competition, index) => (
                  <article
                    key={competition.name}
                    className={`group rounded-[1.45rem] border p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.1)] ${
                      index === 0
                        ? "border-[#d4c52e] bg-[linear-gradient(135deg,#fffbe8_0%,#ffffff_62%)] md:col-span-2"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${palette.lightEyebrow}`}>
                          {competition.tag}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-950">{competition.name}</h3>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-slate-50 p-2 text-[#1f8a3b] transition group-hover:border-[#d4c52e] group-hover:bg-[#fff9c8]">
                        <Trophy className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-slate-600">{competition.blurb}</p>

                    {competition.features?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {competition.features.map((feature) => (
                          <span
                            key={feature}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-[#d4c52e]" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section id="media-kit" className="bg-[#f5f6f4] pb-8">
        <Container>
          <div className={`rounded-[1.7rem] border p-6 md:p-7 ${palette.mediaBand}`}>
            <div className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
              <div className="space-y-4">
                <p className={`text-sm uppercase tracking-[0.24em] ${palette.accent}`}>{pageCopy.mediaEyebrow}</p>
                <h2 className="max-w-sm text-4xl font-semibold leading-tight text-white">{pageCopy.mediaTitle}</h2>
                <p className="max-w-sm text-base leading-7 text-white/72">{pageCopy.mediaDescription}</p>
                <Link
                  href={`/${locale}/advertise`}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${palette.button}`}
                >
                  {pageCopy.mediaButton}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {mediaPoints.map((point, index) => (
                  <div key={point.title} className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className={`mb-4 inline-flex rounded-full border border-white/10 p-2 ${palette.accent}`}>
                      {index === 0 ? <Globe2 className="h-4 w-4" /> : index === 1 ? <Users className="h-4 w-4" /> : index === 2 ? <TrendingUp className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
                    </div>
                    <p className="text-lg font-semibold text-white">{point.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/68">{point.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="formats" className="bg-[#f5f6f4] pb-8">
        <Container>
          <div className="rounded-[1.7rem] bg-transparent">
            <p className={`text-center text-sm uppercase tracking-[0.24em] ${palette.lightEyebrow}`}>{pageCopy.formatsEyebrow}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {formats.map((format) => {
                const FormatIcon = formatIcons[format.icon];

                return (
                  <article key={format.title} className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                    <div className={`mb-4 inline-flex rounded-full border border-slate-200 p-2 ${palette.lightEyebrow}`}>
                      <FormatIcon className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{format.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{format.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section id="partnerships" className="pb-6">
        <Container>
          <div className="rounded-[1.7rem] border border-white/10 bg-[#05080d] px-5 py-6 md:px-7">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className={`text-sm uppercase tracking-[0.24em] ${palette.accent}`}>{content.affiliates.heading.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {content.affiliates.heading.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/64">{content.affiliates.heading.description}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/42">
                {isPortuguese ? "Substitua os links quando quiser" : "Replace the links whenever you are ready"}
              </p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {content.affiliates.items.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group rounded-[1.4rem] border p-5 transition hover:-translate-y-1 ${
                    index === 0
                      ? "border-[#d4c52e]/50 bg-[linear-gradient(135deg,rgba(242,213,52,0.16)_0%,rgba(255,255,255,0.02)_55%,rgba(255,255,255,0.02)_100%)]"
                      : "border-white/12 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-xs font-semibold uppercase tracking-[0.24em] ${palette.accent}`}>{item.tag}</span>
                    <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-white/60">
                      Affiliate
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/68">{item.description}</p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition group-hover:text-[#f8f6ef]">
                    {item.cta}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="contact" className="pb-8">
        <Container>
          <div className={`rounded-[1.7rem] border px-6 py-6 md:px-8 ${palette.closing}`}>
            <div className="grid gap-6 xl:grid-cols-[0.58fr_0.42fr] xl:items-center">
              <h2 className="max-w-3xl text-4xl font-semibold uppercase leading-tight text-white md:text-5xl">
                {pageCopy.brandsCta}
              </h2>

              <div className="flex flex-col gap-4 xl:items-end">
                <Link
                  href={`/${locale}/advertise`}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${palette.button}`}
                >
                  {pageCopy.brandsButton}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <Link href={`mailto:${content.contactEmail}`} className="transition hover:text-white">
                    {content.contactEmail}
                  </Link>
                  <div className="flex items-center gap-3">
                    <Instagram className="h-4 w-4" />
                    <Youtube className="h-4 w-4" />
                    <Music2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

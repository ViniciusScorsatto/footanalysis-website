"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Music2, Youtube } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/container";

type SocialLink = {
  label: string;
  href: string;
};

type LeagueChip = {
  name: string;
  tag: string;
};

type HeroPalette = {
  hero: string;
  heroBorder: string;
  accent: string;
  button: string;
  outline: string;
  phoneAccent: string;
};

type HeroCopy = {
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  socialProof: string;
  floatingTitle: string;
  floatingSubtitle: string;
  phoneLabel: string;
};

type LatestVideo = {
  title: string;
  embedUrl: string;
};

type HomeHeroProps = {
  contentEyebrow: string;
  isPortuguese: boolean;
  latestVideo?: LatestVideo;
  leagueChips: LeagueChip[];
  locale: string;
  pageCopy: HeroCopy;
  palette: HeroPalette;
  socials: SocialLink[];
};

const ptTickerRows = [
  ["POS 01", "PTS 31", "J 12", "V 9", "SG +12", "ART 14", "ROD 13", "PALPITES"],
  ["SERIE A", "LIBERTADORES", "COPA BR", "SUL-AMERICANA", "CLASSIFICACAO", "MATA-MATA"],
  ["RITMO CAMPEAO", "RITMO REBAIXAMENTO", "ULTIMA RODADA", "ARTILHARIA", "PROXIMOS JOGOS"]
];

const enTickerRows = [
  ["POS 01", "PTS 31", "P 12", "W 9", "GD +12", "TOP SCORER 14", "ROUND 13", "PICKS"],
  ["SERIE A", "LIBERTADORES", "CUP", "SUDAMERICANA", "STANDINGS", "KNOCKOUTS"],
  ["TITLE PACE", "RELEGATION PACE", "LAST ROUND", "GOAL CHART", "NEXT MATCHES"]
];

function socialIcon(label: string) {
  if (label === "Instagram") {
    return Instagram;
  }

  if (label === "YouTube") {
    return Youtube;
  }

  return Music2;
}

function HeroTicker({
  delay,
  direction = "left",
  items,
  top
}: {
  delay?: number;
  direction?: "left" | "right";
  items: string[];
  top: string;
}) {
  const reduceMotion = useReducedMotion();
  const duplicatedItems = [...items, ...items];

  return (
    <div className={`pointer-events-none absolute ${top} left-[-8%] right-[-8%] overflow-hidden`}>
      <motion.div
        className="flex min-w-max gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={
          reduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                y: 0,
                x: direction === "left" ? [0, -280] : [-280, 0]
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                opacity: { duration: 0.8, delay },
                y: { duration: 0.8, delay },
                x: {
                  duration: direction === "left" ? 18 : 22,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay
                }
              }
        }
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-white/10 bg-black/22 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/34 backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function FloatingChip({
  accentClassName,
  chip,
  className,
  delay
}: {
  accentClassName: string;
  chip?: LeagueChip;
  className: string;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();

  if (!chip) {
    return null;
  }

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 0 }}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -8, 0],
              rotate: [0, 1.2, 0]
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              opacity: { duration: 0.55, delay },
              y: {
                duration: 6.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay
              },
              rotate: {
                duration: 7.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay
              }
            }
      }
    >
      <p className={`text-xs uppercase tracking-[0.24em] ${accentClassName}`}>{chip.tag}</p>
      <p className="mt-10 font-display text-3xl uppercase leading-none text-white">{chip.name}</p>
    </motion.div>
  );
}

export function HomeHero({
  contentEyebrow,
  isPortuguese,
  latestVideo,
  leagueChips,
  locale,
  pageCopy,
  palette,
  socials
}: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const tickerRows = isPortuguese ? ptTickerRows : enTickerRows;

  return (
    <section className="pt-8 md:pt-10">
      <Container>
        <div className={`overflow-hidden rounded-[2.2rem] border ${palette.heroBorder} ${palette.hero} px-6 py-10 md:px-10 md:py-12 xl:px-12 xl:py-14`}>
          <div className="grid gap-14 xl:grid-cols-[0.82fr_1.18fr] xl:items-center">
            <motion.div
              className="space-y-7"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-3">
                <motion.p
                  className={`text-sm uppercase tracking-[0.28em] ${palette.accent}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 }}
                >
                  {contentEyebrow}
                </motion.p>
                <motion.h1
                  className="whitespace-pre-line font-display text-5xl uppercase leading-[0.88] text-[#f8f6ef] md:text-7xl xl:text-[6.3rem]"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.14 }}
                >
                  {pageCopy.heroTitle}
                </motion.h1>
                <motion.p
                  className="max-w-xl text-lg leading-8 text-white/82"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.22 }}
                >
                  {pageCopy.heroDescription}
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
              >
                <Link
                  href="#platforms"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${palette.button}`}
                >
                  {pageCopy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${locale}/advertise`}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm uppercase tracking-[0.18em] transition ${palette.outline}`}
                >
                  {pageCopy.secondaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
              >
                <div className="flex items-center gap-4 text-white">
                  {socials.map((social, index) => {
                    const SocialIcon = socialIcon(social.label);

                    return (
                      <motion.div
                        key={social.label}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.38, delay: 0.42 + index * 0.06 }}
                      >
                        <Link
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/12 bg-white/5 p-2.5 text-white/88 transition hover:border-white/30 hover:bg-white/10"
                        >
                          <SocialIcon className="h-5 w-5" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                <p className="text-sm uppercase tracking-[0.24em] text-white/62">{pageCopy.socialProof}</p>
              </motion.div>
            </motion.div>

            <div className="relative min-h-[31rem] md:min-h-[37rem] xl:min-h-[39rem]">
              <div className="absolute inset-0 rounded-[2.1rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_46%)]" />
              <div className="absolute left-[12%] top-[11%] h-[80%] w-[76%] rounded-full bg-gradient-to-b from-white/10 to-transparent blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,30,18,0.12),transparent_54%)]" />

              <HeroTicker items={tickerRows[0]} top="top-[14%]" delay={0.2} />
              <HeroTicker items={tickerRows[1]} top="top-[46%]" direction="right" delay={0.35} />
              <HeroTicker items={tickerRows[2]} top="bottom-[14%]" delay={0.5} />

              <FloatingChip
                accentClassName={palette.accent}
                chip={leagueChips[0]}
                className="absolute left-[2%] top-[20%] w-40 rotate-[-9deg] rounded-[1.6rem] border border-white/20 bg-black/28 p-4 shadow-2xl backdrop-blur-sm md:w-48"
                delay={0.18}
              />
              <FloatingChip
                accentClassName={palette.accent}
                chip={leagueChips[1]}
                className="absolute right-[2%] top-[6%] w-40 rotate-[8deg] rounded-[1.6rem] border border-white/20 bg-black/28 p-4 shadow-2xl backdrop-blur-sm md:w-48"
                delay={0.24}
              />
              <FloatingChip
                accentClassName={palette.accent}
                chip={leagueChips[2]}
                className="absolute bottom-[16%] left-[4%] w-40 rotate-[9deg] rounded-[1.6rem] border border-white/20 bg-black/28 p-4 shadow-2xl backdrop-blur-sm md:w-48"
                delay={0.3}
              />
              <FloatingChip
                accentClassName={palette.accent}
                chip={leagueChips[3]}
                className="absolute bottom-[20%] right-[1%] w-36 rotate-[-7deg] rounded-[1.6rem] border border-white/20 bg-black/28 p-4 shadow-2xl backdrop-blur-sm md:w-44"
                delay={0.36}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 z-10 h-[33rem] w-[17rem] -translate-x-1/2 -translate-y-1/2 rounded-[2.7rem] border border-white/14 bg-[#0a0f16] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:h-[38rem] md:w-[19rem]"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 30 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, scale: 1, y: 0 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [0, -10, 0]
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0.6 }
                    : {
                        opacity: { duration: 0.7, delay: 0.22 },
                        scale: { duration: 0.7, delay: 0.22 },
                        y: {
                          duration: 7.5,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                          delay: 0.22
                        }
                      }
                }
              >
                <div className="relative h-full overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,#0f141b_0%,#0a2515_46%,#030608_100%)]">
                  <div className="absolute left-1/2 top-3 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/18" />
                  {latestVideo ? (
                    <>
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={latestVideo.embedUrl}
                        title={latestVideo.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 via-black/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/78 via-black/30 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${palette.phoneAccent}`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/14 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(255,255,255,0.02)_55%,transparent_65%)]">
                          <p className={`font-display text-7xl uppercase ${palette.accent}`}>10</p>
                        </div>
                      </div>
                    </>
                  )}

                  {!latestVideo ? (
                    <div className="relative flex h-full flex-col justify-between p-5">
                      <div className="space-y-1 pt-5">
                        <p className="truncate text-sm font-semibold text-white">{pageCopy.floatingTitle}</p>
                        <p className="truncate text-xs uppercase tracking-[0.22em] text-white/58">{pageCopy.floatingSubtitle}</p>
                      </div>

                      <div>
                        <p className="line-clamp-2 text-center text-xs uppercase leading-5 tracking-[0.2em] text-white/82">
                          {pageCopy.phoneLabel}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, AtSign, Instagram, MessageCircle, Music2, Play, Youtube } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/container";

type SocialLink = {
  label: string;
  href: string;
};

type HeroPalette = {
  accent: string;
  button: string;
  outline: string;
};

type HeroCopy = {
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  floatingTitle: string;
  floatingSubtitle: string;
};

type LatestVideo = {
  id?: string;
  title: string;
  embedUrl: string;
};

type HomeHeroProps = {
  contactEmail: string;
  isPortuguese: boolean;
  latestVideo?: LatestVideo;
  locale: string;
  pageCopy: HeroCopy;
  palette: HeroPalette;
  socials: SocialLink[];
};

function socialIcon(label: string) {
  if (label === "Instagram") {
    return Instagram;
  }

  if (label === "YouTube") {
    return Youtube;
  }

  if (label === "Reddit") {
    return MessageCircle;
  }

  if (label === "X") {
    return AtSign;
  }

  return Music2;
}

export function HomeHero({
  contactEmail,
  isPortuguese,
  latestVideo,
  locale,
  pageCopy,
  palette,
  socials
}: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const heroTitleLines = pageCopy.heroTitle.split("\n");
  const accentLine = heroTitleLines.at(-1);
  const baseLines = heroTitleLines.slice(0, -1);
  const heroBackgroundImage = isPortuguese ? "/hero-bg-brazil.png" : "/hero-bg-international.png";
  const showcaseImages = isPortuguese
    ? ["/video-example-1.png", "/video-example-pt-4.png", "/video-example-3.png", "/video-example-4.png"]
    : ["/video-example-en-1.png", "/video-example-en-2.png", "/video-example-en-3.png", "/video-example-en-4.png"];

  return (
    <section className="pt-6 md:pt-8">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050608] px-6 py-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] md:px-10 md:py-10 xl:px-12 xl:py-12">
          {heroBackgroundImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroBackgroundImage})` }}
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,255,100,0.14),transparent_22%),radial-gradient(circle_at_center_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(4,5,8,0.24),rgba(0,0,0,0.42))]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,6,0.84)_0%,rgba(3,4,6,0.56)_36%,rgba(3,4,6,0.3)_56%,rgba(3,4,6,0.72)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.2)_58%,rgba(0,0,0,0.58)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute left-[6%] top-[18%] h-[52%] w-[88%] rounded-[50%] border border-white/8" />
          <div className="absolute left-[2%] top-[26%] h-[58%] w-[96%] rounded-[50%] border border-white/6" />
          <div className="absolute bottom-[-10%] right-[-3%] h-44 w-72 rotate-[-18deg] bg-[linear-gradient(135deg,rgba(215,255,100,0.95)_0%,rgba(215,255,100,0.08)_72%)] blur-[1px]" />
          <div className="absolute bottom-[-4%] left-[-6%] h-52 w-[62%] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_68%)] blur-2xl" />

          <div className="relative grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <motion.div
              className="space-y-7"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-4">
                <motion.h1
                  className="font-display text-5xl uppercase leading-[0.88] text-white md:text-7xl xl:text-[5.8rem]"
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.72, delay: 0.14 }}
                >
                  {baseLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  {accentLine ? <span className={`block ${palette.accent}`}>{accentLine}</span> : null}
                </motion.h1>
                <motion.p
                  className="max-w-lg text-lg leading-8 text-white/82"
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
                  href={`mailto:${contactEmail}`}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition ${palette.button}`}
                >
                  {pageCopy.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center gap-4 pt-2 text-white"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
              >
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
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/88 transition hover:border-white/30 hover:bg-white/10"
                      >
                        <SocialIcon className="h-5 w-5" />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto flex min-h-[33rem] w-full max-w-[32rem] items-center justify-center md:min-h-[40rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <motion.div
                className="absolute left-[6%] top-[18%] h-44 w-36 rotate-[-9deg] overflow-hidden rounded-[1.5rem] border border-white/16 shadow-2xl md:h-52 md:w-40"
                animate={reduceMotion ? { opacity: 1 } : { y: [0, -8, 0], rotate: [-9, -7.8, -9] }}
                transition={reduceMotion ? undefined : { duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundImage: `url(${showcaseImages[0]})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.72))]" />
              </motion.div>
              <motion.div
                className="absolute right-[5%] top-[12%] h-40 w-32 rotate-[8deg] overflow-hidden rounded-[1.45rem] border border-white/16 shadow-2xl md:h-48 md:w-36"
                animate={reduceMotion ? { opacity: 1 } : { y: [0, -10, 0], rotate: [8, 9.2, 8] }}
                transition={reduceMotion ? undefined : { duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundImage: `url(${showcaseImages[1]})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.7))]" />
              </motion.div>
              <motion.div
                className="absolute left-[9%] bottom-[14%] h-44 w-34 rotate-[7deg] overflow-hidden rounded-[1.45rem] border border-white/16 shadow-2xl md:h-48 md:w-36"
                animate={reduceMotion ? { opacity: 1 } : { y: [0, -7, 0], rotate: [7, 8, 7] }}
                transition={reduceMotion ? undefined : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundImage: `url(${showcaseImages[2]})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />
              </motion.div>
              <motion.div
                className="absolute right-[7%] bottom-[18%] h-44 w-34 rotate-[-8deg] overflow-hidden rounded-[1.45rem] border border-white/16 shadow-2xl md:h-48 md:w-36"
                animate={reduceMotion ? { opacity: 1 } : { y: [0, -9, 0], rotate: [-8, -6.8, -8] }}
                transition={reduceMotion ? undefined : { duration: 7.1, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundImage: `url(${showcaseImages[3]})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />
              </motion.div>

              <motion.div
                className="relative z-10 h-[31rem] w-[15.8rem] rotate-[4deg] rounded-[2.8rem] border border-white/18 bg-[#090c11] p-3 shadow-[0_38px_80px_rgba(0,0,0,0.5)] md:h-[38rem] md:w-[19rem]"
                animate={reduceMotion ? { opacity: 1 } : { y: [0, -10, 0], rotate: [4, 4.8, 4] }}
                transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative h-full overflow-hidden rounded-[2.15rem] border border-white/10 bg-[linear-gradient(180deg,#080b10_0%,#0d131c_100%)]">
                  <div className="absolute left-1/2 top-3 h-1.5 w-20 -translate-x-1/2 rounded-full bg-white/15" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
                  <div className="grid h-full grid-cols-3 gap-2 p-4 pt-12">
                    {showcaseImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative overflow-hidden rounded-[0.95rem] border border-white/10"
                        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.68))]" />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-[0.58rem] font-semibold text-white">
                          <Play className="h-2.5 w-2.5 fill-white text-white" />
                          <span>{isPortuguese ? "Analise" : "Breakdown"}</span>
                        </div>
                      </div>
                    ))}
                    {showcaseImages.map((image, index) => (
                      <div
                        key={`${image}-dup-${index}`}
                        className="relative overflow-hidden rounded-[0.95rem] border border-white/10"
                        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.68))]" />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-[0.58rem] font-semibold text-white">
                          <Play className="h-2.5 w-2.5 fill-white text-white" />
                          <span>{isPortuguese ? "Tabela" : "Table"}</span>
                        </div>
                      </div>
                    ))}
                    {showcaseImages.slice(0, 1).map((image, index) => (
                      <div
                        key={`${image}-final-${index}`}
                        className="relative overflow-hidden rounded-[0.95rem] border border-white/10"
                        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.68))]" />
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 text-[0.58rem] font-semibold text-white">
                          <Play className="h-2.5 w-2.5 fill-white text-white" />
                          <span>{isPortuguese ? "Curto" : "Short"}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-8 text-xs text-white/80">
                    <div>
                      <p className="font-semibold lowercase">{pageCopy.floatingTitle.toLowerCase()}</p>
                      <p className="mt-1 uppercase tracking-[0.18em] text-white/45">{pageCopy.floatingSubtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 text-white/65">
                      <span className="h-2 w-2 rounded-full bg-[#d7ff64]" />
                      <span className="h-2 w-2 rounded-full bg-white/28" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

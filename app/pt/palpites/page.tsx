import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PredictionsTool } from "@/components/predictions-tool";

export const metadata: Metadata = { title: "Monte seus palpites | FootAnalysis", description: "Escolha o campeonato, acerte os placares e gere um Shorts personalizado para compartilhar." };

export default function PalpitesPage() { return <div className="pb-20 pt-10 md:pt-16"><Container><div className="mx-auto max-w-7xl"><div className="mb-10 max-w-3xl"><p className="section-kicker">FOOT ANALYSIS · PALPITES</p><h1 className="mt-3 font-display text-6xl uppercase leading-[0.88] tracking-tight text-white md:text-8xl">Monte seus palpites</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/60 md:text-lg">Escolha o campeonato, acerte os placares e gere um Shorts personalizado para compartilhar.</p></div><PredictionsTool /></div></Container></div>; }


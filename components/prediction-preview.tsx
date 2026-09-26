import Image from "next/image";
import type { PredictionFixture, PredictionLeague } from "@/lib/prediction-service";

type Props = { league?: PredictionLeague; round?: string; fixtures: PredictionFixture[]; scores: Record<number, { home: string; away: string }> };

export function PredictionPreview({ league, round, fixtures, scores }: Props) {
  return <aside className="preview-shell">
    <div className="preview-topline"><span>FOOT</span><span>ANALYSIS</span></div>
    <Image src="/footanalysis-logo.png" alt="Foot Analysis" width={76} height={76} className="mx-auto mt-5 rounded-2xl" />
    <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#d7ff64]">Meus palpites</p>
    <h2 className="mt-2 text-center font-display text-3xl uppercase leading-[0.95] text-white">{league?.name ?? "Escolha seu campeonato"}</h2>
    <p className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-white/45">{round ?? "Rodada"}</p>
    <div className="mt-7 space-y-2.5">{fixtures.slice(0, 5).map((fixture) => <div key={fixture.id} className="flex items-center justify-between gap-2 border-b border-white/10 pb-2.5 text-[10px] font-semibold text-white/80"><span className="max-w-[88px] truncate text-right">{fixture.home.name}</span><span className="rounded bg-[#d7ff64] px-2 py-1 text-sm font-black text-[#0b0d12]">{scores[fixture.id]?.home || "–"} <i className="not-italic text-[#0b0d12]/40">×</i> {scores[fixture.id]?.away || "–"}</span><span className="max-w-[88px] truncate">{fixture.away.name}</span></div>)}</div>
    <div className="mt-auto pt-6 text-center"><p className="text-[10px] uppercase tracking-[0.19em] text-white/50">Palpite não é garantia de resultado</p><div className="mt-4 rounded-xl bg-[#d7ff64] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#0b0d12]">Compartilhe seus palpites</div></div>
  </aside>;
}


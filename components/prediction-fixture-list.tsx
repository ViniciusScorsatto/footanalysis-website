"use client";

import type { PredictionFixture } from "@/lib/prediction-service";

type Props = { fixtures: PredictionFixture[]; scores: Record<number, { home: string; away: string }>; onChange: (id: number, side: "home" | "away", value: string) => void };

function TeamBadge({ team }: { team: PredictionFixture["home"] }) {
  return team.logo ? <img src={team.logo} alt="" className="h-8 w-8 rounded-full object-contain" /> : <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold text-white/50">FA</span>;
}

export function PredictionFixtureList({ fixtures, scores, onChange }: Props) {
  return (
    <div className="space-y-3">
      {fixtures.map((fixture) => (
        <article key={fixture.id} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
          <div className="flex min-w-0 items-center justify-end gap-2 text-right"><span className="truncate text-sm font-semibold text-white">{fixture.home.name}</span><TeamBadge team={fixture.home} /></div>
          <div className="flex items-center gap-1.5"><input aria-label={`Placar ${fixture.home.name}`} inputMode="numeric" min="0" max="20" value={scores[fixture.id]?.home ?? ""} onChange={(event) => onChange(fixture.id, "home", event.target.value)} className="score-input" /><span className="text-white/30">×</span><input aria-label={`Placar ${fixture.away.name}`} inputMode="numeric" min="0" max="20" value={scores[fixture.id]?.away ?? ""} onChange={(event) => onChange(fixture.id, "away", event.target.value)} className="score-input" /></div>
          <div className="flex min-w-0 items-center gap-2"><TeamBadge team={fixture.away} /><span className="truncate text-sm font-semibold text-white">{fixture.away.name}</span></div>
          <p className="col-span-3 text-center text-[11px] uppercase tracking-[0.16em] text-white/35">{fixture.kickoff ? new Date(fixture.kickoff).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }) : "Horário a confirmar"}{fixture.venue ? ` · ${fixture.venue}` : ""}</p>
        </article>
      ))}
    </div>
  );
}


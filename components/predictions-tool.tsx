"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowRight, LoaderCircle, RefreshCw } from "lucide-react";
import type { PredictionFixture, PredictionLeague, PredictionRound } from "@/lib/prediction-service";
import { PredictionFixtureList } from "@/components/prediction-fixture-list";
import { PredictionPreview } from "@/components/prediction-preview";
import { PredictionSuccess } from "@/components/prediction-success";

const season = "2026";
const initialLeagues: PredictionLeague[] = [{ id: 71, name: "Brasileirão Série A" }, { id: 72, name: "Brasileirão Série B" }, { id: 75, name: "Brasileirão Série C" }, { id: 76, name: "Brasileirão Série D" }];

function ErrorState({ message, retry }: { message: string; retry: () => void }) { return <div className="rounded-2xl border border-[#ff8159]/30 bg-[#ff8159]/10 p-4 text-sm text-white/75"><div className="flex items-start gap-3"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8159]" /><div><p>{message}</p><button type="button" onClick={retry} className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ff8159]"><RefreshCw className="h-3.5 w-3.5" />Tentar novamente</button></div></div></div>; }
function Loading({ label }: { label: string }) { return <div className="flex items-center gap-2 py-6 text-sm text-white/45"><LoaderCircle className="h-4 w-4 animate-spin text-[#d7ff64]" />{label}</div>; }

export function PredictionsTool() {
  const [leagues, setLeagues] = useState<PredictionLeague[]>(initialLeagues);
  const [leagueId, setLeagueId] = useState(71);
  const [rounds, setRounds] = useState<PredictionRound[]>([]);
  const [round, setRound] = useState("");
  const [fixtures, setFixtures] = useState<PredictionFixture[]>([]);
  const [scores, setScores] = useState<Record<number, { home: string; away: string }>>({});
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("leagues");
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [requestId, setRequestId] = useState("");

  async function loadLeagues() { setLoading("leagues"); setError(""); try { const response = await fetch("/api/predictions/options"); if (!response.ok) throw new Error("Não foi possível carregar os campeonatos."); const data = await response.json(); if (data.leagues?.length) setLeagues(data.leagues); } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível carregar os campeonatos."); } finally { setLoading(""); } }
  async function loadRounds(nextLeagueId = leagueId) { setLoading("rounds"); setError(""); setRounds([]); setFixtures([]); setRound(""); try { const response = await fetch(`/api/predictions/rounds?leagueId=${nextLeagueId}&season=${season}`); if (!response.ok) throw new Error(response.status === 429 ? "Limite de requisições atingido. Aguarde um instante e tente novamente." : "Não foi possível carregar as rodadas."); const data = await response.json(); setRounds(data.rounds ?? []); if (data.rounds?.[0]) setRound(data.rounds[0].name); } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível carregar as rodadas."); } finally { setLoading(""); } }
  async function loadFixtures(nextRound = round) { if (!nextRound) return; setLoading("fixtures"); setError(""); try { const response = await fetch(`/api/predictions/fixtures?leagueId=${leagueId}&season=${season}&round=${encodeURIComponent(nextRound)}`); if (!response.ok) throw new Error("Não foi possível carregar os jogos."); const data = await response.json(); setFixtures(data.fixtures ?? []); } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível carregar os jogos."); } finally { setLoading(""); } }
  useEffect(() => { void loadLeagues(); }, []);
  const selectedLeague = useMemo(() => leagues.find((league) => league.id === leagueId), [leagueId, leagues]);
  const complete = fixtures.length > 0 && fixtures.every((fixture) => scores[fixture.id]?.home !== "" && scores[fixture.id]?.away !== "" && scores[fixture.id]?.home != null && scores[fixture.id]?.away != null);
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  function updateScore(id: number, side: "home" | "away", value: string) { if (!/^\d{0,2}$/.test(value) || Number(value) > 20) return; setScores((current) => ({ ...current, [id]: { home: current[id]?.home ?? "", away: current[id]?.away ?? "", [side]: value } })); }
  async function submit(event: React.FormEvent) { event.preventDefault(); setSubmitError(""); if (!complete) return setSubmitError("Preencha todos os placares antes de gerar seu Short."); if (!emailValid) return setSubmitError("Informe um e-mail válido para receber o vídeo."); try { const response = await fetch("/api/predictions/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ leagueId, season: Number(season), round, email, predictionEdits: fixtures.map((fixture) => ({ fixtureId: fixture.id, homeScore: Number(scores[fixture.id].home), awayScore: Number(scores[fixture.id].away) })) }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error ?? "Não foi possível enviar seus palpites."); setRequestId(data.requestId); } catch (e) { setSubmitError(e instanceof Error ? e.message : "Não foi possível enviar seus palpites."); } }
  if (requestId) return <PredictionSuccess requestId={requestId} />;
  return <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
    <div className="space-y-6">
      <div className="section-panel"><div className="flex items-center justify-between gap-4"><div><p className="section-kicker">01 · escolha o campeonato</p><h2 className="section-title">Onde você quer palpitar?</h2></div><span className="step-index">1/3</span></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{leagues.map((league) => <button key={league.id} type="button" onClick={() => { setLeagueId(league.id); void loadRounds(league.id); }} className={`league-option ${leagueId === league.id ? "league-option-active" : ""}`}>{league.name.replace("Brasileirão ", "")}</button>)}</div>{loading === "leagues" ? <Loading label="Carregando campeonatos…" /> : null}</div>
      <div className="section-panel"><div className="flex items-center justify-between gap-4"><div><p className="section-kicker">02 · rodada</p><h2 className="section-title">Escolha a rodada</h2></div><span className="step-index">2/3</span></div>{loading === "rounds" ? <Loading label="Carregando rodadas…" /> : rounds.length === 0 ? <p className="mt-5 text-sm text-white/45">Nenhuma rodada disponível para este campeonato.</p> : <div className="mt-5 flex flex-wrap gap-2">{rounds.map((item) => <button key={item.name} type="button" onClick={() => { setRound(item.name); void loadFixtures(item.name); }} className={`round-option ${round === item.name ? "round-option-active" : ""}`}>{item.displayName ?? item.name}</button>)}</div>}</div>
      {error ? <ErrorState message={error} retry={() => void loadRounds()} /> : null}
      <div className="section-panel"><div className="flex items-center justify-between gap-4"><div><p className="section-kicker">03 · seus palpites</p><h2 className="section-title">Acerte os placares</h2></div><span className="step-index">3/3</span></div>{loading === "fixtures" ? <Loading label="Carregando jogos…" /> : fixtures.length === 0 ? <p className="mt-5 text-sm text-white/45">Selecione uma rodada para carregar os jogos.</p> : <div className="mt-5"><PredictionFixtureList fixtures={fixtures} scores={scores} onChange={updateScore} /></div>}</div>
      <form onSubmit={submit} className="section-panel"><label htmlFor="email" className="section-kicker">receba seu shorts por e-mail</label><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" className="field-input" required /><button type="submit" disabled={!complete || !emailValid} className="primary-button">Gerar meu Short <ArrowRight className="h-4 w-4" /></button></div>{submitError ? <p className="mt-3 text-sm text-[#ff8159]">{submitError}</p> : <p className="mt-3 text-xs text-white/35">Seus dados são usados apenas para entregar o vídeo personalizado.</p>}</form>
    </div>
    <div className="xl:sticky xl:top-28"><PredictionPreview league={selectedLeague} round={round} fixtures={fixtures} scores={scores} /><p className="mt-4 text-center text-xs text-white/35">Preview atualizado em tempo real · Formato vertical 9:16</p></div>
  </div>;
}

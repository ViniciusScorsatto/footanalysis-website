"use client";

import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export function PredictionSuccess({ requestId }: { requestId: string }) {
  const [copied, setCopied] = useState(false);
  const message = `Recebemos meus palpites no Foot Analysis. Solicitação ${requestId}.`;
  async function share() {
    if (navigator.share) await navigator.share({ title: "Meus palpites Foot Analysis", text: message });
    else { await navigator.clipboard.writeText(message); setCopied(true); }
  }
  return <section className="mx-auto max-w-xl rounded-[2rem] border border-[#d7ff64]/30 bg-[#d7ff64]/[0.08] p-7 text-center shadow-glow md:p-10"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d7ff64] text-[#0b0d12]"><Check /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-[#d7ff64]">Solicitação enviada</p><h1 className="mt-3 font-display text-5xl uppercase leading-none text-white">Recebemos seus palpites</h1><p className="mt-5 text-sm leading-7 text-white/65">Vamos preparar seu Shorts personalizado e enviar o link de download para o seu e-mail.</p><p className="mt-5 rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-sm text-white">ID: {requestId}</p><button type="button" onClick={share} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#d7ff64] px-5 py-3 text-sm font-bold text-[#0b0d12] transition hover:bg-[#efffae]"><Share2 className="h-4 w-4" />{copied ? "Mensagem copiada" : "Compartilhar"}</button>{copied ? <Copy className="mx-auto mt-3 h-4 w-4 text-white/40" /> : null}</section>;
}


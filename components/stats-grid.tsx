import type { LocaleContent } from "@/lib/site-content";

type StatsGridProps = {
  content: LocaleContent;
};

export function StatsGrid({ content }: StatsGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {content.advertise.stats.map((stat) => (
        <article key={stat.label} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">{stat.label}</p>
          <p className="mt-5 font-display text-4xl uppercase leading-none text-mist">{stat.value}</p>
          <p className="mt-4 text-sm leading-6 text-white/68">{stat.note}</p>
        </article>
      ))}
    </div>
  );
}

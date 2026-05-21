import type { LocaleContent } from "@/lib/site-content";

type CoverageGridProps = {
  content: LocaleContent;
  variant?: "pt" | "en";
};

export function CoverageGrid({ content, variant = "pt" }: CoverageGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {content.coverage.items.map((item, index) => (
        <article
          key={item.name}
          className={`group relative overflow-hidden rounded-[2rem] border p-6 transition duration-300 hover:-translate-y-1 ${
            variant === "en"
              ? index % 3 === 0
                ? "border-[#9fb7d1]/40 bg-[#f3f6fa] text-[#13263a]"
                : index % 3 === 1
                  ? "border-[#9fb7d1]/25 bg-[#15324d] text-[#eef4fb]"
                  : "border-[#b84242]/25 bg-[#d94d4d] text-[#f7f3ee]"
              : index % 3 === 0
                ? "border-[#d3a316]/45 bg-[#f4efe4] text-[#0d5a4a]"
                : index % 3 === 1
                  ? "border-white/10 bg-[#0d6b56] text-[#f4efe4]"
                  : "border-[#d3a316]/35 bg-white text-[#145543]"
          }`}
        >
          <div className="absolute right-5 top-5 h-14 w-14 rounded-full border border-current/15 opacity-30" />
          <div
            className={`absolute -bottom-5 -right-5 h-20 w-20 rounded-full ${
              variant === "en" ? "bg-white/10" : "bg-[#d3a316]/20"
            }`}
          />

          <div className="relative space-y-4">
            <p className="text-xs uppercase tracking-[0.26em] opacity-70">{item.tag}</p>
            <h3 className="font-display text-4xl uppercase leading-none tracking-[0.06em]">{item.name}</h3>
            <p className="max-w-xs text-sm leading-7 opacity-80">{item.blurb}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

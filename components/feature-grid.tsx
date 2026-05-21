type Feature = {
  title: string;
  description: string;
};

type FeatureGridProps = {
  items: Feature[];
  accent?: "lime" | "coral";
};

export function FeatureGrid({ items, accent = "lime" }: FeatureGridProps) {
  const accentClass =
    accent === "coral"
      ? "before:bg-coral before:shadow-[0_0_20px_rgba(255,129,89,0.45)]"
      : "before:bg-accent before:shadow-[0_0_20px_rgba(215,255,100,0.45)]";

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-pitch/80 p-6 before:absolute before:left-6 before:top-0 before:h-1 before:w-16 ${accentClass}`}
        >
          <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-mist">{item.title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/72">{item.description}</p>
        </article>
      ))}
    </div>
  );
}

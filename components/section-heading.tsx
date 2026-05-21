type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, description, tone = "light" }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className={`text-sm uppercase tracking-[0.28em] ${tone === "dark" ? "text-[#b38712]" : "text-accent"}`}>
        {eyebrow}
      </p>
      <h2
        className={`font-display text-4xl uppercase leading-none md:text-6xl ${
          tone === "dark" ? "text-[#0d5b4a]" : "text-mist"
        }`}
      >
        {title}
      </h2>
      <p className={`text-base leading-7 md:text-lg ${tone === "dark" ? "text-[#0d5b4a]/75" : "text-white/72"}`}>
        {description}
      </p>
    </div>
  );
}

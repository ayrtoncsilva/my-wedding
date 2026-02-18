interface SectionHeaderProps {
  subtitle: string
  title: string
  description?: string
  /** "default" = terracota (presentes, etc), "sage" = verde (recados) */
  variant?: "default" | "sage"
}

export function SectionHeader({ subtitle, title, description, variant = "default" }: SectionHeaderProps) {
  const isSage = variant === "sage"
  const accent = isSage ? "text-[#1e3c2a]" : "text-primary"
  const accentMuted = isSage ? "bg-[#1e3c2a]/40" : "bg-primary/40"
  const accentDot = isSage ? "bg-[#1e3c2a]" : "bg-primary"
  const desc = isSage ? "text-[#7d5a4a]" : "text-muted-foreground"

  return (
    <div className="mx-auto mb-14 flex max-w-xl flex-col items-center text-center md:mb-20">
      <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${accent}`}>
        {subtitle}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-light tracking-tight text-foreground md:text-5xl md:tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-lg text-sm leading-relaxed ${desc}`}>
          {description}
        </p>
      )}
      <div className="mt-7 flex items-center gap-3">
        <span className={`h-px w-10 ${accentMuted}`} />
        <span className={`h-1.5 w-1.5 rounded-full ${accentDot}`} />
        <span className={`h-px w-10 ${accentMuted}`} />
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-foreground px-6 py-20 text-center">
      <p className="font-serif text-4xl font-light text-white md:text-5xl">
        Samara & Ayrton
      </p>
      <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-white/50">
        29 de Agosto de 2026
      </p>
      <div className="mx-auto mt-8 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-primary/30" />
        <svg
          className="h-4 w-4 text-primary"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        <span className="h-px w-10 bg-primary/30" />
      </div>
    </footer>
  )
}

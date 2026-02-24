export default function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6 bg-bg2">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg italic text-accent">
          David Naimi
        </span>
        <p className="font-sans text-xs text-muted text-center">
          Designed & built with care · {new Date().getFullYear()}
        </p>
        <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          {[
            { label: "GitHub", href: "https://github.com/d88naimi" },
            { label: "LinkedIn", href: "https://linkedin.com/in/davidnaimi" },
            {
              label: "Portfolio",
              href: "https://d88naimi.github.io/davidnaimi",
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${l.label} (opens in new tab)`}
              className="font-sans text-xs text-muted hover:text-accent transition-colors warm-underline"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

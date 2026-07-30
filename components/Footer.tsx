// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline px-6 py-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4">
        <span className="text-[13px] text-muted2">&copy; {year} David Naimi</span>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/davidnaimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted2 transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/d88naimi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted2 transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            GitHub
          </a>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-muted2 transition-colors duration-200 ease-[var(--ease-hover)] hover:text-text focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}

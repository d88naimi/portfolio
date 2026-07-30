import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <p className="text-[13px] uppercase tracking-[0.08em] text-muted2">404</p>
      <h1 className="m-0 text-[clamp(2rem,4vw,3.25rem)] font-[650] tracking-[-0.02em] text-text">
        Page not found.
      </h1>
      <p className="max-w-[480px] text-base leading-[1.6] text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="rounded-pill bg-text px-7 py-3.5 text-[15px] font-semibold text-black transition-opacity duration-200 ease-[var(--ease-hover)] hover:opacity-85"
      >
        Back to home
      </Link>
    </div>
  );
}

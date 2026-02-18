import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Naimi — Senior Frontend Engineer",
  description:
    "Senior Frontend Software Engineer with 7+ years of experience building scalable, high-performance web applications.",
  openGraph: {
    title: "David Naimi — Senior Frontend Engineer",
    description: "React • TypeScript • Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="paper-texture" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

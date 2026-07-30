import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidnaimi.dev"),
  title: "David Naimi — Senior Frontend Engineer",
  description:
    "David Naimi is a senior frontend engineer in San Marcos, CA with 7 years of experience building React and Next.js products, from a check-in platform running across 3,500+ retail locations to AI powered tools.",
  openGraph: {
    title: "David Naimi — Senior Frontend Engineer",
    description:
      "Senior frontend engineer building React and Next.js products that ship. Available for new roles.",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Naimi — Senior Frontend Engineer",
    description:
      "Senior frontend engineer building React and Next.js products that ship.",
    images: ["/og-image.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Naimi",
  jobTitle: "Senior Frontend Engineer",
  url: "https://davidnaimi.dev",
  email: "mailto:d88naimi@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Marcos",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: ["https://linkedin.com/in/davidnaimi", "https://github.com/d88naimi"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Frontend Engineering",
    "AI Integration",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-bg text-text font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

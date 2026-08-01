// app/sitemap.ts
import type { MetadataRoute } from "next";
import { caseStudies } from "@/src/data/case-studies";

const BASE_URL = "https://davidnaimi.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = Object.values(caseStudies).map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: BASE_URL, lastModified: new Date() },
    ...caseStudyRoutes,
  ];
}

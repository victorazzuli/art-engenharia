import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${COMPANY.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}

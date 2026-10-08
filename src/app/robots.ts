import type { MetadataRoute } from "next";
import { COMPANY } from "@/data/company";

export default function robots(): MetadataRoute.Robots {
  if (COMPANY.preview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${COMPANY.url}/sitemap.xml`, host: COMPANY.url };
}

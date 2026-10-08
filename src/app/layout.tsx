import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { COMPANY, WHATSAPP_NUMBER } from "@/data/company";
import { HERO_VIDEO_POSTER } from "@/data/media";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

const title = "Energia solar em Santo André | Art Engenharia Elétrica";
const description =
  "Instalação de energia solar em Santo André e no ABC: projeto, instalação e homologação na Enel por conta da Art Engenharia Elétrica. Nota 4,9 no Google. Simule sua economia.";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: { default: title, template: "%s | Art Engenharia Elétrica" },
  description,
  keywords: ["energia solar Santo André", "placa solar Santo André", "energia solar ABC", "instalação de energia solar", "homologação Enel", "Art Engenharia Elétrica"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pt_BR", url: COMPANY.url, siteName: COMPANY.name, title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: COMPANY.preview ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#070921", width: "device-width", initialScale: 1, viewportFit: "cover" };

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ElectricalContractor", "LocalBusiness"],
  "@id": `${COMPANY.url}/#empresa`,
  name: COMPANY.name,
  alternateName: COMPANY.googleName,
  description,
  url: COMPANY.url,
  telephone: `+${WHATSAPP_NUMBER}`,
  image: `${COMPANY.url}/opengraph-image`,
  logo: `${COMPANY.url}/brand/logo-2048.png`,
  email: COMPANY.email ?? undefined,
  sameAs: [COMPANY.instagram.url, COMPANY.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.state,
    postalCode: COMPANY.address.postalCode,
    addressCountry: "BR",
  },
  hasMap: COMPANY.mapsUrl,
  openingHoursSpecification: Object.entries(COMPANY.hours)
    .filter(([, h]) => h)
    .map(([d, h]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: DAYS[+d], opens: h![0], closes: h![1] })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: COMPANY.rating.value, reviewCount: COMPANY.rating.count, bestRating: 5 },
  areaServed: COMPANY.servedPlaces.map((name) => ({ "@type": "Place", name })),
  knowsAbout: ["Energia solar fotovoltaica", "Homologação Enel", "Instalações elétricas"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${mono.variable}`}>
      <head>
        <link rel="preload" as="image" href={HERO_VIDEO_POSTER.mobile} media="(max-width: 767px)" fetchPriority="high" />
        <link rel="preload" as="image" href={HERO_VIDEO_POSTER.desktop} media="(min-width: 768px)" fetchPriority="high" />
      </head>
      <body>
        <a href="#simulador" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-5 focus:py-3 focus:text-ink">
          Pular para o simulador
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}

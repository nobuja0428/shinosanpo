import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { GaScript } from "@/components/GaScript";
import { absoluteUrl, siteConfig, withBasePath } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.productionUrl),
  title: {
    default: "おさんぽクラブ東京｜時間・予算・気分から選ぶ東京散歩",
    template: "%s｜おさんぽクラブ東京"
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  alternates: { canonical: absoluteUrl("/") },
  robots: { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: siteConfig.siteName,
    title: "おさんぽクラブ東京",
    description: siteConfig.description,
    url: siteConfig.productionUrl,
    images: [{ url: absoluteUrl("/assets/images/hero/hero-tokyo-walk.webp"), width: 1600, height: 900, alt: "東京の街歩きを表現したイメージ" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "おさんぽクラブ東京",
    description: siteConfig.description,
    images: [absoluteUrl("/assets/images/hero/hero-tokyo-walk.webp")]
  },
  icons: { icon: withBasePath("/favicon.svg") }
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.siteName,
  url: siteConfig.productionUrl
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.siteName,
  alternateName: siteConfig.siteSubtitle,
  url: siteConfig.productionUrl,
  inLanguage: "ja"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <a className="skipLink" href="#main">本文へ移動</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileNav />
        <GaScript />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      </body>
    </html>
  );
}

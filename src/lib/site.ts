import type { Lang } from "./i18n";

export const SITE_URL = "https://smngs.io";

export const NAME_EN = "Shota Minegishi";
export const NAME_JA = "峯岸 聖太";

/**
 * The biography shown to search engines and to anything that unfurls a link.
 * Written the way a paper's author blurb is, so it reads correctly wherever it
 * is quoted; the same text serves both languages, since the profile itself is
 * published in English.
 */
export const BIO =
  "Shota Minegishi received the B.S. and M.E. degrees in Information and " +
  "Communication Sciences from Sophia University, Japan in 2022 and 2024, " +
  "respectively. He is currently a doctoral course student of the Faculty of " +
  "Science and Technology, Sophia University, Japan. His current research " +
  "interests include computer networks.";

export const PROFILES = [
  "https://github.com/smngs",
  "https://orcid.org/0009-0003-1426-2431",
  "https://researchmap.jp/s_minegishi",
];

/** schema.org Person, so the bio can be picked up as structured data too. */
export function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: lang === "ja" ? NAME_JA : NAME_EN,
    alternateName: lang === "ja" ? NAME_EN : NAME_JA,
    url: lang === "ja" ? SITE_URL : `${SITE_URL}/en`,
    image: "https://github.com/smngs.png",
    description: BIO,
    jobTitle: "Doctoral Course Student",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Sophia University",
      url: "https://www.sophia.ac.jp/",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Sophia University",
      url: "https://www.sophia.ac.jp/",
    },
    knowsAbout: ["Computer Networks", "IPFS", "Video Streaming"],
    sameAs: PROFILES,
  };
}

/**
 * Page metadata for one language. Both roots carry the same title and bio —
 * the profile reads in English either way — and differ only in the locale they
 * declare and in which URL each calls its own.
 */
export function metadataFor(lang: Lang, path = "") {
  const canonical = lang === "ja" ? path || "/" : `/en${path}`;
  const title = `${NAME_EN} (@smngs)`;

  return {
    title: { default: title, template: `%s | ${NAME_EN}` },
    description: BIO,
    metadataBase: new URL(SITE_URL),
    icons: { icon: "/favicon.png" },
    alternates: {
      canonical,
      languages: {
        ja: path || "/",
        en: `/en${path}`,
        "x-default": path || "/",
      },
    },
    openGraph: {
      title,
      description: BIO,
      url: canonical,
      siteName: "smngs.io",
      locale: lang === "ja" ? "ja_JP" : "en_US",
      type: "website" as const,
    },
    twitter: { card: "summary" as const, title, description: BIO },
  };
}

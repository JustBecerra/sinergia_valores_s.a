import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "Sinergia Valores S.A",
  tagline: "El puente hacia tu nuevo hogar Sinergia Valores.",
  description:
    "Garantiza tu futuro hogar en segundos - Solicita una fianza con nosotros.",
  description_short: "Garantiza tu futuro hogar en segundos.",
  url: "https://screwfast.uk",
  author: "Emil Gulamov",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}`,
  description:
    "Sinergia Valores Sistema de fianzas de alquiler 100 % digital con calificacion en 24 hs.",
  image: ogImageSrc,
};

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

export const ArrepentimientoFormInfo = {
  title: "Arrepentimiento",
  description:
    "Solicitar la revocación de un producto o servicio contratado con Sinergia Valores S.A. dentro de los 10 (diez) días corridos contados a partir de la fecha de recibido el contrato o de la disponibilidad efectiva del producto o servicio, lo que suceda último; de esta manera, podrás arrepentirte y deshacer la contratación del producto/servicio solicitado en ese plazo informado.",
  name: "Nombre Completo",
  // lastname: "Apellido",
  nacionality: "Nacionalidad",
  idnumber: "Documento y Numero",
  phonenumber: "Telefono/Celular de contacto",
  mail: "Mail",
  serviceorproduct: "Servicio o Producto",
  sendtext: "Enviar",
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

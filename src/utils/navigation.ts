const navBarLinks = [
  { name: "Inicio", url: "/" },
  { name: "Solicitud", url: "/solicitud" },
  { name: "Ayuda", url: "/ayuda" },
  { name: "Calculadora", url: "/calculadora" },
  { name: "Contacto", url: "/contacto" },
];

const footerLinks = [
  {
    section: "Redes Sociales",
    links: [
      {
        name: "facebookFooter",
        url: "https://www.facebook.com/profile.php?id=61561059611052&mibextid=LQQJ4d",
      },
      {
        name: "tiktokFooter",
        url: "https://www.tiktok.com/@sinergia.valores?_t=8o3X7xTxBri&_r=1",
      },
      {
        name: "instagramFooter",
        url: "https://www.instagram.com/sinergiavalores/?hl=es-la",
      },
    ],
  },
  {
    section: "Servicios",
    links: [
      { name: "Calculadora", url: "/calculadora" },
      { name: "Solicitud", url: "/solicitud" },
    ],
  },
];

const whatsappInfo = {
  PhoneNumber: "+5492216145726",
  Message: `Hola, me estoy comunicando del sitio web de Sinergia valores para hacer una consulta.`,
};

export default {
  navBarLinks,
  footerLinks,
  whatsappInfo,
};

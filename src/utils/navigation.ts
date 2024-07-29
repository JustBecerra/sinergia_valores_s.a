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
      { name: "xFooter", url: "https://twitter.com/" },
    ],
  },
  {
    section: "Servicios",
    links: [
      // { name: "Sobre Nosotros", url: "/nosotros" },
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

const navBarLinks = [
  { name: "Inicio", url: "/" },
  { name: "Solicitud", url: "/solicitud" },
  { name: "Calculadora", url: "/calculadora" },
  { name: "Contacto", url: "/contacto" },
];

const footerLinks = [
  {
    section: "Redes Sociales",
    links: [
      { name: "facebookFooter", url: "https://www.facebook.com/" },
      { name: "xFooter", url: "https://twitter.com/" },
      {
        name: "githubFooter",
        url: "https://github.com/mearashadowfax/ScrewFast",
      },
      { name: "googleFooter", url: "https://www.google.com/" },
      { name: "slackFooter", url: "https://slack.com/" },
    ],
  },
  {
    section: "Servicios",
    links: [
      { name: "Sobre Nosotros", url: "#" },
      { name: "Calculadora", url: "/blog" },
      { name: "Opiniones", url: "#" },
    ],
  },
];

const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
  github: "https://github.com/mearashadowfax/ScrewFast",
  google: "https://www.google.com/",
  slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};

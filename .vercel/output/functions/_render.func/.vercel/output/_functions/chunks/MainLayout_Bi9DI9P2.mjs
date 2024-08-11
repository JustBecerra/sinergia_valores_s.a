import { c as createAstro, a as createComponent, r as renderTemplate, u as unescapeHTML, b as addAttribute, d as renderComponent, F as Fragment, m as maybeRenderHead, e as renderSlot, f as renderHead } from './astro/server_Cp-G_wo0.mjs';
import 'kleur/colors';
import { a as getImage } from './_astro_assets_DJyipskQ.mjs';
import { i as icon } from './icon_BpBPyDj6.mjs';
import 'clsx';
import { FaWhatsapp, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
/* empty css                         */
/* empty css                                   */

const ogImageSrc = new Proxy({"src":"/_astro/social.CWnIx2-K.png","width":1200,"height":600,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/social.png";
							}
							
							return target[name];
						}
					});

const SITE = {
  title: "Sinergia Valores S.A",
  tagline: "El puente hacia tu nuevo hogar Sinergia Valores.",
  description: "Garantiza tu futuro hogar en segundos - Solicita una fianza con nosotros.",
  description_short: "Garantiza tu futuro hogar en segundos.",
  url: "https://www.sinergiavalores.com",
  author: "Justo Becerra"
};
const SEO = {
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
      description: SITE.description
    }
  }
};
const ArrepentimientoFormInfo = {
  title: "Arrepentimiento",
  description: "Solicitar la revocación de un producto o servicio contratado con Sinergia Valores S.A. dentro de los 10 (diez) días corridos contados a partir de la fecha de recibido el contrato o de la disponibilidad efectiva del producto o servicio, lo que suceda último; de esta manera, podrás arrepentirte y deshacer la contratación del producto/servicio solicitado en ese plazo informado.",
  name: "Nombre Completo",
  // lastname: "Apellido",
  nacionality: "Nacionalidad",
  idnumber: "Documento y Numero",
  phonenumber: "Telefono/Celular de contacto",
  mail: "Mail",
  serviceorproduct: "Servicio o Producto",
  sendtext: "Enviar"
};
const questionsFrecuentes = [
  {
    question: "¿QUIENES SOMOS?",
    answer: "GRUPO DE PROFESIONALES MULTIDISCIPLINARIOS DEL RAMO LEGAL Y CONTABLE DEDICADOS A LA GESTIÓN DE SERVICIOS FINANCIEROS."
  },
  {
    question: "¿QUE ES LA FIANZA PARA ALQUILER DE SINERGIA VALORES S.A.?",
    answer: "¿QUE ES LA FIANZA PARA ALQUILER DE SINERGIA VALORES S.A.? ES UN AVAL NO PROPIETARIO A PARTIR DE UN EXHAUSTIVO ANÁLISIS CREDITICIO SOBRE EL POTENCIAL INQUILINO. EN CASO DE INCUMPLIMIENTO, A DIFERENCIA DE LAS GARANTÍAS PROPIETARIAS TRADICIONALES, SINERGIA VALORES S.A. CUBRE LAS OBLIGACIONES PENDIENTES Y LLEVA ADELANTE SIN COSTOS PARA EL PROPIETARIO TODAS LAS ACCIONES JUDICIALES Y EXTRAJUDICIALES NECESARIAS HASTA LA RESTITUCIÓN DEL INMUEBLE."
  },
  {
    question: "¿QUE DOCUMENTACIÓN ES NECESARIA PARA APLICAR EN EL SISTEMA DE FIANZAS PARA ALQUILER DE SINERGIA VALORES S.A.?",
    answer: "EN LA OPCIÓN DE REQUISITOS SE ENCUENTRA LA DOCUMENTACIÓN NECESARIA PARA EMPLEADOS, MONOTRIBUTISTAS, RESPONSABLES INSCRIPTOS PERSONA FÍSICA Y PERSONAS JURÍDICAS. (VÍNCULO REQUISITOS)"
  },
  {
    question: "¿QUE ES UN CO-GARANTE?",
    answer: "ES UNA PERSONA SELECCIONADA POR EL INQUILINO QUE AYUDA A CALIFICAR Y APLICAR PARA LA FIANZA DE SINERGIA VALORES S.A. DEBE TENER INGRESOS DEMOSTRABLES Y FIRMA JUNTO CON EL INQUILINO. NO ES NECESARIO QUE VIVAN EN LA PROPIEDAD."
  },
  {
    question: "¿CUANDO SE ABONA LA FIANZA?",
    answer: "SE ABONA CUANDO ESTE TODO LISTO PARA FIRMARSE EL CONTRATO DE ALQUILER."
  },
  {
    question: "¿QUE SUCEDE SI LA FIANZA ES ABONADA PERO LA OPERACIÓN INMOBILIARIA ES CANCELADA? ",
    answer: "SI LA FIANZA FUE ABONADA, PERO LA OPERACIÓN ES CANCELADA, POR NOVENTA DÍAS (90) ES POSIBLE UTILIZAR EL MONTO ABONADO PARA LA FIANZA DE ALQUILER DE OTRA PROPIEDAD Y SE ABONA SOLO LA DIFERENCIA DE LA FIANZA. SI NO SE REALIZA OTRA OPERACIÓN DE ALQUILER, SE PROCEDE A RESTITUIR EL VALOR ABONADO POR EL CLIENTE."
  },
  {
    question: "¿QUE NECESITO PARA COTIZAR EL SERVICIO?",
    answer: "ES POSIBLE MEDIANTE EL COTIZADOR GRATUITO (VINCULO A LA CALCULADORA) TENER UN PRESUPUESTO APROXIMADO.  EL PRESUPUESTO FINAL SE CONCLUYE EN BASE A LOS VALORES REALES DEL CONTRATO DE ALQUILER Y LA DOCUMENTACION REQUERIDA."
  },
  {
    question: "¿QUE ES Y QUE VENTAJA TIENE EL BUEN CUMPLIMIENTO?",
    answer: "SI EL INQUILINO ABONA EN TERMINO TANTO EL ALQUILER COMO LAS EXPENSAS, EL MISMO DISPONDRA DE UN DESCUENTO POR BUEN CUMPLIMIENTO EN LA RENOVACION DEL CONTRATO DE FIANZA PARA SU PROXIMO ALQUILER. EL MISMO ES VALIDO POR SEIS MESES (6), Y EN CASO DE NO UTILIZARLO ES POSIBLE EJECUTARSE SOBRE REFERIDO DE PARTE DEL CLIENTE."
  },
  {
    question: "¿COMO SE ABONA EL SERVICIO?",
    answer: "ALTERNATIVAS DE PAGO DISCRIMINADAS EN LA PAGINA Y OPCIONES DE FINANCIACION A MEDIDA. ES POSIBLE EN EFECTIVO O TRANSFERENCIA."
  },
  {
    question: "¿ES NECESARIO APORTAR INFORMACION DEL INMUEBLE O INMOBILIARIA AL MOMENTO DE PRESUPUESTAR EL SERVICIO?",
    answer: "NO, SOLO ES NECESARIO EL VALOR DE ALQUILER Y EXPENSAS, Y DE MANERA GRATUITA ES POSIBLE SABER SI CALIFICA PARA EL SERVICIO."
  },
  {
    question: "¿CUANTO TIEMPO TARDA EN APROBARSE LA FIANZA?",
    answer: "EL INQUILINO TIENE PREAPROBACION INMEDIATA Y EN 24 HS HABILE A APARTIR DE LA RECEPCION DE LA DOCUMENTACION COMPLETA TIENE LA APROBACION FINAL."
  },
  {
    question: "¿ES POSIBLE COORDINAR UNA REUNION?",
    answer: "SI, COORDINAMOS UNA REUNION PRESENCIAL O VIA ZOOM. EN CASO DE SER PRESENCIAL, ES POSIBLE COORDINARLAS EN NUESTRAS OFICINAS."
  },
  {
    question: "¿ES OBLIGATORIO DIRIGIRSE PERSONALMENTE A FIRMAR EL CONTRATO DE FIANZA?",
    answer: "NO ES OBLIGATORIO. DISPONEMOS DE 3 PROCEDIMIENTOS DE FIRMA: 1) PROCEDIMIENTO SEMI-PRESENCIAL, CUYA FIRMA ES OLOGRAFA AL MOMENTO DE LA FIRMA DEL CONTRATO DE ALQUILER, 2) PROCEDIMIENTO ONLINE, CUYA FIRMA Y CERTIFICACION ES DIGITAL POR MEDIO DE APLICACIÓN Y 3) PROCEDIMIENTO PRESENCIAL, CUYA FIRMA ES OLOGRAFA EN NUESTRAS OFICINAS."
  },
  {
    question: "¿COMO SE SI TENGO EL AVAL DE SINERGIA VALORES S.A.?",
    answer: `ES SIMPLE, LE ENVIAMOS AL MAIL DEL PROPIETARIO, INQUILINO E INMOBILIARIA EL AVAL NUESTRO CON FIRMA DIGITAL. 
    LA VALIDEZ DE LA FIRMA DIGITAL ES POSIBLE VERIFICARSE EN 
    <a target="_blank" href="https://www.argentina.gob.ar/jefatura/innovacion-publica/innovacion-administrativa/firma-digital/plataforma-de-firma-digital">Verificación Secretaria de Modernización</a>. 
    PARA MAS INFORMACION REFERIDA A LA FIRMA DIGITAL EN LA REPUBLICA ARGENTINA PODÉS VISITAR EL SITIO DE LA SECRETARIA DE MODERNIZACION DE PRESIDENCIA DE LA NACION. <a target="_blank" href="https://www.argentina.gob.ar/jefatura/innovacion-publica/innovacion-administrativa/firma-digital/plataforma-de-firma-digital">Información Firma Digital</a>.`
  },
  {
    question: "¿COMO SE GESTIONA EL RECLAMO ANTE INCLUMPLIENTO POR PARTE DEL INQUILINO?",
    answer: `SE REALIZA POR MEDIO DE LA PAGINA DE SINERGIA VALORES S.A. (VINCULO PLANILLA POR INCUMPLIMIENTO).`
  },
  {
    question: "¿TIENE EL PROPIETARIO GASTOS JUDICIALES O EXTRAJUDICIALES EN CASO DE INCUMPLIMIENTO?",
    answer: `NO, SINERGIA VALORES S.A. SE HACE CARGO DEL 100% DE LOS GASTOS JUDICIALES Y EXTRAJUDICIALES EN CASO DE INCUMPLIMIENTO.`
  },
  {
    question: "¿TIENE EL PROPIETARIO GASTOS POR LA GESTION DE LA FIANZA?",
    answer: `NO, EL INQUILINO ABONA EL 100 % DEL GASTO POR LA GESTION DE LA FIANZA.`
  },
  {
    question: "¿QUE COBERTURA Y PLAZO TIENE LA FIANZA DE SINERGIA VALORES S.A.?",
    answer: `LA MISMA CUBRE EL MONTO DE ALQUILER Y EXPENSAS DETALLADOS EN EL CONTRATO DE ALQUILER POR EL CUAL SE GESTIONA LA FIANZA HASTA LA RESTITUCION DEL INMUEBLE. EN EL CASO DE LAS EXPENSAS, COMO PUEDEN TENER UNA VARIACION LA MISMA ES AFIANZADA EN HASTA UN TREINTA POR CIENTO (30%) EN AJUSTE SEMESTRAL QUE PUEDA SUFRIR.`
  },
  {
    question: "¿ES POSIBLE COORDINAR UNA REUNION?",
    answer: `SI, COORDINAMOS UNA REUNION PRESENCIAL O VIA ZOOM. EN CASO DE SER PRESENCIAL, ES POSIBLE COORDINARLAS EN NUESTRAS OFICINAS.`
  },
  {
    question: "¿COMO SE SI MI FUTURO INQUILINO ESTA AVALADO POR SINERGIA VALORES S.A? ",
    answer: `UNA VEZ VERIFICADO Y CALIFICADO EL INQUILINO, Y EN CASO DE AVANZAR CON LA FIRMA DEL CONTRATO DE ALQUILER, NUESTRO EQUIPO ENVIA POR E-MAIL EL CONTRATO DE FIANZA CON FIRMA DIGITAL DE SINERGIA VALORES S.A. POR AL INQUILINO, PROPIETARIO E INMOBILIARIA. ESTO SE GESTIONA ANTES DE LA FIRMA DEL CONTRATO DE ALQUILER, PARA QUE TODAS LAS PARTES PUEDAN REVISARLAS CON ANTICIPACION.`
  },
  {
    question: "¿COMO PUEDO VERIFICAR SI LA FIANZA QUE RECIBI POR E-MAIL ES VALIDA LEGALMENTE?",
    answer: `EL CONTRATO DE FIANZA EMITIDO POR SINERGIA VALORES S.A ES FIRMADO DIGITALMENTE. LA VALIDEZ DE LA FIRMA DIGITAL ES POSIBLE VERIFICARSE EN Verificación Secretaria de Modernización. PARA MAS INFORMACION REFERIDA A LA FIRMA DIGITAL EN LA REPUBLICA ARGENTINA PODÉS VISITAR EL SITIO DE LA SECRETARIA DE MODERNIZACION DE PRESIDENCIA DE LA NACION. Información Firma Digital.`
  },
  {
    question: "¿QUE VENTAJAS TIENE FORMAR PARTE DE LA RED DE INMOBILIARIAS ADHERIDAS DE SINERGIA VALORES S.A.?",
    answer: `EN PRIMERO LUGAR, LOS INMUEBLES EN ALQUILER SON PUBLICADOS EN NUESTRA PAGINA Y REDES SOCIALES. EN SEGUNDO LUGAR, ESTAMOS PRESENTES POR MEDIOS PUBLICITARIOS, Y FORMARIAN PARTE DE NUESTROS ANUNCIOS. POR ULTIMO, LA INMOBILIARIA QUE SE ADHIERA AL SISTEMA DE FIANZAS DE SINERGIA VALORES S.A, FORMA PARTE DEL SISTEMA DE COMISIONES POR VOLUMEN DE CONTRATOS CONCERTADOS.`
  },
  {
    question: "¿QUE VENTAJAS TIENE EL SISTEMA DE FIANZAS DE SINERGIA VALORES S.A.?",
    answer: `LOS INQUILINOS SON ANALIZADOS DE MANERA EXHAUSTIVA EN MATERIA FINANCIERA Y DE HISTORIAL CREDITICIO, POR LO QUE TIENEN RECORD FINANCIERO OPTIMO. A SU VEZ SINERGIA VALORES S.A. PROVEE LIQUIDEZ INMEDIATA EN CASO INCUMPLIMIENTOS POR PARTE DEL INQUILINO HASTA LA RESTITUCION DEL BIEN. EL EQUIPO DE SINERGIA VALORES S.A. SE HACE CARGO DE EL PROCEDIMIENTO SIN GASTOS PARA LA INMOBILIARIA NI PROPIETARIO`
  },
  {
    question: "¿ES POSIBLE COORDINAR UNA REUNION?",
    answer: `SI, COORDINAMOS UNA REUNION PRESENCIAL O VIA ZOOM. EN CASO DE SER PRESENCIAL, ES POSIBLE COORDINARLAS EN LA INMOBILIARIA O EN NUESTRAS OFICINAS.`
  },
  {
    question: "¿SE UTILIZA EL MISMO MODELO DE CONTRATO DE ALQUILER?",
    answer: `SI, EL EQUIPO DE SIENRGIA VALORES S.A. SE COMUNICA CON LA INMOBILIARIA PARA AGILIZAR EL PROCEDIMIENTO A PARTIR DE UNA CLAUSUAL ANEXO, LA CUAL FORMA PARTE DEL CONTRATO DE FIANZA Y SE INCORPORA AL CONTRATO DE ALQUILER.`
  },
  {
    question: "¿QUE CANALES DE COMUNICACIÓN TENEMOS ANTE UNA CONSULTA TECNICA?",
    answer: `CONTAMOS CON CANALES DE COMUNICACIÓN VIA TELEFONICA, MAIL INSTITUCIONAL, PAGINA WEB Y OFICINAS.`
  },
  {
    question: "¿COMO PUEDO VERIFICAR SI LA FIANZA QUE RECIBI POR E-MAIL ES VALIDA LEGALMENTE?",
    answer: `EL CONTRATO DE FIANZA EMITIDO POR SINERGIA VALORES S.A ES FIRMADO DIGITALMENTE. LA VALIDEZ DE LA FIRMA DIGITAL ES POSIBLE VERIFICARSE EN Verificación Secretaria de Modernización. PARA MAS INFORMACION REFERIDA A LA FIRMA DIGITAL EN LA REPUBLICA ARGENTINA PODÉS VISITAR EL SITIO DE LA SECRETARIA DE MODERNIZACION DE PRESIDENCIA DE LA NACION. Información Firma Digital.`
  },
  {
    question: "¿DEBO COORDINAR LA FIRMA DEL CONTRATO DE LOCACION CON SINERGIA VALORES S.A.?",
    answer: `NO, SIGUE SIENDO COORDINADO POR LA INMOBILIARIA A SU CRITERIO Y EN BENEFICIO DE LA MEJOR ATENCION DE SUS CLIENTES.`
  }
];
const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}`,
  description: "Sinergia Valores Sistema de fianzas de alquiler 100 % digital con calificacion en 24 hs.",
  image: ogImageSrc
};

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$5 = createAstro("https://sinergiavalores.com");
const $$Meta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Meta;
  const defaultProps = {
    meta: SITE.description,
    structuredData: SEO.structuredData
  };
  const { meta = defaultProps.meta, structuredData = defaultProps.structuredData } = Astro2.props;
  const URL = `${Astro2.site}`;
  const author = SITE.author;
  const canonical = Astro2.url.href;
  Astro2.url.pathname;
  const ogTitle = OG.title;
  const ogDescription = OG.description;
  const socialImageRes = await getImage({
    src: OG.image,
    width: 1200,
    height: 600
  });
  const socialImage = Astro2.url.origin + socialImageRes.src;
  const languages = {
    en: ""
  };
  function createHref(lang, prefix, path) {
    const hasPrefix = path.startsWith(`/${prefix}/`);
    const basePath2 = hasPrefix ? path : `/${prefix}${path}`;
    const normalizedBasePath = basePath2.replace(/\/\/+/g, "/");
    return `${URL.slice(0, -1)}${normalizedBasePath}`;
  }
  const fullPath = Astro2.url.pathname;
  const alternateLanguageLinks = Object.entries(languages).map(([lang, prefix]) => {
    const basePath2 = fullPath;
    const href = createHref(lang, prefix, basePath2);
    return `<link rel="alternate" hreflang="${lang}" href="${href}" />`;
  }).join("\n");
  const appleTouchIcon = await getImage({
    src: icon,
    width: 180,
    height: 180,
    format: "png"
  });
  return renderTemplate`<!-- Inject structured data into the page if provided. This data is formatted as JSON-LD, a method recommended by Google for structured data pass:
     https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data -->${structuredData && renderTemplate(_a$2 || (_a$2 = __template$2(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(structuredData)))}<!-- Define the character set, description, author, and viewport settings --><meta charset="utf-8"><meta${addAttribute(meta, "content")} name="description"><meta name="web_author"${addAttribute(author, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="canonical"${addAttribute(canonical, "href")}>${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(alternateLanguageLinks)}` })}<!-- Facebook Meta Tags --><meta property="og:locale" content="en_US"><meta property="og:url"${addAttribute(URL, "content")}><meta property="og:type" content="website"><meta property="og:title"${addAttribute(ogTitle, "content")}><meta property="og:site_name"${addAttribute(SITE.title, "content")}><meta property="og:description"${addAttribute(ogDescription, "content")}><meta property="og:image"${addAttribute(socialImage, "content")}><meta content="1200" property="og:image:width"><meta content="600" property="og:image:height"><meta content="image/png" property="og:image:type"><!-- Twitter Meta Tags --><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain"${addAttribute(URL, "content")}><meta property="twitter:url"${addAttribute(URL, "content")}><meta name="twitter:title"${addAttribute(ogTitle, "content")}><meta name="twitter:description"${addAttribute(ogDescription, "content")}><meta name="twitter:image"${addAttribute(socialImage, "content")}><!-- Links to the webmanifest and sitemap --><link rel="manifest" href="/manifest.json"><!-- https://docs.astro.build/en/guides/integrations-guide/sitemap/ --><link rel="sitemap" href="/sitemap-index.xml"><!-- Links for favicons --><link href="/favicon.ico" rel="icon" sizes="any" type="image/x-icon"><!-- <link href={faviconSvg.src} rel="icon" type="image/svg+xml" sizes="any" /> --><meta name="mobile-web-app-capable" content="yes"><link${addAttribute(appleTouchIcon.src, "href")} rel="apple-touch-icon"><link${addAttribute(appleTouchIcon.src, "href")} rel="shortcut icon"><!-- Set theme color --><meta name="theme-color" content="#facc15">`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/Meta.astro", void 0);

const $$ThemeIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- Dark Theme Toggle Button --><!-- This button is shown when the light theme is active, and when clicked, it switches the theme to dark -->${maybeRenderHead()}<button type="button" aria-label="Dark Theme Toggle" class="hs-dark-mode group flex h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-200 hover:text-blue-50 hs-dark-mode-active:hidden dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-yellow-500 dark:focus:outline-none" data-hs-theme-click-value="dark"> <!-- The SVG displayed shows an abstract icon that represents the moon (dark theme) --> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg> <!-- Light Theme Toggle Button --> <!-- This button is hidden by default and only appears when the dark theme is active, when clicked, it switches to the light theme --> </button> <button type="button" aria-label="Light Theme Toggle" class="hs-dark-mode group hidden h-8 w-8 items-center justify-center rounded-full font-medium text-neutral-600 outline-none ring-zinc-500 transition duration-300 hover:text-blue-50 hs-dark-mode-active:flex dark:text-neutral-400 dark:ring-zinc-200 dark:hover:bg-neutral-700 dark:hover:text-yellow-500 dark:focus:outline-none" data-hs-theme-click-value="light"> <!-- The SVG displayed shows a standard sun icon that stands for the light theme --> <svg class="h-4 w-4 flex-shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 8a2 2 0 1 0 4 4"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg> </button>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ThemeIcon.astro", void 0);

const $$Astro$4 = createAstro("https://sinergiavalores.com");
const $$NavLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { url, name } = Astro2.props;
  return renderTemplate`<!--
Re-usable link component for navigation bar. Highlights the active link
by comparing the current URL with the href of each link.
We assign an ID matching the URL for easy reference in our script.
If URL is '/' (home page), assign ID as 'home' 
-->${maybeRenderHead()}<a${addAttribute(url === "/" ? "home" : url.replace("/", ""), "id")}${addAttribute(url, "href")} data-astro-prefetch class="rounded-lg font-gotham text-base text-neutral-600 outline-none ring-zinc-500 hover:text-neutral-500 focus-visible:ring dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-neutral-500 dark:focus:outline-none md:py-3 md:text-sm 2xl:text-base"> ${name} </a> `;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/links/NavLink.astro", void 0);

const navBarLinks = [
  { name: "Inicio", url: "/" },
  { name: "Solicitud", url: "/solicitud" },
  { name: "Ayuda", url: "/ayuda" },
  { name: "Calculadora", url: "/calculadora" },
  { name: "Contacto", url: "/contacto" }
];
const footerLinks = [
  {
    section: "Redes Sociales",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61561059611052&mibextid=LQQJ4d" },
      { name: "Twitter", url: "https://twitter.com/" },
      { name: "Instagram", url: "https://www.instagram.com/sinergiavalores/" },
      { name: "Tiktok", url: "https://www.tiktok.com/@sinergia.valores?_t=8o3X7xTxBri&_r=1" }
    ]
  },
  {
    section: "Servicios",
    links: [
      { name: "Ayuda", url: "/ayuda" },
      { name: "Calculadora", url: "/calculadora" },
      { name: "Solicitud", url: "/solicitud" }
    ]
  }
];
const whatsappInfo = {
  PhoneNumber: "+5492216145726",
  Message: `Hola, me estoy comunicando del sitio web de Sinergia valores para hacer una consulta.`
};
const enStrings = {
  navBarLinks,
  footerLinks,
  whatsappInfo
};

const $$Astro$3 = createAstro("https://sinergiavalores.com");
const $$LightModeBrandLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LightModeBrandLogo;
  const { width, height } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"${addAttribute(width || "120", "width")}${addAttribute(height || "60", "height")} height="1080.1551018097548" viewBox="0 0 3162.368325463131 1080.1551018097548"> <g transform="scale(8.118416273156555) translate(10, 10)"> <defs id="SvgjsDefs1045"><linearGradient id="SvgjsLinearGradient1050"><stop id="SvgjsStop1051" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1052" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1053" stop-color="#8f5e25" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient1054"><stop id="SvgjsStop1055" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1056" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1057" stop-color="#8f5e25" offset="1"></stop></linearGradient></defs><g id="SvgjsG1046" transform="matrix(1.3075284239835347,0,0,1.3075284239835347,-27.526859060533795,-4.236635009339761)" fill="url(#SvgjsLinearGradient1050)"><g xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"><g transform="translate(0 -96)"><g><path d="M 21.633,34.925 C 24.973,46.855 40.837,53.71 46.922,66.223 C 49.866,72.279 48.49,83.461 43.464,87.939 C 43.197,88.178 42.09,90.326 43.217,89.521 C 54.416,81.327 63.521,70.509 59.309,60.068 C 53.464,45.577 38.409,38.34 38.519,23.585 C 38.566,17.447 43.088,12.523 48.838,7.375 L 49.073,6.299 C 34.143,10.56 17.742,21.028 21.633,34.925 Z M 59.314,18.723 C 67.987,26.524 73.282,31.263 71.043,40.298 C 73.766,36.119 76.295,30.323 74.135,25.806 C 72.203,21.769 70.28,18.956 63.244,15.02 C 59.515,12.935 56.712,10.677 54.37,6.898 C 54.248,10.853 55.011,14.852 59.314,18.723 Z M 49.686,32.153 C 53.003,38.255 57.845,42.622 62.538,48.882 C 65.869,53.325 68.92,60.704 65.731,66.728 L 65.937,67.016 C 70.824,61.556 71.028,52.654 69.495,46.059 C 67.086,35.69 58.5,31.5 53.511,23.918 C 51.557,20.948 50.446,17.311 51,13.5 C 45.461,18.021 46.717,26.69 49.686,32.153 Z" stroke-linejoin="miter" stroke-linecap="round" stroke="none" stroke-width="0.75" fill="url(#SvgjsLinearGradient1050)" marker-start="none" marker-end="none" stroke-miterlimit="79.8403193612775"></path></g></g></g></g><g id="SvgjsG1047" transform="matrix(0.932482275033653,0,0,0.932482275033653,89.55240804555596,42.98324525360482)" fill="url(#SvgjsLinearGradient1054)"><path d="M6.3 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M20.6745 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M29.729 5.720000000000001 l5.96 9.58 l0.04 0 l0 -9.58 l2.94 0 l0 14.28 l-3.14 0 l-5.94 -9.56 l-0.04 0 l0 9.56 l-2.94 0 l0 -14.28 l3.12 0 z M55.283500000000004 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M68.438 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M67.33800000000001 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M84.7525 5.380000000000001 c1.6267 0 3.0066 0.47336 4.14 1.42 s1.76 2.1534 1.88 3.62 l-3 0 c-0.18666 -0.8 -0.54666 -1.4 -1.08 -1.8 s-1.18 -0.6 -1.94 -0.6 c-1.2267 0 -2.18 0.44334 -2.86 1.33 s-1.02 2.0766 -1.02 3.57 c0 1.4667 0.34666 2.63 1.04 3.49 s1.64 1.29 2.84 1.29 c2.0534 0 3.1866 -1.0267 3.4 -3.08 l-3.16 0 l0 -2.34 l6 0 l0 7.72 l-2 0 l-0.32 -1.62 c-1 1.3067 -2.3066 1.96 -3.92 1.96 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64 -4.0234 1.92 -5.43 s2.98 -2.11 5.1 -2.11 z M99.847 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M112.9015 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M111.2415 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M133.09050000000002 5.720000000000001 l3.18 10.04 l0.04 0 l3.22 -10.04 l3.24 0 l-4.74 14.28 l-3.54 0 l-4.64 -14.28 l3.24 0 z M153.365 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M151.705 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M166.25950000000003 5.720000000000001 l0 11.64 l6.96 0 l0 2.64 l-10.1 0 l0 -14.28 l3.14 0 z M184.55400000000003 5.380000000000001 c2.1066 0 3.8034 0.7 5.09 2.1 s1.93 3.2134 1.93 5.44 c0 2.1734 -0.64666 3.9534 -1.94 5.34 s-2.9866 2.08 -5.08 2.08 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64666 -4.0234 1.94 -5.43 s2.9866 -2.11 5.08 -2.11 z M180.67400000000004 12.92 c0 1.44 0.33998 2.5966 1.02 3.47 s1.6333 1.31 2.86 1.31 c1.2 0 2.1466 -0.43 2.84 -1.29 s1.04 -2.0234 1.04 -3.49 c0 -1.5333 -0.34334 -2.7334 -1.03 -3.6 s-1.6433 -1.3 -2.87 -1.3 c-1.2 0 -2.1434 0.43334 -2.83 1.3 s-1.03 2.0666 -1.03 3.6 z M204.58850000000004 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M203.48850000000002 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M225.18300000000002 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M235.55750000000003 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M260.4465 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M274.641 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z M287.53550000000007 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M285.87550000000005 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M300.25000000000006 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z"></path></g> </g> </svg>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/LightModeBrandLogo.astro", void 0);

const $$Astro$2 = createAstro("https://sinergiavalores.com");
const $$DarkModeBrandLogo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DarkModeBrandLogo;
  const { width, height } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"${addAttribute(width || "120", "width")}${addAttribute(height || "60", "height")} viewBox="0 0 3162.368325463131 1080.1551018097548"> <g transform="scale(8.118416273156555) translate(10, 10)"> <defs id="SvgjsDefs1045"><linearGradient id="SvgjsLinearGradient1050"><stop id="SvgjsStop1051" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1052" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1053" stop-color="#8f5e25" offset="1"></stop></linearGradient><linearGradient id="SvgjsLinearGradient1054"><stop id="SvgjsStop1055" stop-color="#8f5e25" offset="0"></stop><stop id="SvgjsStop1056" stop-color="#fbf4a1" offset="0.5"></stop><stop id="SvgjsStop1057" stop-color="#8f5e25" offset="1"></stop></linearGradient></defs><g id="SvgjsG1046" transform="matrix(1.3075284239835347,0,0,1.3075284239835347,-27.526859060533795,-4.236635009339761)" fill="#000"><g xmlns="http://www.w3.org/2000/svg" stroke="black" font-family="Times New Roman" font-size="16" transform="scale(1 -1)"><g transform="translate(0 -96)"><g><path d="M 21.633,34.925 C 24.973,46.855 40.837,53.71 46.922,66.223 C 49.866,72.279 48.49,83.461 43.464,87.939 C 43.197,88.178 42.09,90.326 43.217,89.521 C 54.416,81.327 63.521,70.509 59.309,60.068 C 53.464,45.577 38.409,38.34 38.519,23.585 C 38.566,17.447 43.088,12.523 48.838,7.375 L 49.073,6.299 C 34.143,10.56 17.742,21.028 21.633,34.925 Z M 59.314,18.723 C 67.987,26.524 73.282,31.263 71.043,40.298 C 73.766,36.119 76.295,30.323 74.135,25.806 C 72.203,21.769 70.28,18.956 63.244,15.02 C 59.515,12.935 56.712,10.677 54.37,6.898 C 54.248,10.853 55.011,14.852 59.314,18.723 Z M 49.686,32.153 C 53.003,38.255 57.845,42.622 62.538,48.882 C 65.869,53.325 68.92,60.704 65.731,66.728 L 65.937,67.016 C 70.824,61.556 71.028,52.654 69.495,46.059 C 67.086,35.69 58.5,31.5 53.511,23.918 C 51.557,20.948 50.446,17.311 51,13.5 C 45.461,18.021 46.717,26.69 49.686,32.153 Z" stroke-linejoin="miter" stroke-linecap="round" stroke="none" stroke-width="0.75" marker-start="none" marker-end="none" stroke-miterlimit="79.8403193612775"></path></g></g></g></g><g id="SvgjsG1047" transform="matrix(0.932482275033653,0,0,0.932482275033653,89.55240804555596,42.98324525360482)" fill="#000"><path d="M6.3 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M20.6745 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M29.729 5.720000000000001 l5.96 9.58 l0.04 0 l0 -9.58 l2.94 0 l0 14.28 l-3.14 0 l-5.94 -9.56 l-0.04 0 l0 9.56 l-2.94 0 l0 -14.28 l3.12 0 z M55.283500000000004 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M68.438 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M67.33800000000001 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M84.7525 5.380000000000001 c1.6267 0 3.0066 0.47336 4.14 1.42 s1.76 2.1534 1.88 3.62 l-3 0 c-0.18666 -0.8 -0.54666 -1.4 -1.08 -1.8 s-1.18 -0.6 -1.94 -0.6 c-1.2267 0 -2.18 0.44334 -2.86 1.33 s-1.02 2.0766 -1.02 3.57 c0 1.4667 0.34666 2.63 1.04 3.49 s1.64 1.29 2.84 1.29 c2.0534 0 3.1866 -1.0267 3.4 -3.08 l-3.16 0 l0 -2.34 l6 0 l0 7.72 l-2 0 l-0.32 -1.62 c-1 1.3067 -2.3066 1.96 -3.92 1.96 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64 -4.0234 1.92 -5.43 s2.98 -2.11 5.1 -2.11 z M99.847 5.720000000000001 l0 14.28 l-3.14 0 l0 -14.28 l3.14 0 z M112.9015 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M111.2415 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M133.09050000000002 5.720000000000001 l3.18 10.04 l0.04 0 l3.22 -10.04 l3.24 0 l-4.74 14.28 l-3.54 0 l-4.64 -14.28 l3.24 0 z M153.365 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M151.705 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M166.25950000000003 5.720000000000001 l0 11.64 l6.96 0 l0 2.64 l-10.1 0 l0 -14.28 l3.14 0 z M184.55400000000003 5.380000000000001 c2.1066 0 3.8034 0.7 5.09 2.1 s1.93 3.2134 1.93 5.44 c0 2.1734 -0.64666 3.9534 -1.94 5.34 s-2.9866 2.08 -5.08 2.08 c-2.1066 0 -3.8034 -0.69334 -5.09 -2.08 s-1.93 -3.1666 -1.93 -5.34 c0 -2.2134 0.64666 -4.0234 1.94 -5.43 s2.9866 -2.11 5.08 -2.11 z M180.67400000000004 12.92 c0 1.44 0.33998 2.5966 1.02 3.47 s1.6333 1.31 2.86 1.31 c1.2 0 2.1466 -0.43 2.84 -1.29 s1.04 -2.0234 1.04 -3.49 c0 -1.5333 -0.34334 -2.7334 -1.03 -3.6 s-1.6433 -1.3 -2.87 -1.3 c-1.2 0 -2.1434 0.43334 -2.83 1.3 s-1.03 2.0666 -1.03 3.6 z M204.58850000000004 5.720000000000001 c1.2 0 2.1968 0.37 2.99 1.11 s1.19 1.6833 1.19 2.83 c0 1.7867 -0.75334 2.98 -2.26 3.58 l0 0.04 c0.50666 0.14666 0.90332 0.39 1.19 0.73 s0.50332 0.73666 0.64998 1.19 s0.24 1.18 0.28 2.18 c0.05334 1.3067 0.24 2.18 0.56 2.62 l-3.14 0 c-0.17334 -0.44 -0.30668 -1.2667 -0.40002 -2.48 c-0.10666 -1.28 -0.34 -2.1166 -0.7 -2.51 s-0.94666 -0.59 -1.76 -0.59 l-3.16 0 l0 5.58 l-3.14 0 l0 -14.28 l7.7 0 z M203.48850000000002 12.18 c0.66666 0 1.19 -0.15 1.57 -0.45 s0.57 -0.83 0.57 -1.59 c0 -0.72 -0.18666 -1.23 -0.56 -1.53 s-0.90668 -0.45 -1.6 -0.45 l-3.44 0 l0 4.02 l3.46 0 z M225.18300000000002 5.720000000000001 l0 2.64 l-7.54 0 l0 3.06 l6.92 0 l0 2.44 l-6.92 0 l0 3.5 l7.7 0 l0 2.64 l-10.84 0 l0 -14.28 l10.68 0 z M235.55750000000003 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M260.4465 5.380000000000001 c1.7467 0 3.1366 0.40002 4.17 1.2 s1.55 1.9333 1.55 3.4 l-3.04 0 c-0.04 -0.72 -0.28334 -1.26 -0.73 -1.62 s-1.1367 -0.54 -2.07 -0.54 c-0.65334 0 -1.18 0.14334 -1.58 0.43 s-0.6 0.68332 -0.6 1.19 c0 0.41334 0.12334 0.71334 0.37 0.9 s0.59666 0.35332 1.05 0.49998 s1.2467 0.36 2.38 0.64 c1.1867 0.29334 2.1 0.61334 2.74 0.96 s1.1267 0.79 1.46 1.33 s0.5 1.2033 0.5 1.99 c0 0.90666 -0.24 1.7133 -0.72 2.42 s-1.18 1.2433 -2.1 1.61 s-1.96 0.55 -3.12 0.55 c-1.7733 0 -3.23 -0.44334 -4.37 -1.33 s-1.71 -2.1034 -1.71 -3.65 l0 -0.1 l3.04 0 c0 0.84 0.28666 1.49 0.86 1.95 s1.3333 0.69 2.28 0.69 c0.84 0 1.5167 -0.15 2.03 -0.45 s0.77 -0.74334 0.77 -1.33 c0 -0.38666 -0.14 -0.71332 -0.42 -0.97998 s-0.65334 -0.48332 -1.12 -0.64998 s-1.2533 -0.37666 -2.36 -0.63 c-1.28 -0.32 -2.2134 -0.66 -2.8 -1.02 s-1.0333 -0.79666 -1.34 -1.31 s-0.46 -1.13 -0.46 -1.85 c0 -0.89334 0.25666 -1.6733 0.77 -2.34 s1.1833 -1.16 2.01 -1.48 s1.68 -0.48 2.56 -0.48 z M274.641 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z M287.53550000000007 5.720000000000001 l5.34 14.28 l-3.26 0 l-1.08 -3.18 l-5.34 0 l-1.12 3.18 l-3.18 0 l5.42 -14.28 l3.22 0 z M285.87550000000005 9.24 l-1.86 5.24 l3.7 0 l-1.8 -5.24 l-0.04 0 z M300.25000000000006 16.92 l0 3.08 l-3.14 0 l0 -3.08 l3.14 0 z"></path></g> </g> </svg>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/DarkModeBrandLogo.astro", void 0);

const $$Astro$1 = createAstro("https://sinergiavalores.com");
const $$WhatsAppRedirect = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WhatsAppRedirect;
  const { PhoneNumber, Message } = Astro2.props;
  const encodedMessage = encodeURIComponent(Message);
  const whatsappURL = `https://wa.me/${PhoneNumber}?text=${encodedMessage}`;
  return renderTemplate`${maybeRenderHead()}<div class="group"> <a${addAttribute(whatsappURL, "href")} target="_blank" rel="noopener noreferrer" class="flex cursor-pointer items-center gap-4"> ${renderComponent($$result, "FaWhatsapp", FaWhatsapp, { "size": 40, "className": "fill-current text-black ring-zinc-500 group-hover:text-neutral-500 dark:text-neutral-400 dark:ring-zinc-200 dark:focus:outline-none dark:group-hover:text-neutral-500" })} <h3 class="rounded-lg text-base text-sm font-bold font-medium text-black outline-none ring-zinc-500 group-hover:text-neutral-500 dark:text-neutral-400 dark:ring-zinc-200 dark:focus:outline-none dark:group-hover:text-neutral-500 md:py-3 md:text-sm 2xl:text-base"> ${PhoneNumber} </h3> </a> </div>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/WhatsAppRedirect.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["<!-- Main header component -->", '<header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start"> <!-- Navigation container --> <nav class="relative mx-2 w-full rounded-[36px] border border-yellow-100/40 bg-yellow-50/60 px-4 py-3 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-800/80 dark:backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto" aria-label="Global"> <div class="flex items-center justify-between"> <!-- Brand logo --> <a class="hidden flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:block dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <a class="flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:hidden dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <!-- Collapse toggle for smaller screens --> <div class="ml-auto mr-5 md:hidden"> <button type="button" class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:outline-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> <svg class="h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="3" x2="21" y1="6" y2="6"></line> <line x1="3" x2="21" y1="12" y2="12"></line> <line x1="3" x2="21" y1="18" y2="18"></line> </svg> <svg class="hidden h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> </svg> </button> </div> <!-- ThemeIcon component specifically for smaller screens --> <span class="inline-block md:hidden"> ', ' </span> </div> <!-- Contains navigation links --> <div id="navbar-collapse-with-animation" class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"> <!-- Navigation links container --> <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7"> ', " <!-- Navigation links and Authentication component --> ", ' <!-- ThemeIcon component specifically for larger screens --> <span class="hidden md:inline-block"> ', ' </span> </div> </div> </nav> </header> <!-- Theme Appearance script to manage light/dark modes --> <script>\n  const HSThemeAppearance = {\n    init() {\n      const defaultTheme = "default";\n      let theme = localStorage.getItem("hs_theme") || defaultTheme;\n\n      if (document.querySelector("html").classList.contains("dark")) return;\n      this.setAppearance(theme);\n    },\n    _resetStylesOnLoad() {\n      const $resetStyles = document.createElement("style");\n      $resetStyles.innerText = `*{transition: unset !important;}`;\n      $resetStyles.setAttribute("data-hs-appearance-onload-styles", "");\n      document.head.appendChild($resetStyles);\n      return $resetStyles;\n    },\n    setAppearance(theme, saveInStore = true, dispatchEvent = true) {\n      const $resetStylesEl = this._resetStylesOnLoad();\n\n      if (saveInStore) {\n        localStorage.setItem("hs_theme", theme);\n      }\n\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n\n      document.querySelector("html").classList.remove("dark");\n      document.querySelector("html").classList.remove("default");\n      document.querySelector("html").classList.remove("auto");\n\n      document.querySelector("html").classList.add(this.getOriginalAppearance());\n\n      setTimeout(() => {\n        $resetStylesEl.remove();\n      });\n\n      if (dispatchEvent) {\n        window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: theme }));\n      }\n    },\n    getAppearance() {\n      let theme = this.getOriginalAppearance();\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n      return theme;\n    },\n    getOriginalAppearance() {\n      const defaultTheme = "default";\n      return localStorage.getItem("hs_theme") || defaultTheme;\n    },\n  };\n  HSThemeAppearance.init();\n\n  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {\n    if (HSThemeAppearance.getOriginalAppearance() === "auto") {\n      HSThemeAppearance.setAppearance("auto", false);\n    }\n  });\n\n  window.addEventListener("load", () => {\n    const $clickableThemes = document.querySelectorAll("[data-hs-theme-click-value]");\n    const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");\n\n    $clickableThemes.forEach(($item) => {\n      $item.addEventListener("click", () => HSThemeAppearance.setAppearance($item.getAttribute("data-hs-theme-click-value"), true, $item));\n    });\n\n    $switchableThemes.forEach(($item) => {\n      $item.addEventListener("change", (e) => {\n        HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");\n      });\n\n      $item.checked = HSThemeAppearance.getAppearance() === "dark";\n    });\n\n    window.addEventListener("on-hs-appearance-change", (e) => {\n      $switchableThemes.forEach(($item) => {\n        $item.checked = e.detail === "dark";\n      });\n    });\n  });\n  // Function to update the logo based on the current theme\n  function updateLogo() {\n    const brandLogo = document.getElementById("brand-logo");\n    const isDarkMode = document.documentElement.classList.contains("dark");\n    brandLogo.src = isDarkMode ? "{darkModeLogo}" : "{lightModeLogo}";\n  }\n\n  // Initial logo update\n  updateLogo();\n\n  // Update the logo when the theme changes\n  window.addEventListener("on-hs-appearance-change", updateLogo);\n<\/script> <!--Import the necessary Collapse and Overlay plugins--> <!--https://preline.co/plugins/html/collapse.html--> <!--https://preline.co/plugins/html/overlay.html--> <script src="/scripts/vendor/preline/collapse/index.js"><\/script> <script src="/scripts/vendor/preline/overlay/index.js"><\/script>'], ["<!-- Main header component -->", '<header class="sticky inset-x-0 top-4 z-50 flex w-full flex-wrap text-sm md:flex-nowrap md:justify-start"> <!-- Navigation container --> <nav class="relative mx-2 w-full rounded-[36px] border border-yellow-100/40 bg-yellow-50/60 px-4 py-3 backdrop-blur-md dark:border-neutral-700/40 dark:bg-neutral-800/80 dark:backdrop-blur-md md:flex md:items-center md:justify-between md:px-6 md:py-0 lg:px-8 xl:mx-auto" aria-label="Global"> <div class="flex items-center justify-between"> <!-- Brand logo --> <a class="hidden flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:block dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <a class="flex-none rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:hidden dark:ring-zinc-200 dark:focus:outline-none"', ' aria-label="Brand"> ', ' </a> <!-- Collapse toggle for smaller screens --> <div class="ml-auto mr-5 md:hidden"> <button type="button" class="hs-collapse-toggle flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-neutral-600 transition duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:outline-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation"> <svg class="h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="3" x2="21" y1="6" y2="6"></line> <line x1="3" x2="21" y1="12" y2="12"></line> <line x1="3" x2="21" y1="18" y2="18"></line> </svg> <svg class="hidden h-[1.25rem] w-[1.25rem] flex-shrink-0 hs-collapse-open:block" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path> </svg> </button> </div> <!-- ThemeIcon component specifically for smaller screens --> <span class="inline-block md:hidden"> ', ' </span> </div> <!-- Contains navigation links --> <div id="navbar-collapse-with-animation" class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block"> <!-- Navigation links container --> <div class="mt-5 flex flex-col gap-x-0 gap-y-4 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-x-4 md:gap-y-0 md:ps-7 lg:gap-x-7"> ', " <!-- Navigation links and Authentication component --> ", ' <!-- ThemeIcon component specifically for larger screens --> <span class="hidden md:inline-block"> ', ' </span> </div> </div> </nav> </header> <!-- Theme Appearance script to manage light/dark modes --> <script>\n  const HSThemeAppearance = {\n    init() {\n      const defaultTheme = "default";\n      let theme = localStorage.getItem("hs_theme") || defaultTheme;\n\n      if (document.querySelector("html").classList.contains("dark")) return;\n      this.setAppearance(theme);\n    },\n    _resetStylesOnLoad() {\n      const $resetStyles = document.createElement("style");\n      $resetStyles.innerText = \\`*{transition: unset !important;}\\`;\n      $resetStyles.setAttribute("data-hs-appearance-onload-styles", "");\n      document.head.appendChild($resetStyles);\n      return $resetStyles;\n    },\n    setAppearance(theme, saveInStore = true, dispatchEvent = true) {\n      const $resetStylesEl = this._resetStylesOnLoad();\n\n      if (saveInStore) {\n        localStorage.setItem("hs_theme", theme);\n      }\n\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n\n      document.querySelector("html").classList.remove("dark");\n      document.querySelector("html").classList.remove("default");\n      document.querySelector("html").classList.remove("auto");\n\n      document.querySelector("html").classList.add(this.getOriginalAppearance());\n\n      setTimeout(() => {\n        $resetStylesEl.remove();\n      });\n\n      if (dispatchEvent) {\n        window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: theme }));\n      }\n    },\n    getAppearance() {\n      let theme = this.getOriginalAppearance();\n      if (theme === "auto") {\n        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default";\n      }\n      return theme;\n    },\n    getOriginalAppearance() {\n      const defaultTheme = "default";\n      return localStorage.getItem("hs_theme") || defaultTheme;\n    },\n  };\n  HSThemeAppearance.init();\n\n  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {\n    if (HSThemeAppearance.getOriginalAppearance() === "auto") {\n      HSThemeAppearance.setAppearance("auto", false);\n    }\n  });\n\n  window.addEventListener("load", () => {\n    const $clickableThemes = document.querySelectorAll("[data-hs-theme-click-value]");\n    const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");\n\n    $clickableThemes.forEach(($item) => {\n      $item.addEventListener("click", () => HSThemeAppearance.setAppearance($item.getAttribute("data-hs-theme-click-value"), true, $item));\n    });\n\n    $switchableThemes.forEach(($item) => {\n      $item.addEventListener("change", (e) => {\n        HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");\n      });\n\n      $item.checked = HSThemeAppearance.getAppearance() === "dark";\n    });\n\n    window.addEventListener("on-hs-appearance-change", (e) => {\n      $switchableThemes.forEach(($item) => {\n        $item.checked = e.detail === "dark";\n      });\n    });\n  });\n  // Function to update the logo based on the current theme\n  function updateLogo() {\n    const brandLogo = document.getElementById("brand-logo");\n    const isDarkMode = document.documentElement.classList.contains("dark");\n    brandLogo.src = isDarkMode ? "{darkModeLogo}" : "{lightModeLogo}";\n  }\n\n  // Initial logo update\n  updateLogo();\n\n  // Update the logo when the theme changes\n  window.addEventListener("on-hs-appearance-change", updateLogo);\n<\/script> <!--Import the necessary Collapse and Overlay plugins--> <!--https://preline.co/plugins/html/collapse.html--> <!--https://preline.co/plugins/html/overlay.html--> <script src="/scripts/vendor/preline/collapse/index.js"><\/script> <script src="/scripts/vendor/preline/overlay/index.js"><\/script>'])), maybeRenderHead(), addAttribute("/", "href"), renderComponent($$result, "LightModeBrandLogo", $$LightModeBrandLogo, {}), addAttribute("/", "href"), renderComponent($$result, "DarkModeBrandLogo", $$DarkModeBrandLogo, {}), renderComponent($$result, "ThemeIcon", $$ThemeIcon, {}), renderComponent($$result, "WhatsAppRedirect", $$WhatsAppRedirect, { "PhoneNumber": enStrings.whatsappInfo.PhoneNumber, "Message": enStrings.whatsappInfo.Message }), enStrings.navBarLinks.map((link) => renderTemplate`${renderComponent($$result, "NavLink", $$NavLink, { "url": link.url, "name": link.name })}`), renderComponent($$result, "ThemeIcon", $$ThemeIcon, {}));
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/Navbar.astro", void 0);

const $$FooterSection = createComponent(($$result, $$props, $$slots) => {
  const strings = enStrings;
  const sectionThreeTitle = "Cont\xE1ctanos";
  const arrepentimiento = "Arrepentimiento";
  return renderTemplate`${maybeRenderHead()}<footer class="w-full bg-neutral-300 dark:bg-neutral-900"> <div class="mx-auto w-full max-w-[85rem] px-4 py-10 sm:px-6 lg:px-16 lg:pt-20 2xl:max-w-screen-2xl"> <div class="grid grid-cols-2 gap-6 md:grid-cols-4"> <div class="col-span-full hidden hs-dark-mode-active:block lg:col-span-1"> ${renderComponent($$result, "LightModeBrandLogo", $$LightModeBrandLogo, {})} </div> <div class="col-span-full hs-dark-mode-active:hidden lg:col-span-1"> ${renderComponent($$result, "DarkModeBrandLogo", $$DarkModeBrandLogo, {})} </div> ${strings.footerLinks.map((section) => renderTemplate`<div class="col-span-1"> <h3 class="font-gotham text-neutral-800 dark:text-neutral-200">${section.section}</h3> <ul${addAttribute(`mt-3 flex w-fit ${section.section === "Servicios" && "flex-col"} ${section.section === "Redes Sociales" && "flex-wrap"} gap-4 lg:flex-row`, "class")}> ${section.links.map((link) => renderTemplate`<li> <a${addAttribute(link.url, "href")} target="_blank"${addAttribute(`inline-flex gap-x-2 text-nowrap rounded-lg border-yellow-500 font-nunito text-neutral-600 outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:text-neutral-400 dark:ring-zinc-200 dark:hover:text-yellow-400 dark:focus:outline-none`, "class")}> ${section.section === "Servicios" ? link.name : link.name === "Instagram" ? renderTemplate`${renderComponent($$result, "FaInstagram", FaInstagram, {})}` : link.name === "Tiktok" ? renderTemplate`${renderComponent($$result, "FaTiktok", FaTiktok, {})}` : link.name === "Facebook" ? renderTemplate`${renderComponent($$result, "FaFacebook", FaFacebook, {})}` : link.name === "Twitter" ? renderTemplate`${renderComponent($$result, "FaXTwitter", FaXTwitter, {})}` : link.name} </a> </li>`)} </ul> </div>`)} <div class="col-span-1 hidden justify-between md:flex"> <div class="flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto xl:mx-auto"> <a href="/contacto" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-500 hover:text-yellow-500 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${sectionThreeTitle} </a> </div> <div class="flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto xl:mx-auto"> <a href="/arrepentimiento" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-500 hover:text-yellow-500 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${arrepentimiento} </a> </div> </div> <div class="col-span-1 flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto md:hidden xl:mx-auto"> <a href="/contacto" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-50 hover:text-yellow-50 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${sectionThreeTitle} </a> </div> <div class="col-span-1 flex h-fit w-fit items-center justify-center rounded-2xl bg-white p-2 dark:bg-black md:ml-auto md:hidden xl:mx-auto"> <a href="/arrepentimiento" class="cursor-pointer rounded-lg border-2 border-black p-2 font-gotham text-neutral-800 hover:border-yellow-50 hover:text-yellow-50 dark:border-white dark:text-neutral-200 dark:hover:border-yellow-400 dark:hover:text-yellow-400"> ${arrepentimiento} </a> </div> </div> <div class="mt-9 grid gap-y-2 sm:mt-12 sm:flex sm:items-center sm:justify-between sm:gap-y-0"> <div class="flex items-center justify-between"> <p class="font-nunito text-sm text-neutral-600 dark:text-neutral-400">
© <span id="current-year"></span> ${SITE.title}.
</p> </div> </div> <!-- Contenedor de la imagen --> <div class="mt-6 flex justify-end"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1134.7167974729828!2d-57.952428592613366!3d-34.910013496124584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e637e73ab81b%3A0x9835c71d1ffd0582!2sC.%205%20668%2C%20La%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1722559777561!5m2!1ses-419!2sar" class="h-24" width="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> <a href="http://qr.afip.gob.ar/?qr=Goz8RzK5XRZ32i-lGg5AvQ,," target="_F960AFIPInfo"> <img src="http://www.afip.gob.ar/images/f960/DATAWEB.jpg" class="w-16 h-24"> </a> </div>  </div> </footer>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/FooterSection.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://sinergiavalores.com");
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title = SITE.title, meta, structuredData, lang = "en" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["<!--\nThis is the main structure for the page.\nWe set the language of the page to English and add classes for scrollbar and scroll behavior.\n--><html", ' class="lenis lenis-smooth scroll-pt-16 scrollbar-hide astro-ouamjn2i"> <head><!-- Adding metadata to the HTML document -->', "<!-- Define the title of the page --><title>", '</title><script>\n      // Script to handle dark mode. It will check if the theme is stored in localStorage or if dark theme is preferred by system settings\n      if (\n        localStorage.getItem("hs_theme") === "dark" ||\n        (!("hs_theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)\n      ) {\n        document.documentElement.classList.add("dark");\n      } else {\n        document.documentElement.classList.remove("dark");\n      }\n    <\/script><link rel="stylesheet" href="../styles/global.css"><script src="/scripts/vendor/lenis/lenis.js"><\/script><script>\n      // Script to handle Lenis library settings for smooth scrolling\n      const lenis = new Lenis();\n\n      function raf(time) {\n        lenis.raf(time);\n        requestAnimationFrame(raf);\n      }\n\n      requestAnimationFrame(raf);\n    <\/script>', '</head> <body class="bg-neutral-200 selection:bg-yellow-400 selection:text-neutral-700 dark:bg-neutral-800 astro-ouamjn2i"> <!--\n    Setting up the main structure of the page.\n    The Navbar is placed at the top, with a slot for the main content and FooterSection at the bottom.\n    --> <div class="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 astro-ouamjn2i"> ', ' <main class="astro-ouamjn2i"> ', " </main> </div> ", "  </body> </html>"])), addAttribute(lang, "lang"), renderComponent($$result, "Meta", $$Meta, { "meta": meta, "structuredData": structuredData, "class": "astro-ouamjn2i" }), title, renderHead(), renderComponent($$result, "Navbar", $$Navbar, { "class": "astro-ouamjn2i" }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "FooterSection", $$FooterSection, { "class": "astro-ouamjn2i" }));
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, ArrepentimientoFormInfo as A, SITE as S, questionsFrecuentes as q };

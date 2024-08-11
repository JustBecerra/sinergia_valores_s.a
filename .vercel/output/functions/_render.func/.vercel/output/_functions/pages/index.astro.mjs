/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent, u as unescapeHTML, F as Fragment, f as renderSlot } from '../chunks/astro/server_DmtLvZrB.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D0uq4Eqi.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_BLHwhXC-.mjs';
import { $ as $$PrimaryCTA } from '../chunks/PrimaryCTA_C2jXllz4.mjs';
import 'clsx';
import { $ as $$Icon } from '../chunks/Icon_ktFlVqUv.mjs';
import { $ as $$AccordionItem } from '../chunks/AccordionItem_uBO0qgLI.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$8 = createAstro("https://sinergiavalores.com");
const $$SecondaryCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$SecondaryCTA;
  const { title, url } = Astro2.props;
  const baseClasses = "inline-flex items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-center text-sm font-nunito text-neutral-600 shadow-sm outline-none ring-zinc-500 focus-visible:ring transition duration-300";
  const bgColorClasses = "bg-yellow-500";
  const disableClasses = "disabled:pointer-events-none disabled:opacity-50";
  const fontSizeClasses = "2xl:text-base";
  const ringClasses = "ring-zinc-500";
  const darkClasses = "dark:bg-yellow-500 text-white dark:ring-zinc-200 dark:focus:outline-none";
  return renderTemplate`<!-- Styled hyperlink -->${maybeRenderHead()}<a${addAttribute(`${baseClasses} ${bgColorClasses} ${disableClasses} ${fontSizeClasses} ${ringClasses} ${darkClasses}`, "class")}${addAttribute(url, "href")}> ${title} </a>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/buttons/SecondaryCTA.astro", void 0);

const favico = new Proxy({"src":"/_astro/favico.C-VzaCvi.png","width":1783,"height":2783,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/favico.png";
							}
							
							return target[name];
						}
					});

const $$Astro$7 = createAstro("https://sinergiavalores.com");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { title, subTitle, primaryBtn, primaryBtnURL, secondaryBtn, secondaryBtnURL, withReview, avatars, starCount, rating, reviews, src, alt } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mt-6 flex max-w-[85rem] flex-col items-center justify-center gap-4 px-4 py-14 sm:px-6 md:flex-row md:items-center md:gap-8 lg:px-8 2xl:max-w-full"> <div> <h1 class="block text-balance font-gotham text-3xl tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-4xl lg:text-6xl lg:leading-tight"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(title)}` })} </h1> ${subTitle && renderTemplate`<p class="mt-3 text-pretty font-nunito text-lg leading-relaxed text-neutral-700 dark:text-neutral-400 lg:w-4/5">${subTitle}</p>`} <div class="mt-7 grid w-full gap-3 sm:inline-flex"> ${primaryBtn && renderTemplate`${renderComponent($$result, "PrimaryCTA", $$PrimaryCTA, { "title": primaryBtn, "url": primaryBtnURL })}`} ${secondaryBtn && renderTemplate`${renderComponent($$result, "SecondaryCTA", $$SecondaryCTA, { "title": secondaryBtn, "url": secondaryBtnURL })}`} </div> </div> <div class="mr-0 mt-8 flex w-full justify-center md:mr-32 md:mt-0 md:justify-end"> ${renderComponent($$result, "Image", $$Image, { "src": favico, "draggable": "false", "loading": "eager", "alt": "asd", "format": "png", "class": "h-[300px] w-[200px]" })} <!-- <div
      class="hidden rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:hidden dark:flex dark:ring-zinc-200 dark:focus:outline-none"
    >
      <LightModeBrandLogo width="450" height="450" />
    </div>
    <div
      class="flex rounded-lg text-xl font-bold outline-none ring-zinc-500 focus-visible:ring hs-dark-mode-active:hidden dark:hidden dark:ring-zinc-200 dark:focus:outline-none"
    >
      <DarkModeBrandLogo width="450" height="450" />
    </div> --> </div> </section>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/landing/HeroSection.astro", void 0);

const $$Astro$6 = createAstro("https://sinergiavalores.com");
const $$TabNav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TabNav;
  const { aria, dataTab, id, heading, content, first } = Astro2.props;
  const BUTTON_CLASS = "dark:hover:bg-neutral-700 rounded-xl p-4 text-start outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-200 focus-visible:ring hs-tab-active:bg-neutral-50 hs-tab-active:shadow-md hs-tab-active:hover:border-transparent dark:ring-zinc-200 dark:focus:outline-none  dark:hs-tab-active:bg-neutral-700/60 md:p-5";
  return renderTemplate`<!-- Tab button with dynamic class based on 'first' property, id, tab data, and aria-controls  -->${maybeRenderHead()}<button type="button"${addAttribute(`${first ? "active " : ""}${BUTTON_CLASS}`, "class")}${addAttribute(id, "id")}${addAttribute(dataTab, "data-hs-tab")}${addAttribute(aria, "aria-controls")} role="tab"> <!-- Slot for additional content --> <span class="flex"> ${renderSlot($$result, $$slots["default"])} <!-- Container for the heading and content of the tab --> <span class="ms-6 grow"> <!-- Heading of the tab, changes color when active --> <span class="block font-gotham text-lg text-yellow-500 hs-tab-active:text-yellow-500">${heading}</span> <!-- Content of the tab, changes color when active --> <span class="mt-1 block font-nunito text-neutral-500 hs-tab-active:text-neutral-600 dark:text-neutral-400 dark:hs-tab-active:text-neutral-200">${content}</span> </span> </span> </button>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/blocks/TabNav.astro", void 0);

const $$Astro$5 = createAstro("https://sinergiavalores.com");
const $$TabContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$TabContent;
  const { id, aria, src, alt, first, second } = Astro2.props;
  const firstClass = first ? "" : "hidden";
  const secondClass = "border-yellow-500 border-4 object-cover rounded-xl w-[576px] h-[600px]";
  return renderTemplate`<!-- Container for tab content that controls visibility and accessibility -->${maybeRenderHead()}<div${addAttribute(id, "id")} role="tabpanel"${addAttribute(firstClass, "class")}${addAttribute(aria, "aria-labelledby")}> <!-- Astro Image component to display the image with dynamic classes based on the 'second' property --> ${renderComponent($$result, "Image", $$Image, { "src": src, "alt": alt, "draggable": "false", "class": secondClass, "format": "png", "loading": "eager" })} </div>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/blocks/TabContent.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$4 = createAstro("https://sinergiavalores.com");
const $$FeaturesNavs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$FeaturesNavs;
  const { title, tabs } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", `<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="relative p-6 md:p-16"> <div class="relative z-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-16"> <!-- Section's heading and tab navigation --> <div class="mb-10 lg:order-2 lg:col-span-6 lg:col-start-8 lg:mb-0"> <h2 class="font-gotham text-2xl text-neutral-800 dark:text-neutral-200 sm:text-3xl"> `, ` </h2> <!-- Tab navigation - use the attribute 'first' in the first TabNav for the component to work --> <nav class="mt-5 grid gap-4 md:mt-10" aria-label="Tabs" role="tablist"> `, ` </nav> </div> <!-- Contents for each tab - the 'first' attribute should be used in the first tab for that tab to be initially visible, 'second' changes the styles --> <div class="lg:col-span-6"> <div class="relative"> `, ' </div> </div> </div> <div class="absolute inset-0 grid h-full w-full grid-cols-12"> <!-- Decorative background and sizing --> <div class="col-span-full h-5/6 w-full rounded-xl bg-neutral-100 dark:bg-white/[.075] sm:h-3/4 lg:col-span-7 lg:col-start-6 lg:h-full"></div> </div> </div> </section> <!--Import the necessary Tabs plugin--> <!--https://preline.co/plugins/html/tabs.html--> <script src="/scripts/vendor/preline/tabs/index.js"><\/script>'])), maybeRenderHead(), renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(title)}` }), tabs.map((tab, index) => renderTemplate`${renderComponent($$result, "TabNav", $$TabNav, { "id": `tabs-with-card-item-${index + 1}`, "dataTab": `#tabs-with-card-${index + 1}`, "aria": `tabs-with-card-${index + 1}`, "heading": tab.heading, "content": tab.content, "first": tab.first }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Icon", $$Icon, { "name": tab.svg, "class": "bg-yellow-400 text-yellow-400" })} ` })}`), tabs.map((tab, index) => renderTemplate`${renderComponent($$result, "TabContent", $$TabContent, { "id": `tabs-with-card-${index + 1}`, "aria": `tabs-with-card-item-${index + 1}`, "src": tab.src, "alt": tab.alt, "first": tab.first, "second": tab.second })}`));
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/features/FeaturesNavs.astro", void 0);

const $$Astro$3 = createAstro("https://sinergiavalores.com");
const $$StatsGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$StatsGrid;
  const { header, description } = Astro2.props;
  const headerLowerCase = header.split(" ")[0].replace(/[^\w]/g, "").toLocaleLowerCase();
  return renderTemplate`${maybeRenderHead()}<li class="-m-0.5 flex flex-col gap-4 p-4 sm:p-8"> <div class="flex items-center gap-x-2"> <h3 class="flex items-end font-gotham text-base text-neutral-800 dark:text-neutral-200 sm:text-3xl"> ${header} </h3> ${renderComponent($$result, "Icon", $$Icon, { "name": headerLowerCase })} </div> <p class="font-nunito text-sm text-neutral-600 dark:text-neutral-400 sm:text-base"> ${description} </p> </li>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/blocks/StatsGrid.astro", void 0);

const $$Astro$2 = createAstro("https://sinergiavalores.com");
const $$TestimonialsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TestimonialsSection;
  const { statistics } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> ${statistics && renderTemplate`<div class="mt-10 lg:col-span-6 lg:col-end-13 lg:mt-0"> <div class="space-y-6 sm:space-y-8"> <ul class="grid grid-cols-2 divide-x-2 divide-y-2 divide-neutral-300 overflow-hidden dark:divide-neutral-700"> ${statistics.map((stat) => renderTemplate`${renderComponent($$result, "StatsGrid", $$StatsGrid, { "header": stat.header, "description": stat.description })}`)} </ul> </div> </div>`} </section>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/testimonials/TestimonialsSection.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://sinergiavalores.com");
const $$FAQ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FAQ;
  const { title, faqs } = Astro2.props;
  const makeId = (base, index) => `${base}${index + 1}`;
  return renderTemplate(_a || (_a = __template(["<!-- Main container that holds all content. Customized for different viewport sizes. -->", '<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="grid gap-10 md:grid-cols-5"> <div class="flex items-center justify-center md:col-span-2 xl:block"> <div class="flex max-w-xs flex-col gap-4 md:ml-16"> <h2 class="text-nowrap text-center font-gotham text-2xl text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight"> ', ' </h2> <!-- <h2 class="ml-14 mt-1 hidden text-neutral-600 dark:text-neutral-400 md:block">\n          {faqs.subTitle}\n        </h2> --> <!-- <Image src={logopregunta} alt="" draggable={"false"} width={logopregunta.width} height={logopregunta.height} format="png" loading={"eager"} /> --> </div> </div> <!-- FAQ accordion items --> <div class="md:col-span-3"> <div class="hs-accordion-group divide-y divide-neutral-200 dark:divide-neutral-700"> ', ' </div> </div> </div> </section> <!--Import the necessary Accordion plugin--> <!--https://preline.co/plugins/html/accordion.html--> <script src="/scripts/vendor/preline/accordion/index.js"><\/script>'])), maybeRenderHead(), renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(title)}` }), faqs.faqs.map((question, i) => {
    let id = makeId("hs-basic-with-title-and-arrow-stretched-heading-", i);
    let collapseId = makeId("hs-basic-with-title-and-arrow-stretched-collapse", i);
    return renderTemplate`${renderComponent($$result, "AccordionItem", $$AccordionItem, { ...question, "id": id, "collapseId": collapseId, "first": i === 0 })}`;
  }));
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/FAQ.astro", void 0);

const heroImage = new Proxy({"src":"/_astro/imagen_llaves.D9k9b_Oq.png","width":259,"height":194,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/imagen_llaves.png";
							}
							
							return target[name];
						}
					});

const subTitle = "Preguntas frecuentes de nuestros clientes.";
const faqs = [
	{
		question: "¿QUIENES SOMOS?",
		answer: "GRUPO DE PROFESIONALES MULTIDISCIPLINARIOS DEL RAMO LEGAL Y CONTABLE DEDICADOS A LA GESTIÓN DE SERVICIOS FINANCIEROS."
	},
	{
		question: "¿QUE ES LA FIANZA PARA ALQUILER DE SINERGIA VALORES S.A.? ",
		answer: "ES UN AVAL NO PROPIETARIO A PARTIR DE UN EXHAUSTIVO ANÁLISIS CREDITICIO SOBRE EL POTENCIAL INQUILINO. EN CASO DE INCUMPLIMIENTO, A DIFERENCIA DE LAS GARANTÍAS PROPIETARIAS TRADICIONALES, SINERGIA VALORES S.A. CUBRE LAS OBLIGACIONES PENDIENTES Y LLEVA ADELANTE SIN COSTOS PARA EL PROPIETARIO TODAS LAS ACCIONES JUDICIALES Y EXTRAJUDICIALES NECESARIAS HASTA LA RESTITUCIÓN DEL INMUEBLE."
	},
	{
		question: "¿QUE ES UN CO-GARANTE?",
		answer: "ES UNA PERSONA SELECCIONADA POR EL INQUILINO QUE AYUDA A CALIFICAR Y APLICAR PARA LA FIANZA DE SINERGIA VALORES S.A. DEBE TENER INGRESOS DEMOSTRABLES Y FIRMA JUNTO CON EL INQUILINO. NO ES NECESARIO QUE VIVAN EN LA PROPIEDAD."
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
	}
];
const faqs$1 = {
	subTitle: subTitle,
	faqs: faqs
};

const title = "Inmobiliarias Adheridas";
const inmobiliarias = [
	{
		title: "RE/MAX Argentina"
	},
	{
		title: "Toribio Achával"
	},
	{
		title: "Alberto Dacal Propiedades"
	},
	{
		title: "Bullrich Inmobiliaria"
	},
	{
		title: "Diaz Mayer & Brie Propiedades"
	},
	{
		title: "Tizado Propiedades"
	},
	{
		title: "Rudolph Inmobiliaria"
	},
	{
		title: "O'Keefe Inmobiliaria"
	},
	{
		title: "Duplex Inmobiliaria"
	},
	{
		title: "Predial Propiedades"
	}
];
const companiesAttached = {
	title: title,
	inmobiliarias: inmobiliarias
};

const calculatingcosts = new Proxy({"src":"/_astro/calculatingcosts.B8bVM3_A.png","width":888,"height":594,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/calculatingcosts.png";
							}
							
							return target[name];
						}
					});

const parejita = new Proxy({"src":"/_astro/parejita.DbwJsrwX.png","width":508,"height":760,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/parejita.png";
							}
							
							return target[name];
						}
					});

const alquilerseguro = new Proxy({"src":"/_astro/alquilerseguro.DVBEvO-7.png","width":450,"height":450,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/images/alquilerseguro.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://sinergiavalores.com");
const $$CompaniesAttached = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CompaniesAttached;
  const { title, inmobiliarias } = Astro2.props;
  return renderTemplate`<!-- Main container that holds all content. Customized for different viewport sizes. -->${maybeRenderHead()}<section class="mx-auto mb-[12rem] flex w-[90%] flex-col items-center justify-center gap-12 border-4 border-yellow-500 bg-blue-20 px-4 py-10 dark:border-yellow-400 dark:bg-white/[.075] sm:px-6 md:flex-row md:flex-col lg:px-8 lg:py-14"> <h2 class="text-center font-gotham text-4xl text-neutral-600 dark:text-white">${title}</h2> <div class="grid gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"> ${inmobiliarias.map((inmobiliaria) => renderTemplate`<div class="relative flex h-[50px] w-[250px] items-center justify-center rounded-2xl bg-white"> <div class="absolute left-2 h-[34px] w-[34px] rounded-full border-4 border-yellow-500 bg-white dark:border-yellow-500"></div> <h2 class="ml-[10px] h-fit w-[200px] overflow-hidden text-ellipsis text-nowrap rounded-lg bg-yellow-500 px-4 py-1 text-center font-nunito text-sm text-neutral-600 dark:bg-yellow-500 dark:text-white"> ${inmobiliaria.title} </h2> </div>`)} </div> </section>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/CompaniesAttached.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-[12rem]"> ${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": `<span
        class="dark:text-white text-neutral-700 font-gotham">Sinergia Valores S.A.</span>`, "subTitle": "Sistema de fianzas de alquiler 100 % digital con calificacion en 24 hs.", "primaryBtn": "Solicita tu fianza", "primaryBtnURL": "/solicitud", "secondaryBtn": "Calcula costos", "secondaryBtnURL": "/contacto", "withReview": true, "rating": `<span class="font-bold">4.8</span> / 5`, "starCount": 4, "reviews": `From Over <span class="font-bold">12.8k</span> Reviews`, "src": heroImage, "alt": "Stack of ScrewFast product boxes containing assorted hardware tools" })} <!-- <DollarSection client:load /> --> ${renderComponent($$result2, "FeaturesNavs", $$FeaturesNavs, { "title": `<span class="text-yellow-400">Accede a tus sue\xF1os!</span>`, "tabs": [
    {
      heading: "Calcula Gratis",
      content: "Descubre el costo de tu fianza sin compromiso. Calcula ahora mismo de manera r\xE1pida y gratuita.",
      svg: "tools",
      src: calculatingcosts,
      alt: "Descubre el costo de tu fianza sin compromiso. Calcula ahora mismo de manera r\xE1pida y gratuita.",
      first: true
    },
    {
      heading: "Solicita Tu Fianza",
      content: "Obt\xE9n tu fianza de manera f\xE1cil y r\xE1pida. Completa el formulario y recibe tu fianza al instante.",
      svg: "dashboard",
      src: parejita,
      alt: "Obt\xE9n tu fianza de manera f\xE1cil y r\xE1pida. Completa el formulario y recibe tu fianza al instante.",
      second: true
    },
    {
      heading: "Alquila Seguro",
      content: "Protege tu inversi\xF3n con nuestra fianza de alquiler. Alquila seguro y sin preocupaciones.",
      svg: "house",
      src: alquilerseguro,
      alt: "Protege tu inversi\xF3n con nuestra fianza de alquiler. Alquila seguro y sin preocupaciones."
    }
  ] })} ${renderComponent($$result2, "TestimonialsSection", $$TestimonialsSection, { "title": "", "subTitle": "", "statistics": [
    {
      header: "CONFIANZA",
      description: "Equipo liderado por profesionales idoneos del area legal y financiero comprometidos con el servicio y respaldo durante todo el proceso."
    },
    {
      header: "SEGURIDAD",
      description: "Protege tu inversion con nuestro sistema de fianzas para alquiler basado en el analisis por scoring."
    },
    {
      header: "SIMPLE, RAPIDO Y DIGITAL",
      description: "La conformidad de la fianza para alquiler es gestionada en 24 hs mediante un procedimiento 100 % digital."
    },
    {
      header: "LIQUIDEZ INMEDIATA",
      description: "Ante impagos respondemos con liquidez inmediata hasta la restitucion de\xA0la\xA0propiedad."
    }
  ] })} ${renderComponent($$result2, "FAQ", $$FAQ, { "title": "Preguntas Frecuentes", "faqs": faqs$1 })} ${renderComponent($$result2, "CompaniesAttached", $$CompaniesAttached, { "title": companiesAttached.title, "inmobiliarias": companiesAttached.inmobiliarias })} </div> ` })}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/index.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

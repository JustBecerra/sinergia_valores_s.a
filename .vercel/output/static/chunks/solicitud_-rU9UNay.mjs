/* empty css                         */
import { b as createComponent, d as renderTemplate, f as renderComponent, m as maybeRenderHead } from './astro/server_CKhwUAPt.mjs';
import 'kleur/colors';
import { a as $$MainLayout, S as SITE } from './MainLayout_cTAs6IEz.mjs';

const $$Solicitud = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Contact | ${SITE.title}`;
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle, "structuredData": {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://screwfast.uk/contact",
    url: "https://screwfast.uk/contact",
    name: "Contact Us | ScrewFast",
    description: "Have questions or want to discuss a project? Reach out, and let's craft the perfect solution with our tools and services.",
    isPartOf: {
      "@type": "WebSite",
      url: "https://screwfast.uk",
      name: "ScrewFast",
      description: "ScrewFast offers top-tier hardware tools and expert construction services to meet all your project needs."
    },
    inLanguage: "en-US"
  } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div>solicitud</div> ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/solicitud.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/solicitud.astro";
const $$url = "/solicitud";

export { $$Solicitud as default, $$file as file, $$url as url };

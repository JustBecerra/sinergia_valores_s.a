/* empty css                         */
import { a as createAstro, b as createComponent, d as renderTemplate, m as maybeRenderHead, f as renderComponent } from './astro/server_CKhwUAPt.mjs';
import 'kleur/colors';
import { A as ArrepentimientoFormInfo, a as $$MainLayout, S as SITE } from './MainLayout_cTAs6IEz.mjs';
import { $ as $$TextInput } from './TextInput_CQ0cvojq.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://sinergia&valores");
const $$EmailBtn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EmailBtn;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="submit" class="inline-flex w-[20rem] items-center justify-center gap-x-2 rounded-lg bg-yellow-500 px-4 py-3 text-sm font-bold text-neutral-600 outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:text-neutral-50">${title}</button>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/buttons/EmailBtn.astro", void 0);

const $$Astro = createAstro("https://sinergia&valores");
const $$ArrepentimientoSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArrepentimientoSection;
  const { title, description, name, nacionality, idnumber, phonenumber, mail, serviceorproduct, sendtext } = ArrepentimientoFormInfo;
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:my-12 lg:px-8"> <div class="mx-auto flex max-w-2xl flex-col gap-8 lg:max-w-5xl"> <h1 class="text-center text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight">${title}</h1> <p class="mt-1 text-pretty text-neutral-600 dark:text-neutral-400"> ${description} </p> <div> <form method="POST" class="grid grid-cols-1 gap-10 md:grid-cols-2"> ${renderComponent($$result, "TextInput", $$TextInput, { "id": "name", "label": name, "name": "name" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "nacionality", "label": nacionality, "name": "nacionality" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "idnumber", "label": idnumber, "name": "idnumber" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "phonenumber", "label": phonenumber, "name": "phonenumber" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "mail", "label": mail, "name": "mail" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "serviceorproduct", "label": serviceorproduct, "name": "serviceorproduct" })} <div class="col-span-2 flex justify-center"> ${renderComponent($$result, "EmailBtn", $$EmailBtn, { "title": sendtext })} </div> </form> </div> </div> </section>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/sections/ArrepentimientoSection.astro", void 0);

const $$Arrepentimiento = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Arrepentimiento | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle, "structuredData": {
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
  } }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArrepentimientoSection", $$ArrepentimientoSection, {})} ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/arrepentimiento.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/arrepentimiento.astro";
const $$url = "/arrepentimiento";

export { $$Arrepentimiento as default, $$file as file, $$url as url };

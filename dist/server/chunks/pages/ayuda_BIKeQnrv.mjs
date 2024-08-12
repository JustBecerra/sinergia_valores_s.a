/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_DWw_swtm.mjs';
import 'kleur/colors';
import { a as $$Icon, q as questionsFrecuentes, $ as $$MainLayout, S as SITE } from './404_ChRBmUpV.mjs';

const $$Astro = createAstro("https://sinergia&valores");
const $$AccordionItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AccordionItem;
  const { id, collapseId, question, answer, first } = Astro2.props;
  const ACCORDION_CLASS_DEFAULT = "hs-accordion pb-3 active";
  const ACCORDION_CLASS_COLLAPSED = "hs-accordion pt-6 pb-3";
  const ACCORDION_CONTENT_CLASS = "hs-accordion-content w-full overflow-hidden transition-[height] duration-300";
  function getAccordionClass(first2 = false) {
    return first2 ? ACCORDION_CLASS_DEFAULT : ACCORDION_CLASS_COLLAPSED;
  }
  return renderTemplate`<!-- The main container for the accordion item -->${maybeRenderHead()}<div${addAttribute(getAccordionClass(first), "class")}${addAttribute(id, "id")}> <!-- The accordion button, which toggles the expanded/collapsed state --> <button class="hs-accordion-toggle group inline-flex w-full items-center justify-between gap-x-3 text-balance rounded-lg pb-3 text-start font-gotham text-neutral-800 outline-none ring-zinc-500 transition hover:text-neutral-500 focus-visible:ring dark:text-neutral-200 dark:ring-zinc-200 dark:hover:text-neutral-400 dark:focus:outline-none md:text-lg"${addAttribute(collapseId, "aria-controls")}> ${question} <!-- SVG Icon that is shown when the accordion is NOT active --> ${renderComponent($$result, "Icon", $$Icon, { "name": "accordionNotActive" })} <!-- SVG Icon that is shown when the accordion is active --> ${renderComponent($$result, "Icon", $$Icon, { "name": "accordionActive" })} </button> <!-- The collapsible content of the accordion --> <div${addAttribute(id, "aria-labelledby")}${addAttribute(`${first ? ACCORDION_CONTENT_CLASS : "hidden " + ACCORDION_CONTENT_CLASS}`, "class")}${addAttribute(collapseId, "id")}> <!-- The content paragraph --> <p class="text-pretty font-nunito text-neutral-600 dark:text-neutral-400"> ${answer} </p> </div> </div>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/blocks/AccordionItem.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$QuestionsSection = createComponent(($$result, $$props, $$slots) => {
  const makeId = (base, index) => `${base}${index + 1}`;
  return renderTemplate(_a || (_a = __template(["", '<section class="mx-auto flex max-w-[85rem] flex-col gap-12 px-4 py-10 sm:px-6 lg:my-12 lg:px-8"> <div class="text-center"> <h1 class="text-balance font-gotham text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight">\nPreguntas Frecuentes\n</h1> </div> <div class="mx-auto flex max-w-2xl flex-col gap-8 lg:max-w-5xl"> <div class="md:col-span-3"> <div class="hs-accordion-group divide-y divide-neutral-200 dark:divide-neutral-700"> ', ' </div> </div> </div> </section> <script src="/scripts/vendor/preline/accordion/index.js"><\/script>'])), maybeRenderHead(), questionsFrecuentes.map((question, i) => {
    let id = makeId("hs-basic-with-title-and-arrow-stretched-heading-", i);
    let collapseId = makeId("hs-basic-with-title-and-arrow-stretched-collapse", i);
    return renderTemplate`${renderComponent($$result, "AccordionItem", $$AccordionItem, { ...question, "id": id, "collapseId": collapseId, "first": i === 0 })}`;
  }));
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/sections/QuestionsSection.astro", void 0);

const $$Ayuda = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Arrepentimiento | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "QuestionsSection", $$QuestionsSection, {})} ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/ayuda.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/ayuda.astro";
const $$url = "/ayuda";

const ayuda = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ayuda,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$AccordionItem as $, ayuda as a };

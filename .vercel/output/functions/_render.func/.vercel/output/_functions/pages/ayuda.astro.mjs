/* empty css                                 */
import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_DmtLvZrB.mjs';
import 'kleur/colors';
import { q as questionsFrecuentes, $ as $$MainLayout, S as SITE } from '../chunks/MainLayout_D0uq4Eqi.mjs';
import { $ as $$AccordionItem } from '../chunks/AccordionItem_uBO0qgLI.mjs';
export { renderers } from '../renderers.mjs';

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
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/QuestionsSection.astro", void 0);

const $$Ayuda = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Arrepentimiento | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "QuestionsSection", $$QuestionsSection, {})} ` })}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/ayuda.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/ayuda.astro";
const $$url = "/ayuda";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Ayuda,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

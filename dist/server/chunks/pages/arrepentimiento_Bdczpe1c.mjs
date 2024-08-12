/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_DWw_swtm.mjs';
import 'kleur/colors';
import { A as ArrepentimientoFormInfo, $ as $$MainLayout, S as SITE } from './404_ChRBmUpV.mjs';
import 'clsx';

const $$Astro$2 = createAstro("https://sinergia&valores");
const $$TextInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$TextInput;
  const { label, id, name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> <label${addAttribute(id, "for")} class="sr-only">${label}</label> <input type="text"${addAttribute(name, "name")}${addAttribute(id, "id")} class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"${addAttribute(label, "placeholder")}> </div>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/forms/input/TextInput.astro", void 0);

const $$Astro$1 = createAstro("https://sinergia&valores");
const $$EmailBtn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EmailBtn;
  const { title } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button type="submit" class="inline-flex w-[20rem] items-center justify-center gap-x-2 rounded-lg bg-yellow-500 px-4 py-3 font-nunito text-sm text-neutral-600 outline-none ring-zinc-500 transition duration-300 focus-visible:ring dark:text-neutral-50">${title}</button>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/buttons/EmailBtn.astro", void 0);

const $$Astro = createAstro("https://sinergia&valores");
const $$ArrepentimientoSection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArrepentimientoSection;
  const { title, description, name, nacionality, idnumber, phonenumber, mail, serviceorproduct, sendtext } = ArrepentimientoFormInfo;
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:my-12 lg:px-8"> <div class="mx-auto flex max-w-2xl flex-col gap-8 lg:max-w-5xl"> <h1 class="text-center font-gotham text-2xl tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight">${title}</h1> <p class="mt-1 text-pretty font-nunito text-neutral-600 dark:text-neutral-400"> ${description} </p> <div> <form method="POST" class="grid grid-cols-1 gap-10 md:grid-cols-2"> ${renderComponent($$result, "TextInput", $$TextInput, { "id": "name", "label": name, "name": "name" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "nacionality", "label": nacionality, "name": "nacionality" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "idnumber", "label": idnumber, "name": "idnumber" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "phonenumber", "label": phonenumber, "name": "phonenumber" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "mail", "label": mail, "name": "mail" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "serviceorproduct", "label": serviceorproduct, "name": "serviceorproduct" })} <div class="col-span-2 flex justify-center"> ${renderComponent($$result, "EmailBtn", $$EmailBtn, { "title": sendtext })} </div> </form> </div> </div> </section>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/sections/ArrepentimientoSection.astro", void 0);

const $$Arrepentimiento = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Arrepentimiento | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArrepentimientoSection", $$ArrepentimientoSection, {})} ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/arrepentimiento.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/arrepentimiento.astro";
const $$url = "/arrepentimiento";

const arrepentimiento = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Arrepentimiento,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$TextInput as $, arrepentimiento as a };

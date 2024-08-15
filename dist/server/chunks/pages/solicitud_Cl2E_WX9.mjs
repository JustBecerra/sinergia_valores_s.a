/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent } from '../astro_DWw_swtm.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$TextInput } from './arrepentimiento_Bdczpe1c.mjs';
import { $ as $$MainLayout, S as SITE } from './404_ChRBmUpV.mjs';

const $$Astro = createAstro("https://sinergia&valores");
const $$AuthBtn = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthBtn;
  const { title } = Astro2.props;
  const baseClasses = "inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-gotham dark:text-white text-neutral-700 focus-visible:ring outline-none transition duration-300";
  const borderClasses = "border border-transparent";
  const bgColorClasses = "bg-yellow-400 dark:focus:outline-none";
  const hoverClasses = "hover:bg-yellow-500";
  const fontSizeClasses = "2xl:text-base";
  const disabledClasses = "disabled:pointer-events-none disabled:opacity-50";
  const ringClasses = "ring-zinc-500 dark:ring-zinc-200";
  return renderTemplate`<!-- Styled submit button with dynamic title -->${maybeRenderHead()}<button type="submit"${addAttribute(`${baseClasses} ${borderClasses} ${bgColorClasses} ${hoverClasses} ${fontSizeClasses} ${disabledClasses} ${ringClasses}`, "class")}>${title}</button>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/buttons/AuthBtn.astro", void 0);

const $$SolicitudSection = createComponent(($$result, $$props, $$slots) => {
  const title = "Comience su solicitud";
  const subTitle = "";
  const formTitle = "Complete el formulario de solicitud";
  const formSubTitle = "Nos estaremos comunicando con usted en breve";
  return renderTemplate`<!-- Start Your Aplication  -->${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"> <div class="mx-auto max-w-2xl lg:max-w-5xl"> <div class="text-center"> <h1 class="text-balance text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight"> ${title} </h1> <p class="mt-1 text-pretty text-neutral-600 dark:text-neutral-400"> ${subTitle} </p> </div> <div class="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16"> <div class="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8"> <h2 class="mb-8 text-center text-xl font-bold text-neutral-700 dark:text-neutral-300"> <!--Form reactive input forms--> ${formTitle} </h2> <!-- Form for user input with various input fields.--> <!-- Each field utilizes a different input component for the specific type of input (text, email, phone, and textarea)--> <form> <div class="centre grid gap-4"> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"> ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-firstname-contacts", "label": "Nombre", "name": "hs-firstname-contacts" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-lastname-contacts", "label": "Apellido", "name": "hs-firstname-contacts" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-email-check", "label": "Tipo", "name": "hs-mail-check" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-dni-contacts", "label": "Nro Documento", "name": "hs-dni-number" })} </div> ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-email-check", "label": "Ingrese Email", "name": "hs-mail-check" })} ${renderComponent($$result, "TextInput", $$TextInput, { "id": "hs-email-check", "label": "Confirmar Email", "name": "hs-mail-check" })} <!-- <PhoneInput id="hs-phone-number" 
              label="Numero de telefono"
              />--> </div> <div class="mt-4 grid"> ${renderComponent($$result, "AuthBtn", $$AuthBtn, { "title": "Iniciar Solicitud" })} </div> <div class="mt-3 text-center"> <p class="text-sm text-neutral-600 dark:text-neutral-400"> ${formSubTitle} </p> </div> </form> </div> </div> </div> </section>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/sections/SolicitudSection.astro", void 0);

const $$Solicitud = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Solicitud | ${SITE.title}`;
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SolicitudSection", $$SolicitudSection, {})} ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/solicitud.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/solicitud.astro";
const $$url = "/solicitud";

export { $$Solicitud as default, $$file as file, $$url as url };

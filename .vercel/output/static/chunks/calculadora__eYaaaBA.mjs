/* empty css                         */
import { a as createAstro, b as createComponent, d as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderComponent, g as renderScript } from './astro/server_CKhwUAPt.mjs';
import 'kleur/colors';
import { $ as $$AuthBtn } from './AuthBtn_BuNwjNjc.mjs';
import 'clsx';
import { $ as $$Icon, a as $$MainLayout, S as SITE } from './MainLayout_cTAs6IEz.mjs';

const $$Astro$2 = createAstro("https://sinergia&valores");
const $$MenuDesplegable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$MenuDesplegable;
  const { label, id, name } = Astro2.props;
  return renderTemplate`<!-- 
<div style="position: relative;">
  
  <label for={id} class="sr-only">{label}</label>

  <select
  name="tipoAlquiler"
  id="tipoAlquiler"
  class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
  >
  <option value="" disabled selected>Seleccione tipo de Alquiler</option>
  <option value="comercial">Comercial</option>
  <option value="residencial">Residencial</option>
  <option value="temporal">Temporal (6 a 8 meses)</option>
</select>

</div> -->${maybeRenderHead()}<div style="position: relative;"> <label${addAttribute(id, "for")} class="sr-only">${label}</label> <select${addAttribute(name, "name")}${addAttribute(id, "id")} class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1" onchange="handleTipoAlquilerChange()"> <option value="" disabled selected>Seleccione tipo de Alquiler</option> <option value="comercial">Comercial</option> <option value="residencial">Residencial</option> <option value="temporal">Temporal (6 a 8 meses)</option> </select> </div>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/forms/input/MenuDesplegable.astro", void 0);

const $$Astro$1 = createAstro("https://sinergia&valores");
const $$DuracionAlquiler = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DuracionAlquiler;
  const { label, id, name } = Astro2.props;
  return renderTemplate`<!-- <div style="position: relative;"> --><!-- <label for={id} class="sr-only">{label}</label> ni idea que hace xD--><!-- <select
    name="duracionAlquiler"
    id="duration"
    class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
    >
  
    <option value="" disabled selected>Duracion del Alquiler</option>
    <option value="12">12 Meses</option>
    <option value="18">18 Meses</option>
    <option value="24">24 Meses</option>
    <option value="36">36 Meses</option>
    
    
  </select>

  
  </div>
   -->${maybeRenderHead()}<div style="position: relative;"> <label${addAttribute(id, "for")} class="sr-only">${label}</label> <select${addAttribute(name, "name")}${addAttribute(id, "id")} class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"> <option value="" disabled selected>Duracion del Alquiler</option> <option value="12">12 Meses</option> <option value="18">18 Meses</option> <option value="24">24 Meses</option> <option value="36">36 Meses</option> </select> </div>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/forms/input/DuracionAlquiler.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Promociones = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<div class="flex flex-col justify-between gap-4 md:flex-row"> <!-- <div class="bg-[#C9AF68] dark:bg-yellow-400 text-white rounded-lg p-6 text-center flex flex-col flex-1"> --> <div class="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400"> <h2 class="mb-4 text-2xl">10% OFF - Pago contado</h2> <div id="result10Off" class="my-4 text-4xl">$0</div> <p class="text-lg font-semibold">(con 10% de descuento incluido)</p> <hr class="my-4 border-gray-300 dark:border-gray-700"> <div class="mt-4 flex-grow space-y-2 text-base"> <p class="flex items-center justify-between"> <span>Costo original del Servicio:</span> <span id="costoOriginal" class="font-medium">$0</span> </p> <p class="flex items-center justify-between"> <span>Descuento 10%:</span> <span id="descuentoValor" class="font-medium">$0</span> </p> <p class="flex items-center justify-between"> <span>Total costo por servicio:</span> <span id="totalCosto" class="font-medium">$0</span> </p> </div> <p class="mt-2 text-sm">Promoci\xF3n v\xE1lida hasta el DD/MM/AAAA</p> </div> <div class="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400"> <h2 class="mb-4 text-2xl">25% Anticipo + 3 cuotas sin inter\xE9s</h2> <div id="anticipo25" class="my-4 text-4xl">$0</div> <p class="text-lg font-semibold">Anticipo</p> <div id="cuotas25" class="my-4 text-4xl">$0</div> <p class="text-lg font-semibold">3 cuotas de $<span id="cuotaValor25">0</span></p> <hr class="my-4 border-gray-300 dark:border-gray-700"> <div class="mt-4 flex-grow space-y-2 text-base"> <p class="flex items-center justify-between"> <span>Total costo por servicio:</span> <span id="totalCosto25" class="font-medium">$0</span> </p> </div> <p class="mt-2 text-sm">Promoci\xF3n v\xE1lida hasta el DD/MM/AAAA</p> </div> <div class="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400"> <h2 class="mb-4 text-2xl">50% Anticipo + 6 cuotas sin inter\xE9s</h2> <div id="anticipo50" class="my-4 text-4xl">$0</div> <p class="text-lg font-semibold">Anticipo</p> <div id="cuotas50" class="my-4 text-4xl">$0</div> <p class="text-lg font-semibold">6 cuotas de $<span id="cuotaValor50">0</span></p> <hr class="my-4 border-gray-300 dark:border-gray-700"> <div class="mt-4 flex-grow space-y-2 text-base"> <p class="flex items-center justify-between"> <span>Total costo por servicio:</span> <span id="totalCosto50" class="font-medium">$0</span> </p> </div> <p class="mt-2 text-sm">Promoci\xF3n v\xE1lida hasta el DD/MM/AAAA</p> </div> <script type="module">
    import { handleSubmit } from "@types/calculator.ts";
    document.getElementById('calculatorForm')?.addEventListener('submit', handleSubmit);
  <\/script></div>`])), maybeRenderHead());
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/promociones/Promociones.astro", void 0);

const $$Astro = createAstro("https://sinergia&valores");
const $$PrecioInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PrecioInput;
  const { label, id, name, alerta } = Astro2.props;
  return renderTemplate`<!-- <div style="position: relative;">
  
  <label for={id} class="sr-only">{label}</label>
  <input
    type="number"
    name={name}
    id={id}
    class="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
    placeholder={label}
    step="1.00" 
  />
  <span style="position: absolute; left: 10px; top: 10px; padding-right: 5px;bg-neutral-50">$&nbsp;</span>
</div> --><!-- funciona -->${maybeRenderHead()}<div class="relative"> <label${addAttribute(id, "for")} class="sr-only">${label}</label> <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"> <span class="text-neutral-500 dark:text-neutral-400">$</span> </div> <input type="number"${addAttribute(name, "name")}${addAttribute(id, "id")} class="block w-full pl-5 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"${addAttribute(label, "placeholder")} step="1.00"> </div> <!-- prueba --> <!-- <div class="relative inline-block">
  <label for={id} class="sr-only">{label}</label>
  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <span class="text-neutral-500 dark:text-neutral-400">$</span>
  </div>
  <input
    type="number"
    name={name}
    id={id}
    class="block w-full pl-10 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
    placeholder={label}
    step="1.00"
  />  
  <div class="absolute right-0 top-1/2 transform -translate-y-1/2 ml-2">
    <div class="relative group">
      <button class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 6a9 9 0 100 18 9 9 0 000-18z" />
        </svg>
      </button>
      <div class="absolute hidden group-hover:block right-0 mt-2 w-64 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 tooltip">
        <p class="text-sm text-gray-700 dark:text-gray-300 z-100">
          {alerta}
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .tooltip {
    z-index: 9999;
  }
  </style> 
  -->`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/ui/forms/input/PrecioInput.astro", void 0);

const $$CalcuSection = createComponent(($$result, $$props, $$slots) => {
  const formTitle = "CALCULADORA";
  const formSubTitle = "VALORES CALCULADOS EN BASE A LOS VALORES INGRESADOS. EL COSTO FINAL CORRESPONDERA AL CALCULO EN BASE A LOS VALORES DEFINITIVOS DEL CONTRATO DE ALQUILER.";
  return renderTemplate`<!-- calculadora -->${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"> <div class="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16"> <div class="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8"> <!-- Titulo del form Calculadora mas icono de calculadora --> <h1 class="space-xs-2 mb-6 flex items-center justify-center gap-4 text-2xl font-bold tracking-wider text-black"> ${renderComponent($$result, "Icon", $$Icon, { "name": "calculator" })} <span class="text-text-neutral-700 dark:text-white">${formTitle}</span> ${renderComponent($$result, "Icon", $$Icon, { "name": "calculator" })} </h1> <form id="calculatorForm"> <div class="grid gap-4"> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"> ${renderComponent($$result, "PrecioInput", $$PrecioInput, { "id": "rent", "label": "Monto promedio de tu alquiler", "name": "rent", "alerta": "Probando mas corto" })} ${renderComponent($$result, "PrecioInput", $$PrecioInput, { "id": "expenses", "label": "Monto Expensas", "name": "expenses", "alerta": "Este siualmente caq\xF3n." })} ${renderComponent($$result, "MenuDesplegable", $$MenuDesplegable, { "id": "tipoAlquiler", "label": "Tipo de Alquiler", "name": "tipoAlquiler" })} ${renderComponent($$result, "DuracionAlquiler", $$DuracionAlquiler, { "id": "duration", "label": "Duraci\xF3n del Alquiler", "name": "duracionAlquiler" })} </div> <div class="mt-4 grid"> ${renderComponent($$result, "AuthBtn", $$AuthBtn, { "title": "CALCULAR" })} </div> <div class="mt-3 text-center"> <p class="mb-10 mt-1 text-xs text-neutral-600 dark:text-neutral-400"> ${formSubTitle} </p> </div> <div id="result" class="mt-6 text-center"></div> </div> ${renderScript($$result, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/sections/CalcuSection.astro?astro&type=script&index=0&lang.ts")} </form> </div> ${renderComponent($$result, "Promociones", $$Promociones, {})} </div> </section>`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/components/sections/CalcuSection.astro", void 0);

const $$Calculadora = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Calculadora | ${SITE.title}`;
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CalcuSection", $$CalcuSection, {})} ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/calculadora.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/calculadora.astro";
const $$url = "/calculadora";

export { $$Calculadora as default, $$file as file, $$url as url };

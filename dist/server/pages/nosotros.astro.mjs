/* empty css                                 */
import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_DmtLvZrB.mjs';
import 'kleur/colors';
import { $ as $$MainLayout, S as SITE } from '../chunks/MainLayout_DO3iz31P.mjs';
import { $ as $$PrimaryCTA } from '../chunks/PrimaryCTA_BLEkIOaM.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro("https://sinergia&valores");
const $$MainSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MainSection;
  const { title, subTitle, btnExists, btnTitle, btnURL } = Astro2.props;
  return renderTemplate`<!-- Root section of the component -->${maybeRenderHead()}<section class="mx-auto mt-10 max-w-[85rem] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="max-w-screen-md"> <!-- Section title --> <h1 class="mb-4 text-balance text-4xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200"> ${title} </h1> <!-- Section subtitle --> <p class="mb-8 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-xl"> ${subTitle} </p> <!-- Conditional rendering of PrimaryCTA component if 'btnExists' property is truthy --> ${btnExists ? renderTemplate`<div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"> ${renderComponent($$result, "PrimaryCTA", $$PrimaryCTA, { "title": btnTitle, "url": btnURL })} </div>` : null} </div> </section>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/blocks/MainSection.astro", void 0);

const $$Astro$2 = createAstro("https://sinergia&valores");
const $$StatsBig = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$StatsBig;
  const { title, subTitle } = Astro2.props;
  return renderTemplate`<!-- Container for the title and subtitle -->${maybeRenderHead()}<div class="lg:pe-6 xl:pe-12"> <p class="text-6xl font-bold leading-10 text-orange-400 dark:text-orange-300"> ${title} </p> <p class="mt-2 text-neutral-600 dark:text-neutral-400 sm:mt-3">${subTitle}</p> </div>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/blocks/StatsBig.astro", void 0);

const $$Astro$1 = createAstro("https://sinergia&valores");
const $$StatsSmall = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StatsSmall;
  const { title, subTitle } = Astro2.props;
  return renderTemplate`<!-- Container for title and subtitle -->${maybeRenderHead()}<div> <p class="text-3xl font-bold text-orange-400 dark:text-orange-300">${title}</p> <p class="mt-1 text-neutral-600 dark:text-neutral-400">${subTitle}</p> </div>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/blocks/StatsSmall.astro", void 0);

const $$Astro = createAstro("https://sinergia&valores");
const $$FeaturesStats = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FeaturesStats;
  const { title, subTitle, stats, mainStatTitle, mainStatSubTitle } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 2xl:max-w-full"> <div class="max-w-screen-md"> <!-- Main title --> <h2 class="mb-4 text-balance text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-200"> ${title} </h2> <!-- Subtitle --> ${subTitle && renderTemplate`<p class="mb-16 max-w-prose text-pretty font-light text-neutral-600 dark:text-neutral-400 sm:text-xl"> ${subTitle} </p>`} </div> <!-- Grid container for statistics --> <div class="grid items-center gap-6 lg:grid-cols-12 lg:gap-12"> <!-- First grid item, showing a big statistics --> <div class="lg:col-span-4"> ${renderComponent($$result, "StatsBig", $$StatsBig, { "title": mainStatTitle, "subTitle": mainStatSubTitle })} </div> <!-- Second grid item, showing multiple small statistics --> ${stats && renderTemplate`<div class="relative lg:col-span-8 lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-neutral-300 lg:before:dark:bg-neutral-700"> <div class="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-3"> <!-- Iterate over the 'stats' array and create a 'StatsSmall' component for each object in the array --> ${stats.map((stat) => renderTemplate`${renderComponent($$result, "StatsSmall", $$StatsSmall, { "title": stat.stat, "subTitle": stat.description })}`)} </div> </div>`} </div> </section>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/features/FeaturesStats.astro", void 0);

const $$Nosotros = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Services | ${SITE.title}`;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "MainSection", $$MainSection, { "title": "Uniting Expertise with Your Vision", "subTitle": "At ScrewFast, we take pride in providing comprehensive solutions and exceptional service in the hardware and construction industry. Our experienced team is dedicated to supporting your project from inception to completion with a range of specialized services.", "btnExists": true, "btnTitle": "Schedule a Consultation", "btnURL": "#" })}  ${renderComponent($$result2, "FeaturesStats", $$FeaturesStats, { "title": "By the Numbers", "subTitle": "Our commitment to quality and reliability is evident in every project we undertake. At ScrewFast, we are dedicated to delivering industry-leading services that ensure your construction projects are built to last.", "mainStatTitle": "96%", "mainStatSubTitle": "of our clients rate their experience with ScrewFast as exceptional", "stats": [
    {
      stat: "99.8%",
      description: "project completion rate"
    },
    {
      stat: "5,000+",
      description: "successful installations"
    },
    {
      stat: "85%",
      description: "client growth year-over-year"
    }
  ] })} ` })}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/nosotros.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/nosotros.astro";
const $$url = "/nosotros";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nosotros,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

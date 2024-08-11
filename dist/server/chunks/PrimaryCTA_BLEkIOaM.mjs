import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent } from './astro/server_DmtLvZrB.mjs';
import 'kleur/colors';
import { $ as $$Icon } from './Icon_B-g2PVmC.mjs';

const $$Astro = createAstro("https://sinergia&valores");
const $$PrimaryCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PrimaryCTA;
  const { title, url, noArrow } = Astro2.props;
  const baseClasses = "group inline-flex items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-nunito text-neutral-50 ring-zinc-500 transition duration-300 focus-visible:ring outline-none";
  const borderClasses = "border border-transparent";
  const bgColorClasses = "bg-yellow-400 dark:focus:outline-none";
  const disableClasses = "disabled:pointer-events-none disabled:opacity-50";
  const fontSizeClasses = "2xl:text-base";
  const ringClasses = "dark:ring-zinc-200";
  const darkClasses = "dark:border-neutral-700 dark:bg-yellow-400 dark:text-white dark:hover:bg-yellow-500 dark:focus:outline-none";
  return renderTemplate`<!-- Link styled as a button, with dynamic title, URL, and optional arrow -->${maybeRenderHead()}<a${addAttribute(`${baseClasses} ${darkClasses} ${borderClasses} ${bgColorClasses} ${disableClasses} ${fontSizeClasses} ${ringClasses}`, "class")}${addAttribute(url, "href")}> ${title} <!-- Display the arrow based on the 'noArrow' property --> ${noArrow ? null : renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "name": "arrowRight" })}`} </a>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/ui/buttons/PrimaryCTA.astro", void 0);

export { $$PrimaryCTA as $ };

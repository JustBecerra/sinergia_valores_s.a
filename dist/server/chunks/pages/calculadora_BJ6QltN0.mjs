/* empty css                          */
import { f as createComponent, r as renderTemplate, i as renderComponent } from '../astro_DWw_swtm.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { IoCalculatorSharp } from 'react-icons/io5';
import { $ as $$MainLayout, S as SITE } from './404_DjzsY-ys.mjs';

const calcularResultado = (rent, expenses, tipoAlquiler, duracionAlquiler) => {
  let total = 0;
  switch (tipoAlquiler) {
    case "temporal":
      total = (rent + expenses) * 6 * 0.07;
      break;
    case "residencial":
      total = (rent + expenses) * duracionAlquiler * 0.07;
      break;
    case "comercial":
      total = (rent + expenses) * duracionAlquiler * 0.07;
      break;
    default:
      total = (rent + expenses) * 0.07;
  }
  const locale = "es-AR";
  const numberFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const resultadoNormal = numberFormatter.format(total);
  const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.9);
  const anticipo25 = numberFormatter.format(total * 0.25);
  const cuota25 = numberFormatter.format(total * 0.75 / 3);
  const anticipo50 = numberFormatter.format(total * 0.5);
  const cuota50 = numberFormatter.format(total * 0.5 / 6);
  return {
    resultadoNormal,
    resultadoMenosDiezPorciento,
    anticipo25,
    cuota25,
    anticipo50,
    cuota50
  };
};
const CalcuSectionReact = () => {
  const [montoPromedio, setMontoPromedio] = useState("");
  const [montoExpensas, setMontoExpensas] = useState("");
  const [tipoAlquiler, setTipoAlquiler] = useState("");
  const [duracionAlquiler, setDuracionAlquiler] = useState("");
  const [resultados, setResultados] = useState(
    calcularResultado(0, 0, "", 0)
  );
  const formTitle = "CALCULADORA";
  const formSubTitle = "VALORES CALCULADOS EN BASE A LOS VALORES INGRESADOS. EL COSTO FINAL CORRESPONDERA AL CALCULO EN BASE A LOS VALORES DEFINITIVOS DEL CONTRATO DE ALQUILER.";
  const handleSubmit = (event) => {
    event.preventDefault();
    const rent = Number(montoPromedio);
    const expenses = Number(montoExpensas);
    const duracionAlquilerNumber = Number(duracionAlquiler);
    const newResultados = calcularResultado(
      rent,
      expenses,
      tipoAlquiler,
      duracionAlquilerNumber
    );
    setResultados(newResultados);
  };
  return /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-xl p-4 sm:p-6 lg:p-8", children: [
      /* @__PURE__ */ jsxs("h1", { className: "space-xs-2 mb-6 flex items-center justify-center gap-4 text-2xl font-bold tracking-wider text-black", children: [
        /* @__PURE__ */ jsx(IoCalculatorSharp, { className: "text-text-neutral-700 dark:text-white" }),
        /* @__PURE__ */ jsx("span", { className: "text-text-neutral-700 dark:text-white", children: formTitle }),
        /* @__PURE__ */ jsx(IoCalculatorSharp, { className: "text-text-neutral-700 dark:text-white" })
      ] }),
      /* @__PURE__ */ jsx("form", { id: "calculatorForm", onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Monto promedio de tu alquiler" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "rent",
                id: "rent",
                className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1",
                placeholder: "Monto promedio de tu alquiler",
                value: montoPromedio,
                onChange: (e) => setMontoPromedio(Number(e.target.value)),
                step: "1.00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Monto Expensas" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                name: "expenses",
                id: "expenses",
                className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1",
                placeholder: "Monto Expensas",
                value: montoExpensas,
                onChange: (e) => setMontoExpensas(Number(e.target.value)),
                step: "1.00"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: tipoAlquiler,
              onChange: (e) => setTipoAlquiler(e.target.value),
              className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, className: "text-gray-500", children: "Seleccione el tipo de alquiler" }),
                /* @__PURE__ */ jsx("option", { value: "temporal", children: "Temporal" }),
                /* @__PURE__ */ jsx("option", { value: "residencial", children: "Residencial" }),
                /* @__PURE__ */ jsx("option", { value: "comercial", children: "Comercial" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: duracionAlquiler,
              onChange: (e) => setDuracionAlquiler(Number(e.target.value)),
              className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, className: "text-gray-500", children: "Seleccione la duración del alquiler" }),
                tipoAlquiler === "temporal" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("option", { value: "6", children: "6 Meses" }),
                  /* @__PURE__ */ jsx("option", { value: "7", children: "7 Meses" }),
                  /* @__PURE__ */ jsx("option", { value: "8", children: "8 Meses" })
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx("option", { value: "12", children: "12 Meses" }),
                  /* @__PURE__ */ jsx("option", { value: "18", children: "18 Meses" }),
                  /* @__PURE__ */ jsx("option", { value: "24", children: "24 Meses" }),
                  /* @__PURE__ */ jsx("option", { value: "36", children: "36 Meses" })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 grid", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: `inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-yellow-400 px-4 py-3 text-sm font-bold text-neutral-700 outline-none ring-zinc-500 transition duration-300 hover:bg-yellow-500 focus-visible:ring disabled:pointer-events-none disabled:opacity-50 dark:ring-zinc-200 dark:focus:outline-none 2xl:text-base`,
            children: "CALCULAR"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-center", children: /* @__PURE__ */ jsx("p", { className: "mb-10 mt-1 font-nunito text-xs text-neutral-600 dark:text-neutral-400", children: formSubTitle }) }),
        /* @__PURE__ */ jsx("div", { id: "result", className: "mt-6 text-center" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between gap-4 md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 font-nunito text-2xl", children: "10% OFF - Pago contado" }),
        /* @__PURE__ */ jsxs("div", { id: "result10Off", className: "my-4 font-nunito text-4xl", children: [
          "$",
          resultados.resultadoMenosDiezPorciento
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-nunito text-lg", children: "(con 10% de descuento incluido)" }),
        /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-300 dark:border-gray-700" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 flex-grow space-y-2 text-base", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-nunito", children: "Costo original del Servicio:" }),
            /* @__PURE__ */ jsxs("span", { id: "costoOriginal", className: "font-nunito", children: [
              "$",
              resultados.resultadoNormal
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-nunito", children: "Descuento 10%:" }),
            /* @__PURE__ */ jsxs("span", { id: "descuentoValor", className: "font-nunito", children: [
              "$",
              (Number(resultados.resultadoNormal) - Number(resultados.resultadoMenosDiezPorciento)).toFixed(0)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-nunito", children: "Total costo por servicio:" }),
            /* @__PURE__ */ jsxs("span", { id: "totalCosto", className: "font-nunito", children: [
              "$",
              resultados.resultadoMenosDiezPorciento
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-nunito text-sm", children: "Promoción válida hasta el DD/MM/AAAA" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 font-nunito text-2xl", children: "25% Anticipo + 3 cuotas sin interés" }),
        /* @__PURE__ */ jsxs("div", { id: "anticipo25", className: "my-4 font-nunito text-4xl", children: [
          "$",
          resultados.anticipo25
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-nunito text-lg", children: "Anticipo" }),
        /* @__PURE__ */ jsxs("div", { id: "cuotas25", className: "my-4 font-nunito text-4xl", children: [
          "$",
          resultados.cuota25
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-nunito text-lg", children: [
          "3 cuotas de $",
          /* @__PURE__ */ jsx("span", { id: "cuotaValor25", children: resultados.cuota25 })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-300 dark:border-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex-grow space-y-2 text-base", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-nunito", children: "Total costo por servicio:" }),
          /* @__PURE__ */ jsxs("span", { id: "totalCosto25", className: "font-nunito", children: [
            "$",
            resultados.resultadoNormal
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-nunito text-sm", children: "Promoción válida hasta el DD/MM/AAAA" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 font-nunito text-2xl", children: "50% Anticipo + 6 cuotas sin interés" }),
        /* @__PURE__ */ jsxs("div", { id: "anticipo50", className: "my-4 font-nunito text-4xl", children: [
          "$",
          resultados.anticipo50
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-nunito text-lg", children: "Anticipo" }),
        /* @__PURE__ */ jsxs("div", { id: "cuotas50", className: "my-4 font-nunito text-4xl", children: [
          "$",
          resultados.cuota50
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "font-nunito text-lg", children: [
          "6 cuotas de $",
          /* @__PURE__ */ jsxs("span", { id: "cuotaValor50", className: "font-nunito", children: [
            "$",
            resultados.cuota50
          ] })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-300 dark:border-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex-grow space-y-2 text-base", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-nunito", children: "Total costo por servicio:" }),
          /* @__PURE__ */ jsxs("span", { id: "totalCosto50", className: "font-nunito", children: [
            "$",
            resultados.resultadoNormal
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-nunito text-sm", children: "Promoción válida hasta el DD/MM/AAAA" })
      ] })
    ] })
  ] }) });
};

const $$Calculadora = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Calculadora | ${SITE.title}`;
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CalcuSectionReact", CalcuSectionReact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/sections/CalcuSectionReact", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/calculadora.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/calculadora.astro";
const $$url = "/calculadora";

export { $$Calculadora as default, $$file as file, $$url as url };

/* empty css                          */
import { f as createComponent, r as renderTemplate, i as renderComponent } from '../astro_DWw_swtm.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { IoCalculatorSharp } from 'react-icons/io5';
import { $ as $$MainLayout, S as SITE } from './404_ChRBmUpV.mjs';

const calcularResultado = (rent, expenses, tipoAlquiler, duracionAlquiler) => {
  let total = 0;
  switch (tipoAlquiler) {
    case "temporal":
      total = (rent + expenses) * duracionAlquiler * 0.07;
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
const getLastDayOfMonth = () => {
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const lastDay = new Date(year, month, 0);
  const formattedDate = lastDay.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  return formattedDate;
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
    const rent = Number(montoPromedio) || 0;
    const expenses = Number(montoExpensas) || 0;
    const duracionAlquilerNumber = Number(duracionAlquiler) || 0;
    const newResultados = calcularResultado(
      rent,
      expenses,
      tipoAlquiler,
      duracionAlquilerNumber
    );
    setResultados(newResultados);
  };
  const promocionValidaHasta = getLastDayOfMonth();
  return /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded-xl p-4 sm:p-6 lg:p-8", children: [
      /* @__PURE__ */ jsxs("h1", { className: "space-xs-2 mb-6 flex items-center justify-center gap-4 text-2xl font-bold tracking-wider text-black", children: [
        /* @__PURE__ */ jsx(IoCalculatorSharp, { className: "text-text-yellow-400 dark:text-yellow-400" }),
        /* @__PURE__ */ jsx("span", { className: "text-text-neutral-700 dark:text-white", children: formTitle }),
        /* @__PURE__ */ jsx(IoCalculatorSharp, { className: "text-text-yellow-400 dark:text-yellow-400" })
      ] }),
      /* @__PURE__ */ jsx("form", { id: "calculatorForm", onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Monto promedio de tu alquiler" }),
            /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-3 text-sm text-neutral-700 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-lg dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-600", children: "$" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "rent",
                  id: "rent",
                  className: "block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-white focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-white dark:focus:ring-1 hide-number-arrows",
                  placeholder: "Monto promedio de tu alquiler",
                  value: montoPromedio,
                  onChange: (e) => setMontoPromedio(e.target.value === "" ? "" : Number(e.target.value)),
                  step: "1.00"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Monto Expensas" }),
            /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-3 text-sm text-neutral-700 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-lg dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-600", children: "$" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  name: "expenses",
                  id: "expenses",
                  className: "block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-white focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-white dark:focus:ring-1 hide-number-arrows",
                  placeholder: "Monto Expensas",
                  value: montoExpensas,
                  onChange: (e) => setMontoExpensas(e.target.value === "" ? "" : Number(e.target.value)),
                  step: "1.00"
                }
              )
            ] })
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
              onChange: (e) => setDuracionAlquiler(
                e.target.value === "" ? "" : Number(e.target.value)
              ),
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
            className: `inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-700 focus-visible:ring outline-none transition duration-300 border border-transparent bg-yellow-400 dark:focus:outline-none hover:bg-yellow-500 2xl:text-base disabled:pointer-events-none disabled:opacity-50 ring-zinc-500 dark:ring-zinc-200`,
            children: "CALCULAR"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-center", children: /* @__PURE__ */ jsx("p", { className: "mb-10 mt-1 font-nunito text-xs text-neutral-600 dark:text-neutral-400", children: formSubTitle }) }),
        /* @__PURE__ */ jsx("div", { id: "result", className: "mt-6 text-center" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col rounded-lg bg-yellow-500 p-8 text-center text-black shadow-lg dark:bg-yellow-600", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "10% OFF - Pago contado" }),
        /* @__PURE__ */ jsxs("div", { id: "result10Off", className: "my-4 text-5xl font-semibold", children: [
          "$",
          resultados.resultadoMenosDiezPorciento
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "(con 10% de descuento incluido)" }),
        /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-200 dark:border-gray-700" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-base", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Costo original del Servicio:" }),
            /* @__PURE__ */ jsxs("span", { id: "costoOriginal", children: [
              "$",
              resultados.resultadoNormal
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Descuento 10%:" }),
            /* @__PURE__ */ jsxs("span", { id: "descuentoValor", children: [
              "$",
              (Number(resultados.resultadoNormal) - Number(resultados.resultadoMenosDiezPorciento)).toFixed(0)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Total costo por servicio:" }),
            /* @__PURE__ */ jsxs("span", { id: "totalCosto", children: [
              "$",
              resultados.resultadoMenosDiezPorciento
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm", children: [
          "Promoción válida hasta el ",
          promocionValidaHasta
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col rounded-lg bg-yellow-400 p-8 text-center text-black shadow-lg dark:bg-yellow-400", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "25% Anticipo + 3 cuotas sin interés" }),
        /* @__PURE__ */ jsxs("div", { id: "anticipo25", className: "my-4 text-5xl font-semibold", children: [
          "$",
          resultados.anticipo25
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Anticipo" }),
        /* @__PURE__ */ jsxs("div", { id: "cuotas25", className: "my-4 text-5xl font-semibold", children: [
          "$",
          resultados.cuota25
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg", children: [
          "3 cuotas de $",
          /* @__PURE__ */ jsx("span", { id: "cuotaValor25", children: resultados.cuota25 })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-200 dark:border-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3 text-base", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Total costo por servicio:" }),
          /* @__PURE__ */ jsxs("span", { id: "totalCosto25", children: [
            "$",
            resultados.resultadoNormal
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm", children: [
          "Promoción válida hasta el ",
          promocionValidaHasta
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col rounded-lg bg-yellow-400 p-8 text-center text-black shadow-lg dark:bg-yellow-400", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-3xl font-bold", children: "50% Anticipo + 6 cuotas sin interés" }),
        /* @__PURE__ */ jsxs("div", { id: "anticipo50", className: "my-4 text-5xl font-semibold", children: [
          "$",
          resultados.anticipo50
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg", children: "Anticipo" }),
        /* @__PURE__ */ jsxs("div", { id: "cuotas50", className: "my-4 text-5xl font-semibold", children: [
          "$",
          resultados.cuota50
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg", children: [
          "6 cuotas de $",
          /* @__PURE__ */ jsx("span", { id: "cuotaValor50", children: resultados.cuota50 })
        ] }),
        /* @__PURE__ */ jsx("hr", { className: "my-4 border-gray-200 dark:border-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3 text-base", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Total costo por servicio:" }),
          /* @__PURE__ */ jsxs("span", { id: "totalCosto50", children: [
            "$",
            resultados.resultadoNormal
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm", children: [
          "Promoción válida hasta el ",
          promocionValidaHasta
        ] })
      ] })
    ] })
  ] }) });
};

const $$Calculadora = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Calculadora | ${SITE.title}`;
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CalcuSectionReact", CalcuSectionReact, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/sections/CalcuSectionReact", "client:component-export": "default" })} ` })}`;
}, "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/calculadora.astro", void 0);

const $$file = "C:/Users/NICO/Desktop/Diegote/sinergia_valores_s.a/src/pages/calculadora.astro";
const $$url = "/calculadora";

export { $$Calculadora as default, $$file as file, $$url as url };

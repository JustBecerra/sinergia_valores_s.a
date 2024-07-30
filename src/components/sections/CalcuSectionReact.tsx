import React, { useState } from "react";
import { FaCalculator } from 'react-icons/fa';
import { IoCalculatorSharp } from "react-icons/io5";
interface CalculationResult {
  resultadoNormal: string;
  resultadoMenosDiezPorciento: string;
  anticipo25: string;
  cuota25: string;
  anticipo50: string;
  cuota50: string;
}

const calcularResultado = (
  rent: number,
  expenses: number,
  tipoAlquiler: string,
  duracionAlquiler: number,
): CalculationResult => {
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
    maximumFractionDigits: 0,
  });

  const resultadoNormal = numberFormatter.format(total);
  const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.9);
  const anticipo25 = numberFormatter.format(total * 0.25);
  const cuota25 = numberFormatter.format((total * 0.75) / 3);
  const anticipo50 = numberFormatter.format(total * 0.5);
  const cuota50 = numberFormatter.format((total * 0.5) / 6);

  return {
    resultadoNormal,
    resultadoMenosDiezPorciento,
    anticipo25,
    cuota25,
    anticipo50,
    cuota50,
  };
};

const CalcuSectionReact: React.FC = () => {
  const [montoPromedio, setMontoPromedio] = useState<number | "">("");
  const [montoExpensas, setMontoExpensas] = useState<number | "">("");
  const [tipoAlquiler, setTipoAlquiler] = useState<string>("");
  const [duracionAlquiler, setDuracionAlquiler] = useState<number | "">("");

  const [resultados, setResultados] = useState<CalculationResult>(
    calcularResultado(0, 0, "", 0)
  );

  const formTitle: string = "CALCULADORA";
  const formSubTitle: string =
    "VALORES CALCULADOS EN BASE A LOS VALORES INGRESADOS. EL COSTO FINAL CORRESPONDERA AL CALCULO EN BASE A LOS VALORES DEFINITIVOS DEL CONTRATO DE ALQUILER.";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const rent = Number(montoPromedio);
    const expenses = Number(montoExpensas);
    const duracionAlquilerNumber = Number(duracionAlquiler);

    const newResultados = calcularResultado(
      rent,
      expenses,
      tipoAlquiler,
      duracionAlquilerNumber,
    );
    setResultados(newResultados);
  };

  return (
  <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
  <div className="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
    <div className="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8">
    <h1 className="space-xs-2 mb-6 flex items-center justify-center gap-4 text-2xl font-bold tracking-wider text-black">
    <FaCalculator className="text-text-neutral-700 dark:text-white" />
        <span className="text-text-neutral-700 dark:text-white">{formTitle}</span>
        <IoCalculatorSharp className="text-text-neutral-700 dark:text-white" />
      </h1>

      <form id="calculatorForm" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="relative">
              <label className="sr-only">{"Monto promedio de tu alquiler"}</label>
              <input
                type="number"
                name="rent"
                id="rent"
                className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                placeholder="Monto promedio de tu alquiler"
                value={montoPromedio}
                onChange={(e) => setMontoPromedio(Number(e.target.value))}
                step="1.00"
              />
            </div>
            <div className="relative">
              <label className="sr-only">{"Monto Expensas"}</label>
              <input
                type="number"
                name="expenses"
                id="expenses"
                className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                placeholder="Monto Expensas"
                value={montoExpensas}
                onChange={(e) => setMontoExpensas(Number(e.target.value))}
                step="1.00"
              />
            </div>
            <div className="relative">
              <select
                value={tipoAlquiler}
                onChange={(e) => setTipoAlquiler(e.target.value)}
                className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              >
                <option value="" disabled>
                  Seleccione el tipo de alquiler
                </option>
                <option value="temporal">Temporal</option>
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
            <div>
              <select
                value={duracionAlquiler}
                onChange={(e) =>
                  setDuracionAlquiler(Number(e.target.value))
                }
                className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
              >
                <option value="" disabled>
                  Seleccione la duración del alquiler
                </option>
                {tipoAlquiler === "temporal" ? (
                  <>
                    <option value="6">6 Meses</option>
                    <option value="7">7 Meses</option>
                    <option value="8">8 Meses</option>
                  </>
                ) : (
                  <>
                    <option value="12">12 Meses</option>
                    <option value="18">18 Meses</option>
                    <option value="24">24 Meses</option>
                    <option value="36">36 Meses</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <div className="mt-4 grid">
          <button
            type="submit"
            className={`inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-700 focus-visible:ring outline-none transition duration-300 border border-transparent bg-yellow-400 dark:focus:outline-none hover:bg-yellow-500 2xl:text-base disabled:pointer-events-none disabled:opacity-50 ring-zinc-500 dark:ring-zinc-200`}
            >
             {"CALCULAR"}
            </button>
            </div>
          <div className="mt-3 text-center">
            <p className="mb-10 mt-1 font-nunito text-xs text-neutral-600 dark:text-neutral-400">
              {formSubTitle}
            </p>
          </div>
          <div id="result" className="mt-6 text-center"></div>
        </div>
      </form>
    </div>
        {/* The results section */}
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400">
            <h2 className="mb-4 font-nunito text-2xl">10% OFF - Pago contado</h2>
            <div id="result10Off" className="my-4 font-nunito text-4xl">
              ${resultados.resultadoMenosDiezPorciento}
            </div>
            <p className="font-nunito text-lg">(con 10% de descuento incluido)</p>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 flex-grow space-y-2 text-base">
              <p className="flex items-center justify-between">
                <span className="font-nunito">Costo original del Servicio:</span>
                <span id="costoOriginal" className="font-nunito">
                  ${resultados.resultadoNormal}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-nunito">Descuento 10%:</span>
                <span id="descuentoValor" className="font-nunito">
                  ${(Number(resultados.resultadoNormal) - Number(resultados.resultadoMenosDiezPorciento)).toFixed(0)}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-nunito">Total costo por servicio:</span>
                <span id="totalCosto" className="font-nunito">
                  ${resultados.resultadoMenosDiezPorciento}
                </span>
              </p>
            </div>
            <p className="mt-2 font-nunito text-sm">Promoción válida hasta el DD/MM/AAAA</p>
          </div>

          {/* <div className="flex flex-1 flex-col rounded-lg bg-teal-400 p-6 text-center text-white dark:bg-teal-400"> */}
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400">
            <h2 className="mb-4 font-nunito text-2xl">25% Anticipo + 3 cuotas sin interés</h2>
            <div id="anticipo25" className="my-4 font-nunito text-4xl">${resultados.anticipo25}</div>
            <p className="font-nunito text-lg">Anticipo</p>
            <div id="cuotas25" className="my-4 font-nunito text-4xl">${resultados.cuota25}</div>
            <p className="font-nunito text-lg">3 cuotas de $<span id="cuotaValor25">{resultados.cuota25}</span></p>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 flex-grow space-y-2 text-base">
              <p className="flex items-center justify-between">
                <span className="font-nunito">Total costo por servicio:</span>
                <span id="totalCosto25" className="font-nunito">${resultados.resultadoNormal}</span>
              </p>
            </div>
            <p className="mt-2 font-nunito text-sm">Promoción válida hasta el DD/MM/AAAA</p>
          </div>

          {/* <div className="flex flex-1 flex-col rounded-lg bg-indigo-400 p-6 text-center text-white dark:bg-indigo-400"> */}
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400">
            <h2 className="mb-4 font-nunito text-2xl">50% Anticipo + 6 cuotas sin interés</h2>
            <div id="anticipo50" className="my-4 font-nunito text-4xl">${resultados.anticipo50}</div>
            <p className="font-nunito text-lg">Anticipo</p>
            <div id="cuotas50" className="my-4 font-nunito text-4xl">${resultados.cuota50}</div>
            <p className="font-nunito text-lg">6 cuotas de $<span id="cuotaValor50" className="font-nunito">${resultados.cuota50}</span></p>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 flex-grow space-y-2 text-base">
              <p className="flex items-center justify-between">
                <span className="font-nunito">Total costo por servicio:</span>
                <span id="totalCosto50" className="font-nunito">${resultados.resultadoNormal}</span>
              </p>
            </div>
            <p className="mt-2 font-nunito text-sm">Promoción válida hasta el DD/MM/AAAA</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalcuSectionReact;

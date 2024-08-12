import React, { useState } from "react";
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
  duracionAlquiler: number
): CalculationResult => {
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

const getLastDayOfMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses son base 0 en JavaScript

  const lastDay = new Date(year, month, 0); // El día 0 del siguiente mes es el último día del mes actual
  const formattedDate = lastDay.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formattedDate;
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

  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8">
          <h1 className="space-xs-2 mb-6 flex items-center justify-center gap-4 text-2xl font-bold tracking-wider text-black">
            <IoCalculatorSharp className="text-text-yellow-400 dark:text-yellow-400" />
            <span className="text-text-neutral-700 dark:text-white">
              {formTitle}
            </span>
            <IoCalculatorSharp className="text-text-yellow-400 dark:text-yellow-400" />
          </h1>

          <form id="calculatorForm" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="relative">
                <label className="sr-only">{"Monto promedio de tu alquiler"}</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-neutral-700 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-lg dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-600">
                    $
                  </span>
                  <input
                  type="number"
                  name="rent"
                  id="rent"
                  // className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1 hide-number-arrows"
                     className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-white focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-white dark:focus:ring-1 hide-number-arrows"
                  placeholder="Monto promedio de tu alquiler"
                  value={montoPromedio}
                  onChange={(e) =>
                    setMontoPromedio(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  step="1.00"
                />
              </div>
            </div>
            
              <div className="relative">
                <label className="sr-only">{"Monto Expensas"}</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-neutral-700 bg-neutral-100 border border-r-0 border-neutral-200 rounded-l-lg dark:bg-neutral-800 dark:text-neutral-50 dark:border-neutral-600">
                    $
                  </span>
                  <input
                  type="number"
                  name="expenses"
                  id="expenses"
                  // className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1 hide-number-arrows"
                     className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-white focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-white dark:focus:ring-1 hide-number-arrows"
                  placeholder="Monto Expensas"
                  value={montoExpensas}
                  onChange={(e) =>
                    setMontoExpensas(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  step="1.00"
                />
              </div>
            </div>


                <div className="relative">
                  <select
                    value={tipoAlquiler}
                    onChange={(e) => setTipoAlquiler(e.target.value)}
                    className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                  >
                    <option value="" disabled className="text-gray-500">
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
                      setDuracionAlquiler(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                  >
                    <option value="" disabled className="text-gray-500">
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
        {/* <div className="flex flex-col justify-between gap-4 md:flex-row"> */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tarjeta 1: 10% OFF */}
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-500 p-8 text-center text-black shadow-lg dark:bg-yellow-600">
            <h2 className="mb-4 text-3xl font-bold">10% OFF - Pago contado</h2>
            <div id="result10Off" className="my-4 text-5xl font-semibold">
              ${resultados.resultadoMenosDiezPorciento}
            </div>
            <p className="text-lg">(con 10% de descuento incluido)</p>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="mt-4 space-y-3 text-base">
              <p className="flex items-center justify-between">
                <span className="font-medium">Costo original del Servicio:</span>
                <span id="costoOriginal">${resultados.resultadoNormal}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-medium">Descuento 10%:</span>
                <span id="descuentoValor">
                  ${(Number(resultados.resultadoNormal) - Number(resultados.resultadoMenosDiezPorciento)).toFixed(0)}
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-medium">Total costo por servicio:</span>
                <span id="totalCosto">${resultados.resultadoMenosDiezPorciento}</span>
              </p>
            </div>
            <p className="mt-4 text-sm">Promoción válida hasta el {promocionValidaHasta}</p>
          </div>

          {/* Tarjeta 2: 25% Anticipo + 3 cuotas */}
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-8 text-center text-black shadow-lg dark:bg-yellow-400">
            <h2 className="mb-4 text-3xl font-bold">25% Anticipo + 3 cuotas sin interés</h2>
            <div id="anticipo25" className="my-4 text-5xl font-semibold">${resultados.anticipo25}</div>
            <p className="text-lg">Anticipo</p>
            <div id="cuotas25" className="my-4 text-5xl font-semibold">${resultados.cuota25}</div>
            <p className="text-lg">3 cuotas de $<span id="cuotaValor25">{resultados.cuota25}</span></p>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="mt-4 space-y-3 text-base">
              <p className="flex items-center justify-between">
                <span className="font-medium">Total costo por servicio:</span>
                <span id="totalCosto25">${resultados.resultadoNormal}</span>
              </p>
            </div>
            <p className="mt-4 text-sm">Promoción válida hasta el {promocionValidaHasta}</p>
          </div>

          {/* Tarjeta 3: 50% Anticipo + 6 cuotas */}
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-8 text-center text-black shadow-lg dark:bg-yellow-400">
            <h2 className="mb-4 text-3xl font-bold">50% Anticipo + 6 cuotas sin interés</h2>
            <div id="anticipo50" className="my-4 text-5xl font-semibold">${resultados.anticipo50}</div>
            <p className="text-lg">Anticipo</p>
            <div id="cuotas50" className="my-4 text-5xl font-semibold">${resultados.cuota50}</div>
            <p className="text-lg">6 cuotas de $<span id="cuotaValor50">{resultados.cuota50}</span></p>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="mt-4 space-y-3 text-base">
              <p className="flex items-center justify-between">
                <span className="font-medium">Total costo por servicio:</span>
                <span id="totalCosto50">${resultados.resultadoNormal}</span>
              </p>
            </div>
            <p className="mt-4 text-sm">Promoción válida hasta el {promocionValidaHasta}</p>
  </div>
</div>

      </div>
    </section>
  );
};

export default CalcuSectionReact;

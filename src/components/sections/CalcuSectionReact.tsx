import React, { useState } from "react";

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
      total = (rent + expenses) * 0.07; // Default case if type doesn't match
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

  const [resultados, setResultados] = useState<CalculationResult | null>(null);

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
            {formTitle}
          </h1>

          <form id="calculatorForm" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="sr-only">{"rent"}</label>
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
                  <label>Tipo de Alquiler</label>
                  <select
                    value={tipoAlquiler}
                    onChange={(e) => setTipoAlquiler(e.target.value)}
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
                  <label>Duración del Alquiler</label>
                  <select
                    value={duracionAlquiler}
                    onChange={(e) =>
                      setDuracionAlquiler(Number(e.target.value))
                    }
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
                <button type="submit">{"CALCULAR"}</button>
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
        {/* The results section will go here */}
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {resultados?.resultadoNormal}
        </div>
      </div>
    </section>
  );
};

export default CalcuSectionReact;

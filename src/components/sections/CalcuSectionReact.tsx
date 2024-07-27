import React, { createElement, useState } from "react";
import Promociones from "../ui/promociones/Promociones.astro";
import Icon from "@components/ui/icons/Icon.astro";
import PrecioInput from "../ui/forms/input/PrecioInput.astro";
import MenuDesplegable from "../ui/forms/input/MenuDesplegable.astro";
import DuracionAlquiler from "../ui/forms/input/DuracionAlquiler.astro";
import AuthBtn from "../ui/buttons/AuthBtn.astro";

const CalcuSectionReact = () => {
  const [montoPromedio, setMontoPromedio] = useState("");
  const [montoExpensas, setMontoExpensas] = useState("");
  const [tipoAlquiler, setTipoAlquiler] = useState("");
  const [duracionAlquiler, setDuracionAlquiler] = useState("");
  const formTitle: string = "CALCULADORA";
  const formSubTitle: string =
    "VALORES CALCULADOS EN BASE A LOS VALORES INGRESADOS. EL COSTO FINAL CORRESPONDERA AL CALCULO EN BASE A LOS VALORES DEFINITIVOS DEL CONTRATO DE ALQUILER.";
  return (
    <section className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mt-12 grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8">
          <h1 className="space-xs-2 mb-6 flex items-center justify-center gap-4 text-2xl font-bold tracking-wider text-black">
            {/* <Icon name="calculator" /> */}
            <svg
              className="mt-1 h-6 w-6 flex-shrink-0 fill-[#000000] dark:fill-[#C9AF68]"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
            <span className="font-gotham text-neutral-700 dark:text-white">
              {formTitle}
            </span>
            {/* <Icon name="calculator" /> */}
            <svg
              className="mt-1 h-6 w-6 flex-shrink-0 fill-[#000000] dark:fill-[#C9AF68]"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
          </h1>

          <form id="calculatorForm">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="relative">
                  <label className="sr-only">{"rent"}</label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      $
                    </span>
                  </div>
                  <input
                    type="number"
                    name="rent"
                    id="rent"
                    className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    placeholder="Monto promedio de tu alquiler"
                    value={montoPromedio}
                    onChange={(e) => setMontoPromedio(e.target.value)}
                    step="1.00"
                  />
                </div>
                <div className="relative">
                  <label className="sr-only">{"Monto Expensas"}</label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      $
                    </span>
                  </div>
                  <input
                    type="number"
                    name="expenses"
                    id="expenses"
                    className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 pl-5 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus:ring-1"
                    placeholder="Monto Expensas"
                    step="1.00"
                    value={montoExpensas}
                    onChange={(e) => setMontoExpensas(e.target.value)}
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
                    defaultValue=""
                    onChange={(e) => setDuracionAlquiler(e.target.value)}
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
                  //   className={`${baseClasses} ${borderClasses} ${bgColorClasses} ${hoverClasses} ${fontSizeClasses} ${disabledClasses} ${ringClasses}`}
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
        {/* <Promociones /> */}
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400">
            <h2 className="mb-4 font-nunito text-2xl">
              10% OFF - Pago contado
            </h2>
            <div id="result10Off" className="my-4 font-nunito text-4xl">
              $0
            </div>
            <p className="font-nunito text-lg">
              (con 10% de descuento incluido)
            </p>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 flex-grow space-y-2 text-base">
              <p className="flex items-center justify-between">
                <span className="font-nunito">
                  Costo original del Servicio:
                </span>
                <span id="costoOriginal" className="font-nunito">
                  $0
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-nunito">Descuento 10%:</span>
                <span id="descuentoValor" className="font-nunito">
                  $0
                </span>
              </p>
              <p className="flex items-center justify-between">
                <span className="font-nunito">Total costo por servicio:</span>
                <span id="totalCosto" className="font-nunito">
                  $0
                </span>
              </p>
            </div>
            <p className="mt-2 font-nunito text-sm">
              Promoción válida hasta el DD/MM/AAAA
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400">
            <h2 className="mb-4 font-nunito text-2xl">
              25% Anticipo + 3 cuotas sin interés
            </h2>
            <div id="anticipo25" className="my-4 font-nunito text-4xl">
              $0
            </div>
            <p className="font-nunito text-lg">Anticipo</p>
            <div id="cuotas25" className="my-4 font-nunito text-4xl">
              $0
            </div>
            <p className="font-nunito text-lg">
              3 cuotas de $<span id="cuotaValor25">0</span>
            </p>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 flex-grow space-y-2 text-base">
              <p className="flex items-center justify-between">
                <span className="font-nunito">Total costo por servicio:</span>
                <span id="totalCosto25" className="font-nunito">
                  $0
                </span>
              </p>
            </div>
            <p className="mt-2 font-nunito text-sm">
              Promoción válida hasta el DD/MM/AAAA
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-lg bg-yellow-400 p-6 text-center text-white dark:bg-yellow-400">
            <h2 className="mb-4 font-nunito text-2xl">
              50% Anticipo + 6 cuotas sin interés
            </h2>
            <div id="anticipo50" className="my-4 font-nunito text-4xl">
              $0
            </div>
            <p className="font-nunito text-lg">Anticipo</p>
            <div id="cuotas50" className="my-4 font-nunito text-4xl">
              $0
            </div>
            <p className="font-nunito text-lg">
              6 cuotas de $
              <span id="cuotaValor50" className="font-nunito">
                0
              </span>
            </p>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />
            <div className="mt-4 flex-grow space-y-2 text-base">
              <p className="flex items-center justify-between">
                <span className="font-nunito">Total costo por servicio:</span>
                <span id="totalCosto50" className="font-nunito">
                  $0
                </span>
              </p>
            </div>
            <p className="mt-2 font-nunito text-sm">
              Promoción válida hasta el DD/MM/AAAA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalcuSectionReact;

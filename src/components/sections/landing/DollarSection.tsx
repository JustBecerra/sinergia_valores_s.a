import React, { useEffect, useRef, useState } from "react";
import { DollarValues } from "@/api/DollarValues";
type dolarType = {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
};
const DollarPrices = () => {
  const [dollarPrices, setDollarPrices] = useState<dolarType[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDollarPrices = async () => {
      try {
        const prices = await DollarValues();
        setDollarPrices(prices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dollar prices:", error);
        setLoading(false);
      }
    };
    const scrollContainer = scrollRef;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer!.current!.scrollLeft += 1; // Adjust scroll speed here
      }
    };

    const intervalId = setInterval(scroll, 50); // Adjust interval for smoothness

    fetchDollarPrices();

    const interval = setInterval(() => {
      fetchDollarPrices();
    }, 3600000);

    return () => {
      clearInterval(interval);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="mx-auto mt-6 w-[100%]">
      <div
        ref={scrollRef}
        className="flex w-[100%] gap-4 overflow-auto bg-white px-4 py-6 sm:px-6 md:items-center md:gap-8 lg:px-8 2xl:max-w-full"
      >
        {loading ? (
          <h1>cargando precios...</h1>
        ) : (
          dollarPrices.map((dolar, index) => (
            <div
              className="flex w-[30%] flex-shrink-0 items-center justify-center gap-4 border-2 border-yellow-500 p-2"
              key={index}
            >
              <div className="flex flex-col">
                <h1 className="text-center">{dolar.moneda}</h1>
                <h1 className="text-nowrap text-center">{dolar.nombre}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-center">Compra: </h1>
                <h1 className="text-center">{dolar.compra}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-center">Venta: </h1>
                <h1 className="text-center">{dolar.venta}</h1>
              </div>
              <div className="flex w-[fit] flex-col">
                <h1 className="text-nowrap text-center">Fecha Valor:</h1>
                <h1 className="text-center">
                  {dolar.fechaActualizacion.substring(0, 10)}
                </h1>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DollarPrices;

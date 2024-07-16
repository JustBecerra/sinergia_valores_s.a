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
      if (
        scrollContainer.current &&
        scrollContainer.current!.scrollLeft !==
          scrollContainer.current.scrollWidth -
            scrollContainer.current.clientWidth
      ) {
        scrollContainer.current.scrollLeft += 1;
      } else if (scrollContainer.current) {
        scrollContainer.current.scrollLeft = 0;
      }
    };

    const intervalId = setInterval(scroll, 50);

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
        className="scrollbar-hide flex w-[100%] gap-4 overflow-y-hidden overflow-x-scroll rounded-xl border-2 border-blue-50 px-4 py-6 dark:border-yellow-500 sm:px-6 md:items-center md:gap-8 lg:px-8 2xl:max-w-full"
      >
        {loading ? (
          <h1>cargando precios...</h1>
        ) : (
          dollarPrices.map((dolar, index) => (
            <div
              className="flex w-[25%] min-w-[230px] flex-shrink-0 items-center justify-center gap-4 rounded-xl border-2 border-blue-50 p-2 dark:border-yellow-500"
              key={index}
            >
              <div className="flex flex-col">
                <h1 className="text-center text-black dark:text-white">
                  {dolar.moneda}
                </h1>
                <h1 className="text-nowrap text-center text-black dark:text-white">
                  {dolar.nombre === "Contado con liquidación"
                    ? "CCL"
                    : dolar.nombre}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-center text-black dark:text-white">
                  Compra:{" "}
                </h1>
                <h1 className="text-center text-black dark:text-white">
                  {dolar.compra}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-center text-black dark:text-white">
                  Venta:{" "}
                </h1>
                <h1 className="text-center text-black dark:text-white">
                  {dolar.venta}
                </h1>
              </div>
              {/* <div className="flex w-[fit] flex-col">
                <h1 className="text-nowrap text-center text-white">
                  Fecha Valor:
                </h1>
                <h1 className="text-center text-white">
                  {dolar.fechaActualizacion.substring(0, 10)}
                </h1>
              </div> */}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DollarPrices;

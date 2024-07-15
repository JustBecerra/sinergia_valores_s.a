import React, { useEffect, useState } from "react";
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

    fetchDollarPrices();

    const interval = setInterval(() => {
      fetchDollarPrices();
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto mt-6 flex max-w-[85rem] gap-4 bg-white px-4 py-14 sm:px-6 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:px-8 2xl:max-w-full">
      {loading ? (
        <h1>cargando precios...</h1>
      ) : (
        dollarPrices.map((dolar: dolarType, index) => (
          <div className="flex gap-4" key={index}>
            <h1>
              {dolar.moneda} {dolar.nombre}
            </h1>
            <h1>Compra: {dolar.compra}</h1>
            <h1>Venta: {dolar.venta}</h1>
            <h1>Fecha Valor: {dolar.fechaActualizacion}</h1>
          </div>
        ))
      )}
    </section>
  );
};

export default DollarPrices;

// export function calcularResultado(rent: number, expenses: number, tipoAlquiler: string, duracionAlquiler: number): { resultadoNormal: string, resultadoMenosDiezPorciento: string } {
//   const factorTipoAlquiler = tipoAlquiler === 'residencial' ? 1.1 : 1.2;
//   const total = (rent + expenses) * factorTipoAlquiler * duracionAlquiler;
//   //result normal
//   const resultadoNormal = total.toFixed(2);
//   // result -10%
//   const resultadoMenosDiezPorciento = (total * 0.9).toFixed(2);

//   return { resultadoNormal, resultadoMenosDiezPorciento };

// }

// export function handleSubmit(event: Event): void {
//   event.preventDefault();
//   const form = event.target as HTMLFormElement;
//   const formData = new FormData(form);

//   const rent = parseFloat(formData.get('rent') as string);
//   const expenses = parseFloat(formData.get('expenses') as string);
//   const tipoAlquiler = formData.get('tipoAlquiler') as string;
//   const duracionAlquiler = parseInt(formData.get('duracionAlquiler') as string, 10);

//   const { resultadoNormal, resultadoMenosDiezPorciento } = calcularResultado(rent, expenses, tipoAlquiler, duracionAlquiler);

//   const resultElement = document.getElementById('result');
//   if (resultElement) {
//     resultElement.innerHTML = `<p>Resultado Normal: $${resultadoNormal}</p>
//       <p>Resultado -10%: $${resultadoMenosDiezPorciento}</p>`;
//   }
// }

// funciona para reflejar en 10% en la primer card
// export function calcularResultado(rent: number, expenses: number, tipoAlquiler: string, duracionAlquiler: number): { resultadoNormal: string, resultadoMenosDiezPorciento: string } {
//   const factorTipoAlquiler = tipoAlquiler === 'residencial' ? 1.1 : 1.2;
//   const total = (rent + expenses) * factorTipoAlquiler * duracionAlquiler;

//   // Resultado normal
//   const resultadoNormal = total.toFixed(2);

//   // Resultado -10%
//   const resultadoMenosDiezPorciento = (total * 0.9).toFixed(2);

//   return { resultadoNormal, resultadoMenosDiezPorciento };
// }

// export function handleSubmit(event: Event): void {
//   event.preventDefault();
//   const form = event.target as HTMLFormElement;
//   const formData = new FormData(form);

//   const rent = parseFloat(formData.get('rent') as string);
//   const expenses = parseFloat(formData.get('expenses') as string);
//   const tipoAlquiler = formData.get('tipoAlquiler') as string;
//   const duracionAlquiler = parseInt(formData.get('duracionAlquiler') as string, 10);

//   const { resultadoNormal, resultadoMenosDiezPorciento } = calcularResultado(rent, expenses, tipoAlquiler, duracionAlquiler);

//   const costoOriginalElement = document.getElementById('costoOriginal');
//   const descuentoValorElement = document.getElementById('descuentoValor');
//   const totalCostoElement = document.getElementById('totalCosto');
//   const descuentoElement = document.getElementById('descuento');

//   if (costoOriginalElement) {
//     costoOriginalElement.textContent = resultadoNormal;
//   }

//   if (descuentoValorElement) {
//     descuentoValorElement.textContent = (parseFloat(resultadoNormal) - parseFloat(resultadoMenosDiezPorciento)).toFixed(2);
//   }

//   if (totalCostoElement) {
//     totalCostoElement.textContent = resultadoMenosDiezPorciento;
//   }

//   if (descuentoElement) {
//     descuentoElement.textContent = `$${resultadoMenosDiezPorciento}`;
//   }
// }
// probando todas las cards
// export function calcularResultado(rent: number, expenses: number, tipoAlquiler: string, duracionAlquiler: number): { resultadoNormal: string, resultadoMenosDiezPorciento: string, anticipo25: string, cuota25: string, anticipo50: string, cuota50: string } {
//   const factorTipoAlquiler = tipoAlquiler === 'residencial' ? 1.1 : 1.2;
//   const total = (rent + expenses) * factorTipoAlquiler * duracionAlquiler;

//   // Resultado normal
//   const resultadoNormal = total.toFixed(2);

//   // Resultado -10%
//   const resultadoMenosDiezPorciento = (total * 0.9).toFixed(2);

//   // 25% Anticipo + 3 cuotas
//   const anticipo25 = (total * 0.25).toFixed(2);
//   const cuota25 = ((total * 0.75) / 3).toFixed(2);

//   // 50% Anticipo + 6 cuotas
//   const anticipo50 = (total * 0.5).toFixed(2);
//   const cuota50 = ((total * 0.5) / 6).toFixed(2);

//   return { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 };
// }

// export function handleSubmit(event: Event): void {
//   event.preventDefault();
//   const form = event.target as HTMLFormElement;
//   const formData = new FormData(form);

//   const rent = parseFloat(formData.get('rent') as string);
//   const expenses = parseFloat(formData.get('expenses') as string);
//   const tipoAlquiler = formData.get('tipoAlquiler') as string;
//   const duracionAlquiler = parseInt(formData.get('duracionAlquiler') as string, 10);

//   const { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 } = calcularResultado(rent, expenses, tipoAlquiler, duracionAlquiler);

//   const resultElement10Off = document.getElementById('result10Off');
//   const costoOriginalElement = document.getElementById('costoOriginal');
//   const descuentoValorElement = document.getElementById('descuentoValor');
//   const totalCostoElement = document.getElementById('totalCosto');

//   const anticipo25Element = document.getElementById('anticipo25');
//   const cuota25Element = document.getElementById('cuotas25');
//   const cuotaValor25Element = document.getElementById('cuotaValor25');
//   const totalCosto25Element = document.getElementById('totalCosto25');

//   const anticipo50Element = document.getElementById('anticipo50');
//   const cuota50Element = document.getElementById('cuotas50');
//   const cuotaValor50Element = document.getElementById('cuotaValor50');
//   const totalCosto50Element = document.getElementById('totalCosto50');

//   if (resultElement10Off) {
//     resultElement10Off.textContent = `$${resultadoMenosDiezPorciento}`;
//   }
//   if (costoOriginalElement) {
//     costoOriginalElement.textContent = resultadoNormal;
//   }
//   if (descuentoValorElement) {
//     descuentoValorElement.textContent = (parseFloat(resultadoNormal) - parseFloat(resultadoMenosDiezPorciento)).toFixed(2);
//   }
//   if (totalCostoElement) {
//     totalCostoElement.textContent = resultadoMenosDiezPorciento;
//   }

//   if (anticipo25Element) {
//     anticipo25Element.textContent = `$${anticipo25}`;
//   }
//   if (cuota25Element) {
//     cuota25Element.textContent = `$${cuota25}`;
//   }
//   if (cuotaValor25Element) {
//     cuotaValor25Element.textContent = cuota25;
//   }
//   if (totalCosto25Element) {
//     totalCosto25Element.textContent = resultadoNormal;
//   }

//   if (anticipo50Element) {
//     anticipo50Element.textContent = `$${anticipo50}`;
//   }
//   if (cuota50Element) {
//     cuota50Element.textContent = `$${cuota50}`;
//   }
//   if (cuotaValor50Element) {
//     cuotaValor50Element.textContent = cuota50;
//   }
//   if (totalCosto50Element) {
//     totalCosto50Element.textContent = resultadoNormal;
//   }
// }

// --------------------------------FUNCIONA (SIN REACT) PERO EN PRODUCCION NO FUNCIONA--------------------------------
// export function calcularResultado(rent: number, expenses: number, tipoAlquiler: string, duracionAlquiler: number): { resultadoNormal: string, resultadoMenosDiezPorciento: string, anticipo25: string, cuota25: string, anticipo50: string, cuota50: string } {
//   let total = 0;

//   switch(tipoAlquiler) {
//     case 'temporal':
//       total = ((rent + expenses) * 6) * 0.07;
//       break;
//     case 'residencial':
//       total = ((rent + expenses) * duracionAlquiler) * 0.07;
//       break;
//     case 'comercial':
//       total = ((rent + expenses) * duracionAlquiler) * 0.07;
//       break;
//     default:
//       total = (rent + expenses) * 0.07; // Default case if type doesn't match
//   }

//   const locale = 'es-AR';
//   console.log("hola")
//   console.log(total);
//   // Formateador para el sistema de numeración argentino
//   const numberFormatter = new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

//   // Resultado normal
//   const resultadoNormal = numberFormatter.format(total);

//   // Resultado -10%
//   const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.9);

//   // 25% Anticipo + 3 cuotas
//   const anticipo25 = numberFormatter.format(total * 0.25);
//   const cuota25 = numberFormatter.format((total * 0.75) / 3);

//   // 50% Anticipo + 6 cuotas
//   const anticipo50 = numberFormatter.format(total * 0.5);
//   const cuota50 = numberFormatter.format((total * 0.5) / 6);

//   return { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 };
// }

// export function handleSubmit(event: Event): void {
//   event.preventDefault();
//   const form = event.target as HTMLFormElement;
//   const formData = new FormData(form);

//   const rent = parseFloat(formData.get('rent') as string);
//   const expenses = parseFloat(formData.get('expenses') as string);
//   const tipoAlquiler = formData.get('tipoAlquiler') as string;
//   const duracionAlquiler = parseInt(formData.get('duracionAlquiler') as string, 10);

//   const { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 } = calcularResultado(rent, expenses, tipoAlquiler, duracionAlquiler);

//   const resultElement10Off = document.getElementById('result10Off');
//   const costoOriginalElement = document.getElementById('costoOriginal');
//   const descuentoValorElement = document.getElementById('descuentoValor');
//   const totalCostoElement = document.getElementById('totalCosto');

//   const anticipo25Element = document.getElementById('anticipo25');
//   const cuota25Element = document.getElementById('cuotas25');
//   const cuotaValor25Element = document.getElementById('cuotaValor25');
//   const totalCosto25Element = document.getElementById('totalCosto25');

//   const anticipo50Element = document.getElementById('anticipo50');
//   const cuota50Element = document.getElementById('cuotas50');
//   const cuotaValor50Element = document.getElementById('cuotaValor50');
//   const totalCosto50Element = document.getElementById('totalCosto50');

//   if (resultElement10Off) {
//     resultElement10Off.textContent = `$${resultadoMenosDiezPorciento}`;
//   }
//   if (costoOriginalElement) {
//     costoOriginalElement.textContent = `$${resultadoNormal}`;
//   }
//   if (descuentoValorElement) {
//     const descuentoValor = parseFloat(resultadoNormal.replace(/\./g, '')) - parseFloat(resultadoMenosDiezPorciento.replace(/\./g, ''));
//     descuentoValorElement.textContent = `-$${new Intl.NumberFormat('es-AR').format(descuentoValor)}`;
//   }
//   if (totalCostoElement) {
//     totalCostoElement.textContent = `$${resultadoMenosDiezPorciento}`;
//   }

//   if (anticipo25Element) {
//     anticipo25Element.textContent = `$${anticipo25}`;
//   }
//   if (cuota25Element) {
//     cuota25Element.textContent = `$${cuota25}`;
//   }
//   if (cuotaValor25Element) {
//     cuotaValor25Element.textContent = cuota25;
//   }
//   if (totalCosto25Element) {
//     totalCosto25Element.textContent = `$${resultadoNormal}`;
//   }

//   if (anticipo50Element) {
//     anticipo50Element.textContent = `$${anticipo50}`;
//   }
//   if (cuota50Element) {
//     cuota50Element.textContent = `$${cuota50}`;
//   }
//   if (cuotaValor50Element) {
//     cuotaValor50Element.textContent = cuota50;
//   }
//   if (totalCosto50Element) {
//     totalCosto50Element.textContent = `$${resultadoNormal}`;
//   }
// }

//  CALCULADORA CON REACT


// import React from 'react';

// console.log("hola aa aa")
// const Calculator = () => {
//   const [rent, setRent] = useState('');
//   const [expenses, setExpenses] = useState('');
//   const [tipoAlquiler, setTipoAlquiler] = useState('');
//   const [duracionAlquiler, setDuracionAlquiler] = useState('');
//   const [results, setResults] = useState(null);

//   const calcularResultado = (rent, expenses, tipoAlquiler, duracionAlquiler) => {
//     let total = 0;
//     switch (tipoAlquiler) {
//       case 'temporal':
//         total = ((rent + expenses) * 6) * 0.07;
//         break;
//       case 'residencial':
//       case 'comercial':
//         total = ((rent + expenses) * duracionAlquiler) * 0.07;
//         break;
//       default:
//         total = (rent + expenses) * 0.07;
//     }
//     console.log(total);
//     console.log("total");

//     const numberFormatter = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

//     const resultadoNormal = numberFormatter.format(total);
//     const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.9);
//     const anticipo25 = numberFormatter.format(total * 0.25);
//     const cuota25 = numberFormatter.format((total * 0.75) / 3);
//     const anticipo50 = numberFormatter.format(total * 0.5);
//     const cuota50 = numberFormatter.format((total * 0.5) / 6);

//     return { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 };
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const results = calcularResultado(parseFloat(rent), parseFloat(expenses), tipoAlquiler, parseInt(duracionAlquiler, 10));
//     setResults(results);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid gap-4">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <label>Monto promedio de tu alquiler</label>
//             <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
//           </div>
//           <div>
//             <label>Monto Expensas</label>
//             <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
//           </div>
//           <div>
//             <label>Tipo de Alquiler</label>
//             <select value={tipoAlquiler} onChange={(e) => setTipoAlquiler(e.target.value)}>
//               <option value="" disabled>Seleccione el tipo de alquiler</option>
//               <option value="temporal">Temporal</option>
//               <option value="residencial">Residencial</option>
//               <option value="comercial">Comercial</option>
//             </select>
//           </div>
//           <div>
//             <label>Duración del Alquiler</label>
//             <select value={duracionAlquiler} onChange={(e) => setDuracionAlquiler(e.target.value)}>
//               <option value="" disabled>Seleccione la duración del alquiler</option>
//               {tipoAlquiler === "temporal" ? (
//                 <>
//                   <option value="6">6 Meses</option>
//                   <option value="7">7 Meses</option>
//                   <option value="8">8 Meses</option>
//                 </>
//               ) : (
//                 <>
//                   <option value="12">12 Meses</option>
//                   <option value="18">18 Meses</option>
//                   <option value="24">24 Meses</option>
//                   <option value="36">36 Meses</option>
//                 </>
//               )}
//             </select>
//           </div>
//         </div>
//         <div className="mt-4 grid">
//           <button type="submit" className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-700 focus-visible:ring outline-none transition duration-300 border border-transparent bg-yellow-400 hover:bg-yellow-500 disabled:pointer-events-none disabled:opacity-50 ring-zinc-500">CALCULAR</button>
//         </div>
//         <div className="mt-6 text-center">
//           {results && (
//             <div id="result">
//               <p>Resultado Normal: ${results.resultadoNormal}</p>
//               <p>Resultado -10%: ${results.resultadoMenosDiezPorciento}</p>
//               <p>Anticipo 25%: ${results.anticipo25}, Cuota 25%: ${results.cuota25}</p>
//               <p>Anticipo 50%: ${results.anticipo50}, Cuota 50%: ${results.cuota50}</p>
//               ${console.log(results.resultadoNormal)}
//             </div>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Calculator;
// import { useState } from 'react';

// console.log("hola Calculator.jsx aa aa")
// const Calculator = () => {
//   console.log("dentro de la funcion de calculator")
//   const [rent, setRent] = useState('');
//   const [expenses, setExpenses] = useState('');
//   const [tipoAlquiler, setTipoAlquiler] = useState('');
//   const [duracionAlquiler, setDuracionAlquiler] = useState('');
//   const [results, setResults] = useState(null);
//   console.log("abajo de los useState");
//   console.log("rent", rent);
//   console.log("result", results);
  
//   const calcularResultado = (rent, expenses, tipoAlquiler, duracionAlquiler) => {
//     let total = 0;
//     switch (tipoAlquiler) {
//       case 'temporal':
//         total = ((rent + expenses) * 6) * 0.07;
//         break;
//       case 'residencial':
//       case 'comercial':
//         total = ((rent + expenses) * duracionAlquiler) * 0.07;
//         break;
//       default:
//         total = (rent + expenses) * 0.07;
//       console.log("total");
//     }

//     const numberFormatter = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

//     const resultadoNormal = numberFormatter.format(total);
//     const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.9);
//     const anticipo25 = numberFormatter.format(total * 0.25);
//     const cuota25 = numberFormatter.format((total * 0.75) / 3);
//     const anticipo50 = numberFormatter.format(total * 0.5);
//     const cuota50 = numberFormatter.format((total * 0.5) / 6);

//     return { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 };
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const results = calcularResultado(parseFloat(rent), parseFloat(expenses), tipoAlquiler, parseInt(duracionAlquiler, 10));
//     setResults(results);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="grid gap-4">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div>
//             <label>Monto promedio de tu alquiler</label>
//             <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
//           </div>
//           <div>
//             <label>Monto Expensas</label>
//             <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
//           </div>
//           <div>
//             <label>Tipo de Alquiler</label>
//             <select value={tipoAlquiler} onChange={(e) => setTipoAlquiler(e.target.value)}>
//               <option value="" disabled>Seleccione el tipo de alquiler</option>
//               <option value="temporal">Temporal</option>
//               <option value="residencial">Residencial</option>
//               <option value="comercial">Comercial</option>
//             </select>
//           </div>
//           <div>
//             <label>Duración del Alquiler</label>
//             <select value={duracionAlquiler} onChange={(e) => setDuracionAlquiler(e.target.value)}>
//               <option value="" disabled>Seleccione la duración del alquiler</option>
//               {tipoAlquiler === "temporal" ? (
//                 <>
//                   <option value="6">6 Meses</option>
//                   <option value="7">7 Meses</option>
//                   <option value="8">8 Meses</option>
//                 </>
//               ) : (
//                 <>
//                   <option value="12">12 Meses</option>
//                   <option value="18">18 Meses</option>
//                   <option value="24">24 Meses</option>
//                   <option value="36">36 Meses</option>
//                 </>
//               )}
//             </select>
//           </div>
//         </div>
//         <div className="mt-4 grid">
//           <button type="submit" className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-700 focus-visible:ring outline-none transition duration-300 border border-transparent bg-yellow-400 hover:bg-yellow-500 disabled:pointer-events-none disabled:opacity-50 ring-zinc-500">CALCULAR</button>
//         </div>
//         <div className="mt-6 text-center">
//           {results && (
//             <div id="result">
//               <p>Resultado Normal: ${results.resultadoNormal}</p>
//               <p>Resultado -10%: ${results.resultadoMenosDiezPorciento}</p>
//               <p>Anticipo 25%: ${results.anticipo25}, Cuota 25%: ${results.cuota25}</p>
//               <p>Anticipo 50%: ${results.anticipo50}, Cuota 50%: ${results.cuota50}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Calculator;

// otro intento 

import { useState } from 'react';

const Calculator = () => {
  const [rent, setRent] = useState('');
  const [expenses, setExpenses] = useState('');
  const [tipoAlquiler, setTipoAlquiler] = useState('');
  const [duracionAlquiler, setDuracionAlquiler] = useState('');
  const [results, setResults] = useState(null);

  console.log("dentro de la función de calculator");

  const calcularResultado = (rent, expenses, tipoAlquiler, duracionAlquiler) => {
    let total = 0;
    rent = parseFloat(rent);
    expenses = parseFloat(expenses);
    duracionAlquiler = parseInt(duracionAlquiler, 10);

    console.log("Valores dentro de calcularResultado:");
    console.log("Rent:", rent);
    console.log("Expenses:", expenses);
    console.log("Tipo de Alquiler:", tipoAlquiler);
    console.log("Duración del Alquiler:", duracionAlquiler);

    switch (tipoAlquiler) {
      case 'temporal':
        total = ((rent + expenses) * 6) * 0.07;
        break;
      case 'residencial':
      case 'comercial':
        total = ((rent + expenses) * duracionAlquiler) * 0.07;
        break;
      default:
        total = (rent + expenses) * 0.07;
    }

    console.log("Total calculado:", total);

    const numberFormatter = new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const resultadoNormal = numberFormatter.format(total);
    const resultadoMenosDiezPorciento = numberFormatter.format(total * 0.9);
    const anticipo25 = numberFormatter.format(total * 0.25);
    const cuota25 = numberFormatter.format((total * 0.75) / 3);
    const anticipo50 = numberFormatter.format(total * 0.5);
    const cuota50 = numberFormatter.format((total * 0.5) / 6);

    console.log("Resultados formateados:");
    console.log("Resultado Normal:", resultadoNormal);
    console.log("Resultado -10%:", resultadoMenosDiezPorciento);
    console.log("Anticipo 25%:", anticipo25, "Cuota 25%:", cuota25);
    console.log("Anticipo 50%:", anticipo50, "Cuota 50%:", cuota50);

    return { resultadoNormal, resultadoMenosDiezPorciento, anticipo25, cuota25, anticipo50, cuota50 };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Valores antes de calcular:");
    console.log("Rent:", rent);
    console.log("Expenses:", expenses);
    console.log("Tipo de Alquiler:", tipoAlquiler);
    console.log("Duración del Alquiler:", duracionAlquiler);

    const results = calcularResultado(rent, expenses, tipoAlquiler, duracionAlquiler);
    console.log("Results después de calcular:", results);
    setResults(results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label>Monto promedio de tu alquiler</label>
            <input 
              type="number" 
              value={rent} 
              onChange={(e) => {
                console.log("Rent input cambiado:", e.target.value);
                setRent(e.target.value);
              }} 
            />
          </div>
          <div>
            <label>Monto Expensas</label>
            <input type="number" value={expenses} onChange={(e) => {
              console.log("Expenses input cambiado:", e.target.value);
              setExpenses(e.target.value);
            }} />
          </div>
          <div>
            <label>Tipo de Alquiler</label>
            <select value={tipoAlquiler} onChange={(e) => {
              console.log("Tipo de Alquiler cambiado:", e.target.value);
              setTipoAlquiler(e.target.value);
            }}>
              <option value="" disabled>Seleccione el tipo de alquiler</option>
              <option value="temporal">Temporal</option>
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>
          <div>
            <label>Duración del Alquiler</label>
            <select value={duracionAlquiler} onChange={(e) => {
              console.log("Duración del Alquiler cambiada:", e.target.value);
              setDuracionAlquiler(e.target.value);
            }}>
              <option value="" disabled>Seleccione la duración del alquiler</option>
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
          <button type="submit" className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg px-4 py-3 text-sm font-bold text-neutral-700 focus-visible:ring outline-none transition duration-300 border border-transparent bg-yellow-400 hover:bg-yellow-500 disabled:pointer-events-none disabled:opacity-50 ring-zinc-500">CALCULAR</button>
        </div>
        <div className="mt-6 text-center">
          {results && (
            <div id="result">
              <p>Resultado Normal: ${results.resultadoNormal}</p>
              <p>Resultado -10%: ${results.resultadoMenosDiezPorciento}</p>
              <p>Anticipo 25%: ${results.anticipo25}, Cuota 25%: ${results.cuota25}</p>
              <p>Anticipo 50%: ${results.anticipo50}, Cuota 50%: ${results.cuota50}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default Calculator;

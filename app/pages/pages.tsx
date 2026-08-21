"use client";
import React from "react";
import { useState } from "react";
export default function Principal() {
  const [horasOrdinarias, setHorasOrdinarias] = useState("");
  const [horasExtras, setHorasExtras] = useState("");
  const [salarioPorHora, setSalarioPorHora] = useState("");
  const [salarioNeto, setSalarioNeto] = useState(0);
  const [salarioBruto, setSalarioBruto] = useState(0);
  const [rebajaCCSS, setRebajaCCSS] = useState(0);
  const [rebajaIVM, setRebajaIVM] = useState(0);
  const [rebajaBancoPopular, setRebajaBancoPopular] = useState(0);

  const handleCalcular = () => {
    const salarioOrdinario =
      parseFloat(horasOrdinarias) * parseFloat(salarioPorHora);
    const salarioExtra =
      parseFloat(horasExtras) * parseFloat(salarioPorHora) * 1.5;
    const salarioBruto = salarioOrdinario + salarioExtra;

    const rebajaCCSS = salarioBruto * 0.055;
    const rebajaIVM = salarioBruto * 0.0433;
    const rebajaBancoPopular = salarioBruto * 0.01;
    const salarioNeto =
      salarioBruto - rebajaCCSS - rebajaIVM - rebajaBancoPopular;
    setSalarioBruto(salarioBruto);
    setRebajaCCSS(rebajaCCSS);
    setRebajaIVM(rebajaIVM);
    setRebajaBancoPopular(rebajaBancoPopular);
    setSalarioNeto(salarioNeto);
  };
  const handleLimpiarInputs = () => {
    setHorasOrdinarias("");
    setHorasExtras("");
    setSalarioPorHora("");
    setSalarioNeto(0);
    setSalarioBruto(0);
    setRebajaCCSS(0);
    setRebajaIVM(0);
    setRebajaBancoPopular(0);
  };
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center ">
      <h1 className="text-4xl text-white dark:text-zinc-50 flex justify-center items-center text-center">
        Calcular Salario Quincenal
      </h1>
      <h3 className="text-sm text-white mt-10 dark:text-zinc-50 flex justify-center items-center text-center">
        Usar . para separar los decimales
      </h3>
      <div className="flex md:flex-row flex-col  mt-10 border-2 w-95% md:w-1/2 rounded-2xl p-4 h-auto md:h-40 items-center text-white justify-around bg-zinc-50 font-sans dark:bg-black">
        <div>
          <label
            htmlFor="horasOrdinarias"
            className="text-sm mb-2 justify-center items-center flex"
          >
            Horas ordinarias trabajadas
          </label>
          <input
            className="flex  border rounded w-auto text-center items-center justify-center"
            type="text"
            inputMode="decimal"
            placeholder="Horas ordinarias trabajadas"
            value={horasOrdinarias}
            onChange={(e) => setHorasOrdinarias(e.target.value || "0")}
          />
        </div>
        <div>
          <label
            htmlFor="horasExtras"
            className="text-sm mb-2 justify-center items-center flex"
          >
            Horas extras trabajadas
          </label>
          <input
            className="flex w-auto border rounded text-center items-center justify-center"
            type="text"
            inputMode="decimal"
            placeholder="Horas extras trabajadas"
            value={horasExtras}
            onChange={(e) => setHorasExtras(e.target.value || "0")}
          />
        </div>
        <div>
          <label
            htmlFor="salarioPorHora"
            className="text-sm mb-2 justify-center items-center flex"
          >
            Salario por hora
          </label>
          <input
            className="flex w-auto border rounded text-center items-center justify-center"
            type="text"
            inputMode="decimal"
            placeholder="Salario por hora"
            value={salarioPorHora}
            onChange={(e) => setSalarioPorHora(e.target.value || "0")}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 w-95% md:w-1/2 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalcular}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCalcular();
          }
        }}
      >
        Calcular
      </button>
      <button
        className="bg-blue-500 w-95% md:w-1/2 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLimpiarInputs}
      >
        Limpiar Inputs
      </button>
      <div className="flex mt-10 flex-col items-center text-white justify-center bg-zinc-50 font-sans dark:bg-black">
        <h3 className="w-[90%] md:w-1/2 text-center">
          Rebajas de 5.5% CCSS, 4.33% IVM y 1% Aporte banco popular
        </h3>
      </div>

      <div className="flex md:flex-row flex-col mt-10 w-full md:w-full items-center text-white justify-around bg-zinc-50 font-sans dark:bg-black">
        <div>
          <h2 className="text-2xl text-center">Salario Bruto</h2>
          <h2 className="text-2xl text-center text-green-500">
            {formatCurrency(salarioBruto)}
          </h2>
        </div>
        <div>
          <h2 className="text-2xl text-center">Salario Neto</h2>
          <h2 className="text-2xl text-center text-green-500">
            {formatCurrency(salarioNeto)}
          </h2>
        </div>

        <div>
          <h2 className="text-2xl text-center">Rebaja CCSS</h2>
          <h2 className="text-2xl text-center text-red-500">
            {formatCurrency(rebajaCCSS)}
          </h2>
        </div>
        <div>
          <h2 className="text-2xl text-center">Rebaja IVM</h2>
          <h2 className="text-2xl text-center text-red-500">
            {formatCurrency(rebajaIVM)}
          </h2>
        </div>
        <div>
          <h2 className="text-2xl text-center">Rebaja Banco Popular</h2>
          <h2 className="text-2xl text-center text-red-500">
            {formatCurrency(rebajaBancoPopular)}
          </h2>
        </div>
      </div>
    </div>
  );
}

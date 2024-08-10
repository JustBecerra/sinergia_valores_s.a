import React, { useState, useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  formSubTitle: string;
};

export const SolicitudForm = ({ formSubTitle }: Props) => {
  const [handleAlert, setHandleAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { nombre, apellido, email, numerodetelefono, consulta } =
      Object.fromEntries(formData);

    if (!nombre || !apellido || !email || !numerodetelefono || !consulta) {
      setHandleAlert(true);
      setIsSubmitting(false);
      return;
    }

    setHandleAlert(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "solicitudes@sinergiavalores.com",
          to: "solicitudes@sinergiavalores.com",
          subject: `Consulta de parte de ${nombre} ${apellido}`,
          text: `Email: ${email} - Número de teléfono: ${numerodetelefono} - Consulta: ${consulta}`,
          reply_to: email,
        }),
      });

      if (res.ok) {
        toast.success("Email enviado!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (handleAlert) {
      toast.warn("No ha completado todos los campos!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }, [handleAlert]);

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="sr-only">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="hs-firstname-contacts"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Nombre"
          />
          <label className="sr-only">Apellido</label>
          <input
            type="text"
            name="apellido"
            id="hs-lastname-contacts"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Apellido"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="sr-only">Tipo</label>
          <input
            type="text"
            name="tipo"
            id="hs-Tipo-check"
            autoComplete="Tipo"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Tipo"
          />
          <label className="sr-only">Número de documento</label>
          <input
            type="text"
            name="NumeroDeDocumento"
            id="hs-phone-number"
            className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
            placeholder="Número de documento"
          />
        </div>

        <label className="sr-only">Ingrese Email</label>
        <input
          type="email"
          name="ingreseEmail"
          id="hs-email-contacts"
          autoComplete="email"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder="Ingrese Email"
        />

        <label className="sr-only">Confirmar Email</label>
        <input
          type="email"
          name="confirmarEmail"
          id="hs-email-contacts"
          autoComplete="email"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder="Confirmar Email"
        />
      </div>

      <div className="mt-4 grid">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-yellow-400 px-4 py-3 font-gotham text-sm text-neutral-700 outline-none ring-zinc-500 transition duration-300 hover:bg-yellow-500 focus-visible:ring disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:ring-zinc-200 dark:focus:outline-none 2xl:text-base"
        >
          Enviar Mail
        </button>
      </div>

      <div className="mt-3 text-center">
        <p className="font-nunito text-sm text-neutral-600 dark:text-neutral-400">
          {formSubTitle}
        </p>
      </div>
    </form>
  );
};

import React from "react";

type props = {
  formSubTitle: string;
};

export const EmailContactForm = ({ formSubTitle }: props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { nombre, apellido, email, numerodetelefono, consulta } =
      Object.fromEntries(formData);
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
          text: `Email: ${email} Número de telefono: ${numerodetelefono} - Consulta:${consulta}`,
          reply_to: email,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };
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
        <label className="sr-only">Email</label>
        <input
          type="email"
          name="email"
          id="hs-email-contacts"
          autoComplete="email"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder="Email"
        />
        <label className="sr-only">Número de teléfono</label>
        <input
          type="tel"
          name="numerodetelefono"
          id="hs-phone-number"
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder="Número de teléfono"
        />
        <label className="sr-only">Consulta</label>
        <textarea
          id="hs-about-contacts"
          name="consulta"
          rows={4}
          className="block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1"
          placeholder="Consulta"
        ></textarea>
      </div>

      <div className="mt-4 grid">
        <button
          type="submit"
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
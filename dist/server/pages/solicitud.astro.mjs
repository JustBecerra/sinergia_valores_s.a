/* empty css                                 */
import { a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent } from '../chunks/astro/server_DmtLvZrB.mjs';
import 'kleur/colors';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                                    */
import { $ as $$MainLayout, S as SITE } from '../chunks/MainLayout_DO3iz31P.mjs';
export { renderers } from '../renderers.mjs';

const SolicitudForm = ({ formSubTitle }) => {
  const [handleAlert, setHandleAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { nombre, apellido, email, confirmarEmail, tipo, NumeroDeDocumento } = Object.fromEntries(formData);
    if (!nombre || !apellido || !email || !confirmarEmail || !tipo || !NumeroDeDocumento) {
      setHandleAlert(true);
      setIsSubmitting(false);
      toast.warn("No ha completado todos los campos!", {
        position: "top-center",
        autoClose: 5e3,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: void 0,
        theme: "dark",
        transition: Bounce
      });
      return;
    }
    if (confirmarEmail !== email) {
      setHandleAlert(true);
      setIsSubmitting(false);
      toast.error("Las direcciones de mail no son iguales.", {
        position: "top-center",
        autoClose: 5e3,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: void 0,
        theme: "dark",
        transition: Bounce
      });
      return;
    }
    setHandleAlert(false);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "solicitudes@sinergiavalores.com",
          to: "solicitudes@sinergiavalores.com",
          subject: `Consulta de parte de ${nombre} ${apellido}`,
          text: `Email: ${email} - Tipo de solicitud: ${tipo} - Número de documento: ${NumeroDeDocumento}`,
          reply_to: email
        })
      });
      if (res.ok) {
        toast.success("Email enviado!", {
          position: "top-center",
          autoClose: 5e3,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: void 0,
          theme: "dark",
          transition: Bounce
        });
      }
    } catch (e2) {
      console.log(e2);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("form", { method: "POST", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Nombre" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "nombre",
            id: "hs-firstname-contacts",
            className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1",
            placeholder: "Nombre"
          }
        ),
        /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Apellido" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "apellido",
            id: "hs-lastname-contacts",
            className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1",
            placeholder: "Apellido"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Tipo" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "tipo",
            id: "hs-Tipo-check",
            autoComplete: "Tipo",
            className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1",
            placeholder: "Tipo"
          }
        ),
        /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Número de documento" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "NumeroDeDocumento",
            id: "hs-phone-number",
            className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1",
            placeholder: "Número de documento"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Ingrese Email" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          name: "email",
          id: "hs-email-contacts",
          autoComplete: "email",
          className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1",
          placeholder: "Ingrese Email"
        }
      ),
      /* @__PURE__ */ jsx("label", { className: "sr-only", children: "Confirmar Email" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          name: "confirmarEmail",
          id: "hs-email-contacts",
          autoComplete: "email",
          className: "block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-nunito text-sm text-neutral-700 placeholder:text-neutral-500 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:placeholder:text-neutral-400 dark:focus:ring-1",
          placeholder: "Confirmar Email"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 grid", children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-yellow-400 px-4 py-3 font-gotham text-sm text-neutral-700 outline-none ring-zinc-500 transition duration-300 hover:bg-yellow-500 focus-visible:ring disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:ring-zinc-200 dark:focus:outline-none 2xl:text-base",
        children: "Enviar Mail"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-nunito text-sm text-neutral-600 dark:text-neutral-400", children: formSubTitle }) })
  ] });
};

const $$SolicitudSection = createComponent(($$result, $$props, $$slots) => {
  const title = "Comience su solicitud";
  const subTitle = "";
  const formTitle = "Complete el formulario de solicitud";
  const formSubTitle = "Nos estaremos comunicando con usted en breve";
  return renderTemplate`<!-- Start Your Aplication  -->${maybeRenderHead()}<section class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"> <div class="mx-auto max-w-2xl lg:max-w-5xl"> <div class="text-center"> ${renderComponent($$result, "ToastContainer", ToastContainer, { "client:load": true, "client:component-hydration": "load", "client:component-path": "react-toastify", "client:component-export": "ToastContainer" })} <h1 class="text-balance font-gotham text-2xl tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight"> ${title} </h1> <p class="mt-1 text-pretty font-nunito text-neutral-600 dark:text-neutral-400"> ${subTitle} </p> </div> <div class="mt-12 flex items-center justify-center"> <div class="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8"> <h2 class="mb-8 text-center font-nunito text-xl text-neutral-700 dark:text-neutral-300"> ${formTitle} </h2> ${renderComponent($$result, "SolicitudForm", SolicitudForm, { "formSubTitle": formSubTitle, "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/SolicitudForm", "client:component-export": "SolicitudForm" })} </div> </div> </div> </section>`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/components/sections/SolicitudSection.astro", void 0);

const $$Solicitud = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = `Solicitud | ${SITE.title}`;
  return renderTemplate`<!--Utilizing MainLayout for the outer layout of the page, and defining meta for SEO purposes-->${renderComponent($$result, "MainLayout", $$MainLayout, { "title": pageTitle }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SolicitudSection", $$SolicitudSection, {})} ` })}`;
}, "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/solicitud.astro", void 0);

const $$file = "C:/Users/Justo/Desktop/sinergia_valores_s.a/src/pages/solicitud.astro";
const $$url = "/solicitud";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Solicitud,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
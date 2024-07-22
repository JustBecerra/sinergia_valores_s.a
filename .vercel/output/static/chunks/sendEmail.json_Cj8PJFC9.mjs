import { Resend } from 'resend';

const resend = new Resend({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://sinergia&valores", "ASSETS_PREFIX": undefined}.RESEND_API_KEY);
const GET = async ({ params, request }) => {
  const send = await resend.emails.send({
    from: "justj.becerra@gmail.com",
    to: "shiny.development@gmail.com",
    subject: "sample subject",
    html: "<p>Hi</p>",
    text: "Hi"
  });
  if (send.data) {
    return new Response(
      JSON.stringify({
        message: send.data
      }),
      {
        status: 200,
        statusText: "OK"
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: send.error
      }),
      {
        status: 500,
        statusText: "Internal Server Error"
      }
    );
  }
};

export { GET };

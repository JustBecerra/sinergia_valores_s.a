import { Resend } from 'resend';

const resend = new Resend("re_fePg7G6g_HUcec32fVXmUX12gp3VTqfqb");
const POST = async ({ params, request }) => {
  const body = await request.json();
  const { to, from, html, subject, text, reply_to } = body;
  const send = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
    reply_to
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

export { POST };

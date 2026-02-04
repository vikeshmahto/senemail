import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { sendMail } from "../../lib/mailer";
import { saveEmail } from "../../lib/sheets";

async function handler(req: Request) {
  console.log("Worker called with headers:", Object.fromEntries(req.headers.entries()));
  
  const { email } = await req.json();
  console.log("Processing email:", email);

  if (!email) {
    return new Response("Email required", { status: 400 });
  }

  try {
    await sendMail(email);
    await saveEmail(email);
    console.log("Email processed successfully:", email);
    return new Response("ok");
  } catch (err) {
    console.error("Worker failed", err);
    return new Response("error", { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);
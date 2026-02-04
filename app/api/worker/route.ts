import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { sendMail } from "../../lib/mailer";
import { saveEmail } from "../../lib/sheets";

async function handler(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response("Email required", { status: 400 });
  }

  try {
    await sendMail(email);
    await saveEmail(email);
    return new Response("ok");
  } catch (err) {
    console.error("Worker failed", err);
    return new Response("error", { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler);
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { sendMail } from "../../lib/mailer";
import { saveEmail } from "../../lib/sheets";

async function handler(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response("Email required", { status: 400 });
  }

  try {
    let emailSent = false;
    let emailError = null;
    
    try {
      await sendMail(email);
      emailSent = true;
    } catch (mailError) {
      emailError = mailError;
      console.error("Email sending failed:", mailError);
    }
    
    // Always try to save to sheets
    await saveEmail(email);
    
    if (emailSent) {
      return new Response("ok");
    } else {
      return new Response(`Email saved but sending failed: ${(emailError as Error)?.message}`, { status: 207 });
    }
  } catch (err) {
    console.error("Worker failed", err);
    return new Response("error", { status: 500 });
  }
}

// Skip verification in development
export const POST = process.env.NODE_ENV === 'development' 
  ? handler 
  : verifySignatureAppRouter(handler);
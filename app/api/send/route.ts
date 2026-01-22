import { NextResponse } from "next/server";
import { sendMail } from "../../lib/mailer";
import { saveEmail } from "../../lib/sheets";

function normalizeEmail(email: string) {
  return email
    .normalize("NFKD")       // normalize unicode
    .replace(/[^\x00-\x7F]/g, "") // remove non-ASCII
    .trim();
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const sanitizedEmail = normalizeEmail(email);

  await sendMail(sanitizedEmail);
  await saveEmail(sanitizedEmail);

  return NextResponse.json({ success: true });
}

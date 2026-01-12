import { NextResponse } from "next/server";
import { sendMail } from "../../lib/mailer";
import { saveEmail } from "../../lib/sheets";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  await sendMail(email);
  await saveEmail(email);

  return NextResponse.json({ success: true });
}

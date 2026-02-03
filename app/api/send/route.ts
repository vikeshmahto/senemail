import { NextResponse } from "next/server";
import { emailQueue } from "../../lib/queue";

function normalizeEmail(email: string) {
  return email
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .trim();
}

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const sanitizedEmail = normalizeEmail(email);

  try {
    await emailQueue.add(
      "send-email",
      { email: sanitizedEmail },
      {
        delay: 2 * 60 * 1000, // 2 minutes
        attempts: 3,
      }
    );

    return NextResponse.json({ success: true, queued: true });
  } catch (err) {
    console.error("Failed to enqueue job", err);
    return NextResponse.json({ error: "Queue error" }, { status: 500 });
  }
}


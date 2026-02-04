import { NextResponse } from "next/server";
import { qstash } from "../../lib/qstash";

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
    // For local development, call worker directly since QStash can't reach localhost
    if (process.env.NODE_ENV === 'development') {
      // Simulate delay with setTimeout
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:3000/api/worker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: sanitizedEmail })
          });
          console.log('Local worker response:', response.status);
        } catch (err) {
          console.error('Local worker failed:', err);
        }
      }, 120000); // 2 minutes
      
      return NextResponse.json({ success: true, queued: true, mode: 'local' });
    }
    
    // Production: use QStash
    await qstash.publishJSON({
      url: `${process.env.VERCEL_URL}/api/worker`,
      body: { email: sanitizedEmail },
      delay: 120, // 2 minutes in seconds
    });

    return NextResponse.json({ success: true, queued: true, mode: 'qstash' });
  } catch (err) {
    console.error("Failed to enqueue job", err);
    return NextResponse.json({ error: "Queue error" }, { status: 500 });
  }
}


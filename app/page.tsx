"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setEmail("");
    alert("Email sent successfully!");
  }

  return (
    <main style={{ padding: 40 }}>
      <h2>Resume Email Sender</h2>
      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </main>
  );
}

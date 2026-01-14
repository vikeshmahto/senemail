"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  async function submit() {
    setLoading(true);
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setEmail("");
    setToast("Email sent successfully!");
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: 20
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: 16,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        maxWidth: 400,
        width: "100%"
      }}>
        <h2 style={{ margin: "0 0 24px", fontSize: 24, fontWeight: 600, color: "#333" }}>Resume Email Sender</h2>
        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "2px solid #e0e0e0",
            borderRadius: 8,
            fontSize: 16,
            outline: "none",
            transition: "border 0.3s",
            boxSizing: "border-box"
          }}
          onFocus={(e) => e.target.style.borderColor = "#667eea"}
          onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
        />
        <button 
          onClick={submit} 
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 16,
            padding: "12px",
            background: loading ? "#ccc" : "#667eea",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s"
          }}
          onMouseEnter={(e) => !loading && (e.currentTarget.style.background = "#5568d3")}
          onMouseLeave={(e) => !loading && (e.currentTarget.style.background = "#667eea")}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a 
            href="https://docs.google.com/spreadsheets/d/1f24-Rg6LQbhSdGowgB8dBNZ1kB3C073VloICVeb1dEw/edit?gid=181390245#gid=181390245" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: "#667eea",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500
            }}
          >
            View Sent Emails →
          </a>
        </div>
      </div>
      {toast && (
        <div style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#4caf50",
          color: "white",
          padding: "12px 24px",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease"
        }}>
          {toast}
        </div>
      )}
    </main>
  );
}

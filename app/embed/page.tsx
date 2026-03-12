"use client"

import { useState, FormEvent } from "react"

interface FormState {
  name: string
  email: string
  message: string
  phone: string
}

export default function EmbedPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [aiReply, setAiReply] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          phone: form.phone || undefined,
          channel: "website",
        }),
      })

      const data = await res.json() as { success: boolean; aiResponse?: string; error?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Fehler beim Senden")
      }

      setAiReply(data.aiResponse ?? null)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.successBox}>
          <div style={styles.checkIcon}>✓</div>
          <h2 style={styles.successTitle}>Nachricht gesendet!</h2>
          <p style={styles.successText}>
            Vielen Dank, <strong>{form.name}</strong>! Wir haben Ihre Anfrage erhalten.
          </p>
          {aiReply && (
            <div style={styles.replyBox}>
              <p style={styles.replyLabel}>🤖 Automatische Antwort:</p>
              <p style={styles.replyText}>{aiReply}</p>
            </div>
          )}
          <button
            style={styles.resetButton}
            onClick={() => {
              setSuccess(false)
              setAiReply(null)
              setForm({ name: "", email: "", message: "", phone: "" })
            }}
          >
            Neue Anfrage
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Kontakt aufnehmen</h2>
        <p style={styles.subtitle}>Wir antworten in der Regel innerhalb weniger Minuten.</p>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Ihr Name"
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="email">E-Mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="ihre@email.de"
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="phone">Telefon <span style={styles.optional}>(optional)</span></label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+49 ..."
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="message">Nachricht *</label>
          <textarea
            id="message"
            name="message"
            required
            value={form.message}
            onChange={handleChange}
            placeholder="Wie können wir Ihnen helfen?"
            rows={4}
            style={{ ...styles.input, resize: "vertical" }}
          />
        </div>

        {error && (
          <div style={styles.errorBox}>
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.submitButton, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Wird gesendet…" : "Nachricht senden"}
        </button>
      </form>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  form: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "28px 24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e5e7eb",
  },
  title: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 4px 0",
  },
  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0 0 20px 0",
  },
  fieldGroup: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "6px",
  },
  optional: {
    fontSize: "12px",
    color: "#9ca3af",
    fontWeight: 400,
  },
  input: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111827",
    backgroundColor: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  errorBox: {
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#dc2626",
    marginBottom: "16px",
  },
  submitButton: {
    width: "100%",
    padding: "11px 0",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.15s",
  },
  successBox: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px 24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #e5e7eb",
    textAlign: "center",
  },
  checkIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    fontSize: "24px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  },
  successTitle: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 8px 0",
  },
  successText: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 16px 0",
  },
  replyBox: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    padding: "12px 14px",
    textAlign: "left",
    marginBottom: "20px",
  },
  replyLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#16a34a",
    margin: "0 0 6px 0",
  },
  replyText: {
    fontSize: "13px",
    color: "#166534",
    margin: 0,
    lineHeight: "1.5",
  },
  resetButton: {
    padding: "9px 20px",
    backgroundColor: "transparent",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#374151",
    cursor: "pointer",
  },
}

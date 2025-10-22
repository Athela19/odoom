"use client";

import { useState } from "react";
import Button from "../reusable/button";
export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registrasi gagal");

      setSuccess(true);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 w-84">
      <div>
        <label className="block text-sm font-medium mb-1">Nama</label>
        <input
          type="text"
          required
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          required
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          required
          className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">Registrasi berhasil! Silakan login.</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
}

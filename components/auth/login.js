"use client";

import { useState } from "react";
import Button from "../reusable/button";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login gagal");

      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-72">
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

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}

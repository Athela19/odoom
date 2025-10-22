"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginForm from "@/components/auth/login";
import RegisterForm from "@/components/auth/register";
import Card from "@/components/reusable/card";
import { useModeHash } from "@/components/reusable/security/modeAuth";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { generate, decode } = useModeHash();
  const [mode, setMode] = useState(null);
  const initialized = useRef(false);

  // Inisialisasi pertama
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const hash = searchParams.get("mode");

    const init = () => {
      if (!hash) {
        const defaultHash = generate("login");
        router.replace(`?mode=${defaultHash}`);
        requestAnimationFrame(() => setMode("login")); // ✅ asinkron
        return;
      }

      const decoded = decode(hash);
      if (!decoded) {
        const defaultHash = generate("login");
        router.replace(`?mode=${defaultHash}`);
        requestAnimationFrame(() => setMode("login")); // ✅ asinkron
        return;
      }

      requestAnimationFrame(() => setMode(decoded)); // ✅ asinkron
    };

    init();
  }, [searchParams, router, generate, decode]);

  // Listener untuk perubahan URL/query (agar form bisa ganti realtime)
  useEffect(() => {
    const hash = searchParams.get("mode");
    if (hash) {
      const decoded = decode(hash);
      if (decoded && decoded !== mode) {
        requestAnimationFrame(() => setMode(decoded)); // ✅ asinkron
      }
    }
  }, [searchParams, decode, mode]);

  if (!mode) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Masuk" : "Daftar"}
        </h1>

        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        <div className="flex mt-4 text-center text-sm ">
          {/* {mode === "login" ? (
            <button
              onClick={() => {
                const regHash = generate("register");
                router.push(`?mode=${regHash}`);
                setMode("register");
              }}
              className="text-primary hover:underline"
            >
              Belum punya akun? Daftar di sini
            </button>
          ) : (
            <button
              onClick={() => {
                const loginHash = generate("login");
                router.push(`?mode=${loginHash}`);
                setMode("login"); // tetap langsung di sini agar responsif
              }}
              className="text-primary hover:underline"
            >
              Sudah punya akun? Masuk
            </button>
          )} */}

          <p
            onClick={() => router.back()}
            className="mt-2 cursor-pointer hover:underline text-primary"
          >
            Kembali
          </p>
        </div>
      </Card>
    </div>
  );
}

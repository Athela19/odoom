"use client";

import { useMemo } from "react";

// daftar mode yang diizinkan
const MODES = ["login", "register"];
const SECRET = "static_secret_for_hash"; // bisa ganti pakai env jika perlu

function simpleHash(value) {
  // fallback sederhana (bukan untuk keamanan tinggi)
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return btoa(`${value}:${SECRET}:${hash}`).replace(/=+$/, "");
}

function simpleVerify(value, hash) {
  const valid = simpleHash(value);
  return valid === hash;
}

export function useModeHash() {
  const generate = useMemo(() => (mode) => simpleHash(mode), []);
  const decode = useMemo(() => (hash) => {
    for (const m of MODES) {
      if (simpleVerify(m, hash)) return m;
    }
    return null;
  }, []);

  return { generate, decode };
}

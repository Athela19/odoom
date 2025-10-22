"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useModeHash } from "@/components/reusable/security/modeAuth";
import { useRouter } from "next/navigation";

export default function Navbar({ onToggleSidebar }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { generate } = useModeHash();
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/getMe", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  // Klik di luar dropdown untuk menutup
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth";
  };

  return (
    <nav className="bg-background border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex justify-end items-center px-4 py-3">
        <div className="relative">
          {user ? (
            <div
              ref={dropdownRef}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background font-bold text-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-10 mt-50 w-64 bg-background border border-gray-200 shadow-lg rounded-lg z-50">
                  {/* Bagian info user */}
                  <div className="flex flex-col items-center px-4 py-4 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-background font-bold text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      Halo, {user.name}.
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  {/* Tombol aksi */}
                  <div className="flex divide-x divide-gray-200">
                    <button
                      onClick={() => {
                        const regHash = generate("register");
                        router.push(`/auth?mode=${regHash}`);
                      }}
                      className="flex-1 text-center px-4 py-2 text-sm bg-primary/10 hover:bg-blue-600 hover:text-background transition-colors rounded-bl-lg"
                    >
                      + Tambah
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex-1 text-center px-4 py-2 text-sm bg-primary/10 hover:bg-blue-600 hover:text-background transition-colors rounded-br-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

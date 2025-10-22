"use client";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const showLayout = pathname === "/" || pathname.startsWith("/profile") || pathname.startsWith("/admin");
  return (
    <>
      {showLayout && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {showLayout && <Sidebar />}
    </>
  );
}

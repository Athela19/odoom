"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, Users, UserCog, Venus, ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutGrid />, href: "/" },
    {
      name: "Data Perwira",
      icon: <Users />,
      isDropdown: true,
      subMenu: [
        { name: "Keseluruhan Perwira", href: "/perwira?category=all" },
        { name: "Perwira Pertama", href: "/perwira?category=pama" },
        { name: "Perwira Menengah", href: "/perwira?category=pamen" },
        { name: "Perwira Tinggi", href: "/perwira?category=pati" },
      ],
    },
    {
      name: "Data Warakawuri",
      icon: <Venus />,
      isDropdown: true,
      subMenu: [{ name: "Warakawuri", href: "/warakawuri" }],
    },
    { name: "Users", icon: <UserCog />, href: "/users" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[var(--background)] shadow-xl flex-col transition-all duration-300 overflow-hidden z-50
        ${isSidebarOpen ? "w-64" : "w-15"}`}
    >
      {/* Logo */}
      <div
        className="flex items-center py-3 px-2 cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <img src="logo.png" alt="Logo" className="h-10 w-10 shrink-0" />
        <span
          className={`text-xl font-bold transition-opacity duration-300 pl-2 whitespace-nowrap ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          SIVERA
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-2 overflow-hidden">
        {menuItems.map((item) => {
          if (item.isDropdown) {
            const isOpen = openDropdown === item.name;

            return (
              <div key={item.name}>
                <div
                  className="flex items-center justify-between px-2 py-2 rounded-lg text-sm transition hover:bg-[var(--armycolor)]/20 hover:text-[var(--armycolor)] cursor-pointer"
                  onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <span
                      className={`font-medium transition-opacity duration-300 whitespace-nowrap ${
                        isSidebarOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {isSidebarOpen && (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>

                {isOpen && isSidebarOpen && (
                  <div className="space-y-1 mt-1 rounded-lg">
                    {item.subMenu.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="flex ml-2 items-center gap-3 px-2 py-2 rounded-lg transition text-sm hover:bg-[var(--armyhover)]/20 hover:text-[var(--armycolor)]"
                      >
                        <span className="font-medium whitespace-nowrap">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-2 py-2 rounded-lg transition text-sm hover:bg-[var(--armycolor)]/20 hover:text-[var(--armycolor)]"
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              <span
                className={`font-medium transition-opacity duration-300 whitespace-nowrap ${
                  isSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

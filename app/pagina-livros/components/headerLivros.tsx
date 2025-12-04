'use client';

import { useState } from "react";
import Link from "next/link";
import { DropdownInformation } from "./menu";

export const HeaderLivros = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerHeight = 80; // altura do header em pixels (aproximadamente p-6 + padding)

  return (
    <>
      <header className="flex w-full p-6 bg-white shadow bg-[#DEDED1] fixed top-0 left-0 z-50">
        <nav className="flex items-center justify-between w-full">
          <Link href="/pagina-livros" className="flex items-end gap-2">
            <span className="text-xl font-semibold">Biblioteca</span>
            <span className="logo-brasil text-3xl font-bold flex gap-0.5">
              <span className="text-green-600">B</span>
              <span className="text-yellow-400">R</span>
              <span className="text-blue-600">A</span>
              <span className="text-yellow-400">S</span>
              <span className="text-green-600">I</span>
              <span className="text-yellow-400">L</span>
            </span>
          </Link>

          <DropdownInformation />
        </nav>
      </header>

      {/* Espaço para que o conteúdo não fique atrás do header */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
};

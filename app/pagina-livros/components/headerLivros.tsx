'use client';

import { useState } from "react";
import Link from "next/link";
import { DropdownInformation } from "./menu";

export const HeaderLivros = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   <header className="flex w-full p-6 bg-white shadow bg-[#DEDED1]">
  <nav className="flex items-center justify-between w-full">
    <Link href="/pagina-livros" className="flex items-end gap-2">
  <span className="text-xl">Biblioteca</span>
  <span className="logo-brasil text-3xl">BRASIL</span>
</Link>
    

    <DropdownInformation/>
  </nav>
</header>

  );
};

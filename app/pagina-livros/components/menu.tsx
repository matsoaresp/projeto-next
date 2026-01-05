'use client';
import { useAuth } from "@/app/shared/auth/AuthProvider";
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";


export const DropdownInformation = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if(!user) {
    return <span>Usuário não carregado</span>;
  }


  function handleLogout() {

    logout();
    router.push('aluno-login')
  }
  return (
    <div className="relative inline-block text-left">
      {/* Botão */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center text-white bg-[#B77466] hover:bg-[#E2B59A] font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none shadow-sm transition-colors"
        type="button"
      >
        Menu
        <svg
          className="w-4 h-4 ms-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menu Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-xl w-72">

          {/* Cabeçalho do Menu */}
          <div className="p-2">
            <div className="flex items-center px-3 py-2 space-x-3 bg-gray-50 rounded-md">
              <img
                className="w-8 h-8 rounded-full object-cover"
                src="/capas/agua-viva.jpg"
                alt="Avatar"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
              />
              <div className="overflow-hidden">
                <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                <div className="truncate text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Lista de Links */}
          <ul className="px-2 pb-2 text-sm text-gray-700 font-medium">
            <li>
              <Link
                href="/alunos"
                className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg
                  className="w-4 h-4 me-2 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                Conta
              </Link>
            </li>

            <li>
              <a className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md transition-colors" href="#">
                <svg className="w-4 h-4 me-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                </svg>
                Empréstimos
              </a>
            </li>

            <hr className="my-1 border-gray-200" />

            <li
              onClick={handleLogout}>
              <a href="#" className="flex items-center w-full p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                <svg className="w-4 h-4 me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                </svg>
                Sair
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
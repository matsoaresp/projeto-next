'use client';

import { useAuth } from "@/app/shared/auth/AuthProvider";
import { useState } from "react";

export default function PacienteSection() {

    const {user} = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [matricula, setMatricula] = useState(user?.matricula || "");

    if (!user){
        return 
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-md">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Dados Pessoais
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas informações pessoais e de faturamento
          </p>

          <button className="mt-4 px-4 py-2 bg-[#349c9a] text-white rounded-lg hover:bg-[#2a8886] text-sm font-medium">
            Editar
          </button>
        </div>

        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src="/capas/agua-viva.jpg"
              alt="Avatar do paciente"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            Informações Básicas
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Nome completo
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Matrícula
            </label>
            <input
              type="text"
              value={user.matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

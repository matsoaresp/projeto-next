'use client';

import { useAuth } from "@/app/shared/auth/AuthProvider";
import { useState, useEffect } from "react";

interface DadosPessoaisAluno {

  name: string,
  email: string,
  matricula: string,

}

export default function PacienteSection() {

  const { user, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [dados, setDados] = useState<DadosPessoaisAluno>({
    name: '',
    email: '',
    matricula: '',
  })


  useEffect(() => {
    if(user) {
      setDados({
        name: user.name,
        email: user.email,
        matricula: user.matricula,
      });
    }
  }, [user]);

  if(!user) {
    return null;
  }

  const handleSave = async () => {
    if(dados.name.length < 3 || !dados.name) {
      setNotification({ message: 'O nome deve ter pelo menos 3 caracteres.', type: 'error' });
      return;
    }
    if(!dados.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      setNotification({ message: 'Email inválido', type: 'error' });
      return;
    }

    if(dados.matricula.length < 9 || !dados.matricula) {
      setNotification({ message: 'A matrícula deve ter pelo menos 9 caracteres.', type: 'error' });
      return;
    }

    setIsSaving(true);

    const token = localStorage.getItem('token')

    if(!token){
      setNotification({ message: 'Usuario não autenticado.', type: 'error' });
    }

    try {
      const response = await fetch(`http://localhost:3000/persons/update/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        
        body: JSON.stringify(dados)
      });

      if(!response) {
        throw new Error('Erro ao salvar dados')
      }

      const updatedUser = await response.json();
      setNotification({ message: 'Dados salvos com sucesso!.', type: 'success' });

      setDados({
        name: updatedUser.name ?? '',
        email: updatedUser.email ?? '',
        matricula: updatedUser.matricula ?? ''
});
      updateUser(updatedUser);
      setIsEditing(false)
    } catch(error) {
      setNotification({ message: 'Erro ao salvar os dados. Tente novamente.', type: 'error' });
    }
  }

  const handleInputChange = (
    field: keyof DadosPessoaisAluno,
    value: string
  ) => {
    setDados(prev => ({
      ...prev,
      [field]: value
    }));
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-md">

        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Dados Pessoais
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas informações pessoais e de faturamento
          </p>

          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#636CCB] text-white rounded-lg hover:bg-[#3C467B] disabled:opacity-50 flex items-center text-sm font-medium mt-3"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    'Salvar'
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#636CCB] text-white rounded-lg hover:bg-[#3C467B] flex items-center text-sm font-medium mt-3"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
            )}
          </div>
        </div>

        {notification && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm text-center ${notification.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
              }`}
          >
            {notification.message}
          </div>
        )}


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
              value={dados.name || ''}
              disabled={!isEditing}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Email
            </label>
            <input
              type="email"
              value={dados.email || ''}
              disabled={!isEditing}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Matrícula
            </label>
            <input
              type="text"
              value={dados.matricula || ''}
              disabled={!isEditing}
              onChange={(e) => handleInputChange('matricula', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

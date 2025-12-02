'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function LoginAluno() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'error' as 'success' | 'error' });

  
  const emailRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setSnackbar({ open: true, message: "Preencha o email!", type: 'error' });
      emailRef.current?.focus();
      return;
    }

    if (!senha.trim()) {
      setSnackbar({ open: true, message: "Preencha a senha!", type: 'error' });
      senhaRef.current?.focus();
      return;
    }

    const emailValido = /\S+@\S+\.\S+/.test(email);
    if (!emailValido) {
      setSnackbar({ open: true, message: "Email inválido, tente novamente", type: 'error' });
      emailRef.current?.focus();
      return;
    }

    if (senha.length < 4) {
      setSnackbar({ open: true, message: "A senha deve ter pelo menos 4 caracteres", type: 'error' });
      senhaRef.current?.focus();
      return;
    }

    setSnackbar({ open: true, message: "Login realizado com sucesso!", type: 'success' });
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#154D71] to-[#1C6EA4] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#3C467B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Portal da Biblioteca</h1>
          <p className="text-white/80">Acesse sua conta</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#349c9a] focus:border-transparent"
                placeholder="seu.email@exemplo.com"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                ref={senhaRef}
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#349c9a] focus:border-transparent"
                placeholder="Sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1C6EA4] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1C6EA4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link href="/recuperar-senha" className="text-[#154D71] hover:text-[#1C6EA4] text-sm">
              Esqueceu sua senha?
            </Link>

            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm mb-3">Ainda não tem uma conta?</p>
              <Link href="/professor-cadastro" className="block w-full border-2 border-[#1C6EA4] text-[#1C6EA4] py-2 px-4 rounded-lg font-semibold hover:bg-[#1C6EA4] hover:text-white transition-colors">
                Criar Conta
              </Link>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm mb-2">É Aluno?</p>
              <Link href="/aluno-login" className="text-[#154D71] hover:text-[#1C6EA4] text-sm">
                Acessar Portal do Aluno
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      {snackbar.open && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-md ${
            snackbar.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
          onClick={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
}

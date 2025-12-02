'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { createPersonService } from '../aluno-login/services/alunoLoginService';

// Exemplo simples de Snackbar
function Snackbar({ open, message, type, onClose }: any) {
  if (!open) return null;
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-md ${type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

export default function CadastroAluno() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ open: false, message: '', type: 'success' });

  // Refs
  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const matriculaRef = useRef<HTMLInputElement>(null);
  const senhaRef = useRef<HTMLInputElement>(null);
  const confirmarSenhaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome) {
      nomeRef.current?.focus();
      setSnackbar({ open: true, message: 'Preencha o nome!', type: 'error' });
      return;
    }
    if (!email) {
      emailRef.current?.focus();
      setSnackbar({ open: true, message: 'Preencha o email!', type: 'error' });
      return;
    }
    if (!matricula) {
      matriculaRef.current?.focus();
      setSnackbar({ open: true, message: 'Preencha a matrícula!', type: 'error' });
      return;
    }
    if (!senha) {
      senhaRef.current?.focus();
      setSnackbar({ open: true, message: 'Preencha a senha!', type: 'error' });
      return;
    }
    if (!confirmarSenha) {
      confirmarSenhaRef.current?.focus();
      setSnackbar({ open: true, message: 'Confirme sua senha!', type: 'error' });
      return;
    }

    const emailValido = /\S+@\S+\.\S+/.test(email);
    if (!emailValido) {
      emailRef.current?.focus();
      setSnackbar({ open: true, message: 'Email inválido!', type: 'error' });
      return;
    }

    if (senha.length < 4) {
      senhaRef.current?.focus();
      setSnackbar({ open: true, message: 'Senha deve ter pelo menos 4 caracteres', type: 'error' });
      return;
    }

    if (senha !== confirmarSenha) {
      confirmarSenhaRef.current?.focus();
      setSnackbar({ open: true, message: 'As senhas não coincidem!', type: 'error' });
      return;
    }

    setIsLoading(true);
    const data = { name: nome, email, matricula, tipo: 'aluno' as const };

    const response = await createPersonService(data);

    if (!response.ok) {
      setSnackbar({ open: true, message: response.data.message || 'Erro ao criar usuário', type: 'error' });
    } else {
      setSnackbar({ open: true, message: response.data.message || 'Cadastro realizado com sucesso!', type: 'success' });
      // opcional: limpar formulário
      setNome('');
      setEmail('');
      setMatricula('');
      setSenha('');
    }

    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3C467B] to-[#636CCB] flex items-center justify-center p-4">
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
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                ref={nomeRef}
                type="nome"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value.replace(/[0-9]/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#349c9a] focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>

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
              <label htmlFor="matricula" className="block text-sm font-medium text-gray-700 mb-2">
                Matrícula
              </label>
              <input
                ref={matriculaRef}
                type="matricula"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#349c9a] focus:border-transparent"
                placeholder="Número da matrícula"
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

            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <input
                ref={confirmarSenhaRef}
                type="password"
                id="confirmarSenha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#349c9a] focus:border-transparent"
                placeholder="Confirme sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#6E8CFB] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#6E8CFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-3 text-center space-y-4">
            <Link href="/recuperar-senha" className="text-[#50589C] hover:text-[#3C467B] text-sm">
              Esqueceu sua senha?
            </Link>

            <div className="border-t ">
              <p className="text-gray-600 text-sm mb-2">É Professor?</p>
              <Link href="/profissionais-cadastro" className="text-[#3C467B] hover:text-[#50589C] text-sm">
                Acessar Portal do Professor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        type={snackbar.type}
      />
    </div>
  );
}

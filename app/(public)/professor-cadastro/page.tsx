'use client';

import { useState, useRef } from 'react';

import { useRouter } from "next/navigation"; 
import Link from 'next/link';
import { createProfessorService } from './service/professorRegisterService';


function Snackbar({ open, message, type, onClose }: any) {
  if (!open) return null;
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-md z-50 transition-all duration-300 ${
        type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

export default function CadastroAluno() {
  const router = useRouter();
  
  // States do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // State de controle
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ open: false, message: '', type: 'success' });

  // Refs para foco
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

    try {
        const data = { name: nome, email, matricula, tipo: 'professor' as const };
        
        const response = await createProfessorService(data);

        if (!response.ok) {
           
            setSnackbar({ 
                open: true, 
                message: response.data.message || 'Erro ao criar professor', 
                type: 'error' 
            });
        } else {
            // Sucesso (200, 201)
            setSnackbar({ 
                open: true, 
                message: response.data.message || 'Cadastro realizado com sucesso!', 
                type: 'success' 
            });
            
            // Limpa o formulário
            setNome('');
            setEmail('');
            setMatricula('');
            setSenha('');
            setConfirmarSenha('');
            
            
            setTimeout(() => {
                console.log("Redirecionando para login...");
                router.push('/professor-login');
            }, 1500);
        }
    } catch (error) {
        
        console.error("Erro CRÍTICO na requisição:", error);
        setSnackbar({ 
            open: true, 
            message: 'Erro de conexão com o servidor. Tente novamente.', 
            type: 'error' 
        });
    } finally {
       
        setIsLoading(false);
    }
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
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                ref={nomeRef}
                type="text"
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
                type="text"
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
                autoComplete="new-password"
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
                autoComplete="new-password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#349c9a] focus:border-transparent"
                placeholder="Confirme sua senha"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1C6EA4] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#1C6EA4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="mt-3 text-center space-y-4">
            <Link href="/recuperar-senha" className="text-[#1C6EA4] hover:text-[#1C6EA4] text-sm">
              Esqueceu sua senha?
            </Link>

            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm mb-2">É Aluno?</p>
              <Link href="/aluno-cadastro" className="text-[#154D71] hover:text-[#1C6EA4] text-sm font-medium">
                Acessar Portal do Aluno
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
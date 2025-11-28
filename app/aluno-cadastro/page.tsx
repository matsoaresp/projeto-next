"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function LoginAluno() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<{ message: string; focus: string } | null>(null);

    
    const nomeRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const matriculaRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!error) return;

        if (error.focus === "nome") nomeRef.current?.focus();
        if (error.focus === "email") emailRef.current?.focus();
        if (error.focus === "matricula") matriculaRef.current?.focus();
        if (error.focus === "senha") senhaRef.current?.focus();
    }, [error]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome.trim()) {
            setError({ message: "Preencha o nome!", focus: "nome" });
            return;
        }

        if (!email.trim()) {
            setError({ message: "Preencha o email!", focus: "email" });
            return;
        }

        if (!matricula.trim()) {
            setError({ message: "Preencha a matrícula!", focus: "matricula" });
            return;
        }

        if (!senha.trim()) {
            setError({ message: "Preencha a senha!!", focus: "senha" });
            return;
        }

        const emailValido = /\S+@\S+\.\S+/.test(email);
        if (!emailValido) {
            setError({ message: "Email inválido, tente novamente", focus: "email" });
            return;
        }

        if (matricula.length < 9) {
            setError({ message: "Sua matrícula deve ter pelo menos 9 números", focus: "matricula" });
            return;
        }

        if (senha.length < 4) {
            setError({ message: "A senha deve ter pelo menos 4 caracteres", focus: "senha" });
            return;
        }

        setError(null);
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

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error.message}
                            </div>
                        )}

                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                                Nome
                            </label>
                            <input
                                ref={nomeRef}
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value.replace(/[0-9]/g, ""))}
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
                                type="number"
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#6E8CFB] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#6E8CFB] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center space-y-4">
                        <Link
                            href="/recuperar-senha"
                            className="text-[#50589C] hover:text-[#3C467B] text-sm"
                        >
                            Esqueceu sua senha?
                        </Link>

                        <div className="border-t ">
                            <p className="text-gray-600 text-sm mb-3">
                                Ainda não tem uma conta?
                            </p>
                            <Link
                                href="/pacientes-cadastro"
                                className="block w-full border-2 border-[#6E8CFB] text-[#6E8CFB] py-2 px-4 rounded-lg font-semibold hover:bg-[#6E8CFB] hover:text-white transition-colors"
                            >
                                Criar Conta
                            </Link>
                        </div>

                        <div className="border-t ">
                            <p className="text-gray-600 text-sm mb-2">
                                É Professor?
                            </p>
                            <Link
                                href="/profissionais-login"
                                className="text-[#3C467B] hover:text-[#50589C] text-sm"
                            >
                                Acessar Portal do Professor
                            </Link>
                        </div>
                    </div>

                    {/* ================================================================ */}

                </div>
            </div>
        </div>
    );
}

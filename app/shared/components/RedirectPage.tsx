'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthProvider";

interface RedirectPageProps {
    to: string;
    userType?: 'aluno' | 'professor' | 'both';
    showLoading?: boolean;
    checkAuth?: boolean;
}

export default function RedirectPage({
    to,
    userType,
    showLoading = true,
    checkAuth = false
}: RedirectPageProps) {

    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (checkAuth && isLoading) return;

        if (checkAuth && user && userType && userType !== 'both') {
            const isCorrectType = user.role === userType;
            if (!isCorrectType) {
                const correctPath =
                    user.role === "aluno"
                        ? to.replace("/profissionais/", "/alunos/")
                        : to.replace("/alunos/", "/profissionais/");

                router.replace(correctPath);
                return;
            }
        }

        router.replace(to);
    }, [router, to, user, isLoading, userType, checkAuth]);

    if (!showLoading) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Redirecionando...
                </h2>
                <p className="text-gray-500">
                    Você será redirecionado automaticamente
                </p>
            </div>
        </div>
    );
}

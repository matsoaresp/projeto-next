'use client';

import RedirectPage from '@/app/shared/components/RedirectPage';
import { useAuth } from '@/app/shared/auth/AuthProvider';

export default function LoginRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading || !user) return null;

  if (user.tipo === 'aluno') {
    return <RedirectPage to="/aluno-login" showLoading />;
  }

  if (user.tipo === 'professor') {
    return <RedirectPage to="/professor-login" showLoading />;
  }

  return null;
}

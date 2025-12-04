// services/loginService.ts
export async function loginService(email: string, password: string) {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => null); // evita erro JSON vazio

    if (!response.ok) {
      return {
        ok: false,
        data: { message: data?.message || 'Erro ao fazer login' },
      };
    }

    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    return {
      ok: false,
      data: { message: error.message || 'Erro ao conectar com o servidor' },
    };
  }
}

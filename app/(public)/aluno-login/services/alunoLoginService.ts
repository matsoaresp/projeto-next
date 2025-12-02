export interface CreatePersonData {
  name: string;
  email: string;
  matricula: string;
  tipo: 'aluno' | 'professor';
}

export interface CreatePersonResponse {
  ok: boolean;
  data: {
    message?: string;
    [key: string]: any;
  };
}

export async function createPersonService(data: CreatePersonData): Promise<CreatePersonResponse> {

  console.log('ENVIANDO PARA API:', data);
  try {
    const response = await fetch('http://localhost:3000/persons/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    return { ok: response.ok, data: resData };
  } catch (error: any) {
    return { ok: false, data: { message: error.message || 'Erro ao conectar com o servidor' } };
  }
}

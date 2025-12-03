export interface CreatePersonData {
  name: string;
  email: string;
  matricula: string;
  password: string;
  tipo: 'aluno' | 'professor';
}

export interface CreatePersonResponse {
  ok: boolean;
  data: {
    message?: string;
    [key: string]: any;
  };
}
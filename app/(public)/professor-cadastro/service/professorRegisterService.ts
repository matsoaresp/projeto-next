import { CreatePersonData } from "@/app/dtos/PersonDtos";
import { CreatePersonResponse } from "@/app/dtos/PersonDtos";

export async function createProfessorService(data: CreatePersonData): Promise<CreatePersonResponse> {

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

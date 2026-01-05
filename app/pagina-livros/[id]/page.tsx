'use client'
import { useState } from 'react';
import { Livros, livrosfamosos, livrosNovos } from '@/app/data/Books';
import { useParams } from 'next/navigation';
import { HeaderLivros } from '../components/headerLivros';

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const livro = [...livrosNovos, ...livrosfamosos].find(
    (l) => l.id === Number(id)
  );

  if (!livro) {
    return <div>Livro não encontrado</div>;
  }

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100  bg-gradient-to-br from-[#DEDED1] to-[#F2E2B1]">
      <HeaderLivros/> 
      {/* Box central */}
      <div className="flex gap-20 p-8 w-[900px] h-[500px] bg-white rounded-xl shadow-md border border-gray-300 ">
        {/* Capa do livro */}
        <div className="flex">
          <img
            src={livro.capa}
            alt={livro.titulo}
            className="w- h-auto rounded-xl shadow flex-shrink-0"
          />
        </div>

        {/* Título e descrição */}
       <div className="flex flex-col flex-1 overflow-auto">
  <h1 className="text-3xl font-bold mb-4">{livro.titulo}</h1>
  <p className="pt-5">{livro.descricao || 'Sem descrição disponível.'}</p>
</div>

      </div>
    </main>
  );
}

'use client'

import { HeaderLivros } from './components/headerLivros';
import { Galery } from './components/galeria';
import { useAuth } from '../shared/auth/AuthProvider';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import BookPage from './[id]/page';
import { CarouselRow } from './components/carroselLivros';
import { livrosfamosos, livrosNovos } from '../data/Books';

export default function Home() {

  const {user, isLoading} = useAuth();
  const router = useRouter();

  useEffect ( () => {

    if (!isLoading && !user){
      router.replace('/aluno-login')
    }

  }, [user, isLoading, router])

  if (isLoading){
    return <div>Carregando...</div>;
  }

  if (!user){
    return null;
  }

     return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#DEDED1] to-[#F2E2B1]">
      <HeaderLivros/> 
      <Galery/>
      <main className="flex flex-col items-center p-4 ">
        <div>
        <CarouselRow
        tituloCategoria="Destaques da Biblioteca"
        listaLivros={livrosfamosos}/>
         </div>
        <div>
        <CarouselRow
        tituloCategoria="Novas Aquisições"
        listaLivros={livrosNovos}/>
        </div>
       
      </main>
      
    </div>
  );
    
}
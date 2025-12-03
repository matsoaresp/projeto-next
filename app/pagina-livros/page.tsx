import BookCarousel from '@/app/pagina-livros/components/carroselLivros';
import { HeaderLivros } from './components/headerLivros';
import { Galery } from './components/galeria';

export default function Home() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#DEDED1] to-[#F2E2B1]">
      
      
      <HeaderLivros/> 
      <Galery/>
      <main className="flex items-center justify-center p-4 ">
        <BookCarousel />
      </main>
      
    </div>
  );
}
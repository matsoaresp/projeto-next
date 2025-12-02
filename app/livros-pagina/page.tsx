import BookCarousel from '@/app/livros-pagina/components/carroselLivros'; // Ajuste o caminho conforme sua pasta

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F2E2B1] to-[#DEDED1] flex items-center justify-center p-4 ">
      <BookCarousel />
    </main>
  );
}
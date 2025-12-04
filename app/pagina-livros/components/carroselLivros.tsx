'use client';

import { useRef } from 'react';

const famosos = [
  { id: 1, titulo: "O Auto da Compadecida", capa: "/capas/o-auto-da-compadecida.jpg" },
  { id: 2, titulo: "Vidas Secas", capa: "/capas/vidas-secas.jpg" },
  { id: 3, titulo: "Torto Arado", capa: "/capas/torto-arado.jpg" },
  { id: 4, titulo: "A Ilha do Tesouro", capa: "/capas/ilha-do-tesouro.jpg" },
  { id: 5, titulo: "This Bright River", capa: "/capas/bright-river.jpg" },
  { id: 6, titulo: "Tropicália", capa: "/capas/tropicalia.jpg" },
  { id: 7, titulo: "Os Orixás", capa: "/capas/orixas.jpg" },
  { id: 8, titulo: "Brasil é Arte", capa: "/capas/brasil-arte.jpg" },
  { id: 9, titulo: "Justiça Climática", capa: "/capas/justica-climatica.jpg" },
  { id: 10, titulo: "Disciplina", capa: "/capas/disciplina.jpg" },
];

const novos = [
  { id: 1, titulo: "Agua Viva", capa: "/capas/agua-viva.jpg" },
  { id: 2, titulo: "Sopro da Vida", capa: "/capas/sopro-vida.jpg" },
  { id: 3, titulo: "Livro da Selva", capa: "/capas/livro-selva.jpg" },
  { id: 4, titulo: "Macunaíma", capa: "/capas/mucunaima.jpg" },
  { id: 6, titulo: "Infância", capa: "/capas/infancia.jpg" },
  { id: 7, titulo: "O Lustre", capa: "/capas/lustre.jpg" },
  { id: 8, titulo: "Hora da Estrela", capa: "/capas/hora-estrela.jpg" },
];


interface CarouselRowProps {
  tituloCategoria: string;
  listaLivros: { id: number; titulo: string; capa: string }[];
}

function CarouselRow({ tituloCategoria, listaLivros }: CarouselRowProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === 'left' ? -230 : 230;
      
      current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 mb-8 ">
      {/* Título da Seção */}
      <h2 className="text-3xl font-bold  mb-4 pl-2 ">
        {tituloCategoria}
      </h2>

      <div className="relative group">
        {/* Botão Esquerda */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
        >
          <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Área de Scroll */}
        <div
          ref={carouselRef}
          className="flex gap-10 overflow-x-auto scroll-smooth pb-8 px-4 
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {listaLivros.map((livro) => (
            <div
              key={livro.id}
              className="flex-none w-28 sm:w-48 transition-transform hover:scale-105 duration-300 cursor-pointer"
            >
              <div className=" rounded-xl shadow-xl overflow-hidden h-full border ">
                <div className="relative aspect-[2/3] w-full">
                  <img
                    src={livro.capa}
                    alt={livro.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Placeholder caso a imagem não exista ainda
                        target.src = "https://via.placeholder.com/200x300?text=Capa"; 
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Direita */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10  p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
        >
          <svg className="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// --- PÁGINA PRINCIPAL ---
export default function BookPage() {
  return (
    <div className=" rounded-md">
      
      <CarouselRow  tituloCategoria="Destaques da Biblioteca" listaLivros={famosos} />
      
      <CarouselRow tituloCategoria="Novas Aquisições" listaLivros={novos} />

    </div>
  );
}
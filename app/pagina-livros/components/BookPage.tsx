import { useState } from 'react';
import { Livros,livrosfamosos,livrosNovos } from '@/app/data/Books';


export default function BookPage () {

const [isEditing, setIsEditing] = useState(false);









return (
   <div className="flex rounded-xl overflow-hidden h-full">
    {/*Capa*/}

     <div
          className="flex gap-10 overflow-x-auto scroll-smooth pb-8 px-4 
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {livrosNovos.map((livro) => (
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


        <div
          className="flex gap-10 overflow-x-auto scroll-smooth pb-8 px-4 
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {livrosfamosos.map((livro) => (
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

    {/*Descrição */}
    <div className="flex flex-col justify-between">
        <h1>Descrição</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident temporibus deleniti voluptatum labor
            um dolore inventore id est neque doloribus dignissimos magnam qui accusamus aut ratione explicabo maxime, harum commodi eligendi?</p>
    </div>

   </div>

);
}
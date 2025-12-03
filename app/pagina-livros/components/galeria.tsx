export const Galery = () => {
  return (
    <div className="flex justify-center gap-4 mt-6">

      {/* Imagem grande */}
      <img className="h-120 w-80" src="/fundo/ursula.jpg" alt="#" />

      {/* Coluna com mulher-ruiva e linha com no-pescoco + nova imagem */}
      <div className="flex flex-col gap-4">

        {/* Mulher ruiva */}
        <img className="h-80 w-60" src="/fundo/mulher-ruiva.jpg" alt="#" />

        {/* Linha com duas imagens do mesmo tamanho */}
        <div className="flex gap-4">
          <img className="h-80 w-60" src="/fundo/no-pescoco.jpg" alt="#" />
          <img className="h-80 w-60" src="/fundo/sororidade.jpg" alt="#" />
        </div>
      </div>

      {/* Última imagem permanece ao lado */}
      <img className="h-120 w-80" src="/fundo/agua-viva.jpg" alt="#" />
    </div>
  );
};

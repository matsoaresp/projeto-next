export const Galery = () => {
  return (
    <div  className="flex justify-center gap-4 mt-6 mb-20">

      
      <img className="h-120 w-80" src="/fundo/ursula.jpg" alt="#" />

     
      <div className="flex flex-col gap-4">

       
        <div className="flex gap-4">
          <img className="h-80 w-60" src="/fundo/mulher-ruiva.jpg" alt="#" />
          <img className="h-80 w-60" src="/fundo/filha-rios.jpg" alt="#" />
        </div>

       
        <div className="flex gap-4">
          <img className="h-80 w-60" src="/fundo/no-pescoco.jpg" alt="#" />
          <img className="h-80 w-60" src="/fundo/sororidade.jpg" alt="#" />
        </div>

      </div>

      
      <img className="h-120 w-80" src="/fundo/agua-viva.jpg" alt="#" />
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-dark text-white gap-8">
      
      {/* Teste do Gradiente e Logo Conceitual */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold bg-facillit-gradient text-transparent bg-clip-text">
          Facillit Hub
        </h1>
        <p className="text-brand-light/80 text-xl">
          Ambiente de Desenvolvimento
        </p>
      </div>

      {/* Teste da Paleta de Cores */}
      <div className="grid grid-cols-2 gap-4">
        <div className="w-32 h-32 bg-brand-purple rounded-lg flex items-center justify-center border border-white/10">
          Purple
        </div>
        <div className="w-32 h-32 bg-brand-green rounded-lg flex items-center justify-center text-brand-dark font-bold">
          Green
        </div>
      </div>

    </main>
  );
}
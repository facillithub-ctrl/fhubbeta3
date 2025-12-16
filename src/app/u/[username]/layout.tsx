export default function PublicProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-brand-primary/10">
      {/* Aqui não incluímos Header nem Footer, apenas o conteúdo */}
      {children}
    </div>
  );
}
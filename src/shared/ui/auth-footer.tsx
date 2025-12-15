import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="w-full py-8 text-center text-sm text-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
        <Link href="/help" className="hover:text-brand-purple transition-colors font-medium">Ajuda</Link>
        <Link href="/privacy" className="hover:text-brand-purple transition-colors font-medium">Privacidade</Link>
        <Link href="/terms" className="hover:text-brand-purple transition-colors font-medium">Termos</Link>
      </div>
      <p className="text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Facillit Hub. Todos os direitos reservados.
      </p>
    </footer>
  );
}
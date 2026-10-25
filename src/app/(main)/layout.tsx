import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0B0B12]/80 p-4 backdrop-blur">
          <Link href="/" className="text-lg font-bold">🎓 Elearn<span className="text-brand-light">AI</span></Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/catalog" className="hover:text-brand-light">Catalogue</Link>
            <Link href="/dashboard" className="hover:text-brand-light">Dashboard</Link>
            <Link href="/ai-tutor" className="hover:text-brand-light">IA Tutor</Link>
            <Link href="/community" className="hover:text-brand-light">Communauté</Link>
            <Link href="/checkout" className="btn-primary">Panier</Link>
          </nav>
        </header>
        <main className="p-6">{children}</main>
        <footer className="border-t border-white/10 p-6 text-xs text-gray-500">
          © 2026 ElearnAI — Conforme RGPD 2026 · Consentement granulaire · AES-256
        </footer>
      </div>
    </div>
  );
}

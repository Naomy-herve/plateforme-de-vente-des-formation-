import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Elearn AI — Formations augmentées par IA', description: 'Plateforme e-learning IA-driven' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body className="min-h-screen">{children}</body></html>;
}

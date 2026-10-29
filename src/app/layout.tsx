import './globals.css';
import type { Metadata } from 'next';
import StoreHydrator from '@/components/StoreHydrator';

export const metadata: Metadata = { title: 'Elearn AI — Formations augmentées par IA', description: 'Plateforme e-learning IA-driven' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        <StoreHydrator />
        {children}
      </body>
    </html>
  );
}

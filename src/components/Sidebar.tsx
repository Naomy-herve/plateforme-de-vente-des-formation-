'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [
  ['/dashboard', '📊 Dashboard'], ['/catalog', '📚 Catalogue'], ['/learning-path', '🧭 Parcours'],
  ['/ai-tutor', '🤖 IA Tutor'], ['/community', '💬 Communauté'], ['/checkout', '🛒 Checkout'],
];
export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-56 shrink-0 border-r border-white/10 p-4 md:block">
      {links.map(([href, label]) => (
        <Link key={href} href={href}
          className={`block rounded-lg px-3 py-2 text-sm ${pathname.startsWith(href) ? 'bg-brand/30 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
          {label}
        </Link>
      ))}
    </aside>
  );
}
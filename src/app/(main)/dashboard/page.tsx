'use client';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/lib/store';
import { courses } from '@/lib/data';

const Progress3D = dynamic(() => import('@/components/Progress3D'), { ssr: false });

export default function Dashboard() {
  const { progress, badges } = useAppStore();
  const enrolled = courses.filter(c => progress[c.id] !== undefined);
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <h1 className="text-3xl font-bold">📊 Dashboard</h1>
      <div className="card">
        <h2 className="mb-2 font-bold">Vue 3D des progrès (Babylon.js)</h2>
        {enrolled.length ? <Progress3D /> : <p className="text-sm text-gray-400">Inscrivez-vous à une formation pour voir votre progression 3D.</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-3 font-bold">🏅 Badges & certifications</h2>
          <div className="flex flex-wrap gap-2">
            {badges.map(b => (
              <span key={b.id} className={`rounded-full px-3 py-1 text-sm ${b.earned ? 'bg-brand text-white' : 'bg-white/10 text-gray-500 line-through'}`}>{b.label}</span>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">Option premium : certification NFT vérifiable (Polygon + IPFS) via <code>mintCertificate()</code>.</p>
        </div>
        <div className="card">
          <h2 className="mb-3 font-bold">📅 Calendrier</h2>
          <ul className="space-y-1 text-sm">
            <li>🔸 Jeudi 18h — Session live « RAG avancé »</li>
            <li>🔸 Samedi 10h — Groupe d&apos;étude Python</li>
          </ul>
          <button className="mt-3 text-sm text-brand-light hover:underline"
            onClick={() => alert('Sync Google Calendar : connectez l’OAuth Google puis appelez events.insert().')}>🔗 Synchroniser Google Calendar</button>
        </div>
      </div>
    </div>
  );
}

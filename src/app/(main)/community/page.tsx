'use client';
import { useState } from 'react';
export default function Community() {
  const [threads, setThreads] = useState([
    { id: 1, title: 'Erreur embeddings Mistral ?', author: 'Léa', replies: 7 },
    { id: 2, title: 'Groupe d\'étude RAG — samedi', author: 'Sam', replies: 12 },
  ]);
  const [t, setT] = useState('');
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold">💬 Communauté</h1>
      <div className="mb-4 flex gap-2">
        <input value={t} onChange={e => setT(e.target.value)} placeholder="Nouvelle discussion…" className="flex-1 rounded bg-black/40 px-3 py-2 text-sm outline-none" />
        <button className="btn-primary" onClick={() => { if (t.trim()) { setThreads([{ id: Date.now(), title: t, author: 'Vous', replies: 0 }, ...threads]); setT(''); } }}>Publier</button>
      </div>
      {threads.map(th => (
        <div key={th.id} className="card mb-2 flex justify-between text-sm">
          <span className="font-semibold">{th.title}</span>
          <span className="text-gray-400">{th.author} · {th.replies} réponses</span>
        </div>
      ))}
      <p className="mt-4 text-xs text-gray-500">Prod : partage de notes collaboratif (Yjs CRDT), sessions live WebRTC, sous-titres auto Whisper (WebVTT).</p>
    </div>
  );
}
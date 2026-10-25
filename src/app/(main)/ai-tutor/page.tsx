'use client';
import { useState } from 'react';
import AIChat from '@/components/AIChat';

export default function AiTutorPage() {
  const [cv, setCv] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold">🤖 IA Tutor</h1>
      <AIChat />
      <section className="card mt-6">
        <h2 className="mb-2 font-bold">📄 Analyse de CV</h2>
        <input type="file" accept=".pdf,.txt" className="text-sm" onChange={async e => {
          const f = e.target.files?.[0]; if (!f) return;
          const r = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: `CV:${f.name}`, cv: true }) });
          const { reply } = await r.json();
          setCv(reply);
        }} />
        {cv && <p className="mt-2 whitespace-pre-wrap text-sm text-brand-light">{cv}</p>}
      </section>
    </div>
  );
}
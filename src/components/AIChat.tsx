'use client';
import { useState } from 'react';

export default function AIChat() {
  const [msgs, setMsgs] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Bonjour 👋 Je suis votre tuteur IA. Posez une question, demandez un quiz ou collez votre CV !' },
  ]);
  const [txt, setTxt] = useState('');
  const send = async () => {
    if (!txt.trim()) return;
    const q = txt; setTxt('');
    setMsgs(m => [...m, { role: 'user', text: q }]);
    const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: q, history: msgs.slice(-6) }) });
    const { reply } = await res.json();
    setMsgs(m => [...m, { role: 'ai', text: reply }]);
  };
  return (
    <div className="card mx-auto flex h-[60vh] max-w-3xl flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto">
        {msgs.map((m, i) => (
          <p key={i} className={m.role === 'user' ? 'text-right' : ''}>
            <span className={`inline-block max-w-[80%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-brand' : 'bg-white/10'}`}>{m.text}</span>
          </p>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input value={txt} onChange={e => setTxt(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          className="flex-1 rounded-lg bg-black/40 px-3 py-2 text-sm outline-none ring-brand focus:ring-2" placeholder="Ex : explique-moi les embeddings…" />
        <button onClick={send} className="btn-primary">Envoyer</button>
      </div>
    </div>
  );
}
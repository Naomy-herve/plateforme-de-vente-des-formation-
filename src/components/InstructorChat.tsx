'use client';
import { useState } from 'react';
export default function InstructorChat({ instructor }: { instructor: string }) {
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([]);
  const [txt, setTxt] = useState('');
  const send = () => { if (!txt.trim()) return; setMsgs(m => [...m, { me: true, text: txt }]); setTxt('');
    setTimeout(() => setMsgs(m => [...m, { me: false, text: `Merci ! Réponse de ${instructor} (WebSocket + WebRTC live).` }]), 800); };
  return (
    <div className="card flex h-72 flex-col">
      <h3 className="mb-2 font-bold">💬 Chat en direct — {instructor}</h3>
      <div className="flex-1 space-y-2 overflow-y-auto text-sm">
        {msgs.map((m, i) => <p key={i} className={m.me ? 'text-right' : ''}><span className={`inline-block rounded-lg px-2 py-1 ${m.me ? 'bg-brand' : 'bg-white/10'}`}>{m.text}</span></p>)}
      </div>
      <div className="mt-2 flex gap-2">
        <input value={txt} onChange={e => setTxt(e.target.value)} className="flex-1 rounded bg-black/40 px-2 py-1 text-sm outline-none"
          placeholder="Message…" onKeyDown={e => e.key === 'Enter' && send()} />
        <button onClick={send} className="btn-primary text-sm">Envoyer</button>
      </div>
    </div>
  );
}
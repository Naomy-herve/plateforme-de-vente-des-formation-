'use client';
import { useState } from 'react';
export default function ProjectUpload({ courseId }: { courseId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <section className="card mt-6">
      <h2 className="mb-2 font-bold">🛠 Projets & évaluation IA</h2>
      <input type="file" accept=".zip,.py,.ts,.js" className="text-sm"
        onChange={async e => {
          const f = e.target.files?.[0]; if (!f) return;
          setStatus('Analyse IA en cours… (CodeBERT + Tree-sitter)');
          const r = await fetch('/api/quiz', { method: 'POST', body: JSON.stringify({ courseId, project: f.name }) });
          const j = await r.json();
          setStatus(j.feedback ?? 'Soumis ✓');
        }} />
      {status && <p className="mt-2 text-sm text-brand-light">{status}</p>}
    </section>
  );
}
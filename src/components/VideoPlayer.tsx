'use client';
import { useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { videoSummary } from '@/lib/ai';
import type { Course } from '@/types';
const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayer({ course }: { course: Course }) {
  const video = useRef<HTMLVideoElement>(null);
  const [speed, setSpeed] = useState(1);
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const { addNote, setProgress } = useAppStore();

  const seek = (t: number) => { if (video.current) { video.current.currentTime = t; video.current.play(); } };

  return (
    <div className="card mt-4">
      <video ref={video} controls className="w-full rounded-lg bg-black" src={course.videoUrl}
        onTimeUpdate={e => setProgress(course.id, Math.round((e.currentTarget.currentTime / Math.max(1, e.currentTarget.duration)) * 100))} />
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span>Vitesse :</span>
        {SPEEDS.map(s => (
          <button key={s} onClick={() => { setSpeed(s); if (video.current) video.current.playbackRate = s; }}
            className={`rounded px-2 py-1 ${speed === s ? 'bg-brand' : 'bg-white/10'}`}>{s}×</button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 font-bold">📑 Chapitres</h3>
          <ul className="space-y-1 text-sm">
            {course.chapters.map(c => (
              <li key={c.id}>
                <button onClick={() => seek(course.chapters.slice(0, course.chapters.findIndex(x => x.id === c.id))
                  .reduce((s, ch) => s + ch.duration, 0))} className="text-brand-light hover:underline">
                  ▶ {c.title} <span className="text-gray-500">({Math.round(c.duration / 60)} min)</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-bold">📝 Notes synchronisées</h3>
          <div className="flex gap-2">
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Note à l'instant T…"
              className="flex-1 rounded bg-black/40 px-3 py-2 text-sm outline-none ring-brand focus:ring-2" />
            <button className="btn-primary text-sm" onClick={() => {
              if (!note.trim() || !video.current) return;
              addNote({ courseId: course.id, chapterId: 'current', time: Math.round(video.current.currentTime), text: note });
              setNote('');
            }}>💾</button>
          </div>
          <button className="mt-3 text-sm text-brand-light hover:underline"
            onClick={() => setSummary(videoSummary(course))}>🤖 Générer le résumé IA (Whisper)</button>
          {summary && <pre className="mt-2 whitespace-pre-wrap rounded bg-black/40 p-3 text-xs">{summary}</pre>}
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">Pipeline : FFmpeg.wasm (transcodage navigateur) → Whisper (ASR) → LLaMA 3 (résumé) · Progression → API (NestJS/PostgreSQL/Redis en prod).</p>
    </div>
  );
}
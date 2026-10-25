'use client';
import { useAppStore } from '@/lib/store';
import { recommend } from '@/lib/ai';
import { courses } from '@/lib/data';
import Link from 'next/link';

export default function LearningPath() {
  const skills = useAppStore(s => s.skills);
  const recos = recommend(skills, courses, 3);
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold">🧭 Parcours personnalisé</h1>
      <ol className="ml-4 border-l border-white/20">
        {recos.map((r, i) => (
          <li key={r.course.id} className="mb-6 ml-6">
            <span className="absolute -ml-7 mt-1 h-3 w-3 rounded-full bg-brand" />
            <Link href={`/course/${r.course.id}`} className="font-semibold hover:text-brand-light">{i + 1}. {r.course.title}</Link>
            <p className="text-sm text-gray-400">Compétences à acquérir : {r.gap.join(', ') || 'consolidation'}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
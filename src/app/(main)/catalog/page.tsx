'use client';
import { useMemo, useState } from 'react';
import CatalogFilters from '@/components/CatalogFilters';
import CourseCard from '@/components/CourseCard';
import { recommend } from '@/lib/ai';
import { courses } from '@/lib/data';
import { useAppStore } from '@/lib/store';

export default function CatalogPage() {
  const [q, setQ] = useState('');
  const [levels, setLevels] = useState<string[]>([]);
  const [maxDur, setMaxDur] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);
  const [view, setView] = useState<'grid' | 'timeline'>('grid');
  const skills = useAppStore(s => s.skills);

  const recos = useMemo(() => new Set(recommend(skills, courses, 2).map(r => r.course.id)), [skills]);
  const filtered = useMemo(() => courses.filter(c =>
    (!q || c.title.toLowerCase().includes(q.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(q.toLowerCase())))
    && (!levels.length || levels.includes(c.level))
    && c.durationH <= maxDur && c.price <= maxPrice
  ), [q, levels, maxDur, maxPrice]);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold">📚 Catalogue</h1>
      <CatalogFilters {...{ q, setQ, levels, setLevels, maxDur, setMaxDur, maxPrice, setMaxPrice, view, setView }} />
      {view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => <CourseCard key={c.id} course={c} hint={recos.has(c.id) ? 'Recommandé par IA' : undefined} />)}
        </div>
      ) : (
        <ol className="relative ml-4 border-l border-white/20">
          {filtered.map(c => (
            <li key={c.id} className="mb-8 ml-6">
              <span className="absolute -left-2 mt-2 h-4 w-4 rounded-full bg-brand" />
              <CourseCard course={c} />
            </li>
          ))}
        </ol>
      )}
      {!filtered.length && <p className="mt-8 text-gray-400">Aucune formation ne correspond aux filtres.</p>}
    </div>
  );
}
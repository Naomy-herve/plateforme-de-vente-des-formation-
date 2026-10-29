'use client';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import HeroWebGL from '@/components/HeroWebGL';
import CourseCard from '@/components/CourseCard';
import { courses } from '@/lib/data';
import { useAppStore } from '@/lib/store';

export default function Home() {
  const skills = useAppStore(s => s.skills);
  const top = useMemo(() => [...courses].sort((a, b) => b.rating - a.rating), []);
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => rail.current?.scrollBy({ left: d * 320, behavior: 'smooth' });

  return (
    <div>
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden text-center">
        <HeroWebGL />
        <div className="relative z-10 max-w-2xl p-6">
          <h1 className="text-4xl font-extrabold md:text-6xl">Apprenez <span className="text-brand-light">augmenté par l&apos;IA</span></h1>
          <p className="mt-4 text-gray-300">Formations adaptées à vos compétences manquantes, résumés vidéo Whisper, tuteur IA 24/7.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg">Commencez votre essai gratuit</Link>
            <Link href="/catalog" className="rounded-lg border border-white/20 px-4 py-2 font-semibold hover:bg-white/10">Explorer le catalogue</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl p-6">
        <h2 className="mb-4 text-2xl font-bold">⭐ Top Rated</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} className="btn-primary" aria-label="Précédent">←</button>
          <div ref={rail} className="flex flex-1 gap-4 overflow-x-auto scroll-smooth pb-2">
            {top.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
          <button onClick={() => scroll(1)} className="btn-primary" aria-label="Suivant">→</button>
        </div>

        <h2 className="mt-10 mb-4 text-2xl font-bold">🤖 Recommandé pour vous</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {top.slice(0, 3).map(c => (
            <CourseCard key={c.id} course={c} hint={`Basé sur : ${skills.join(', ') || 'votre profil'}`} />
          ))}
        </div>
      </section>
    </div>
  );
}

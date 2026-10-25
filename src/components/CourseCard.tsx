'use client';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import type { Course } from '@/types';

export default function CourseCard({ course, hint }: { course: Course; hint?: string }) {
  const { cart, addToCart } = useAppStore();
  return (
    <div className="card min-w-[280px] flex-col" role="article">
      <Link href={`/course/${course.id}`} className="text-lg font-semibold hover:text-brand-light">{course.title}</Link>
      <p className="text-sm text-gray-400">{course.instructor} · {course.level} · {course.durationH}h</p>
      <p className="mt-1 text-sm text-amber-400">★ {course.rating} <span className="text-gray-500">({course.students.toLocaleString('fr-FR')})</span></p>
      {hint && <p className="mt-1 text-xs text-brand-light">💡 {hint}</p>}
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">{course.price} €</span>
        {cart.includes(course.id)
          ? <Link href="/checkout" className="btn-primary">✓ Au panier</Link>
          : <button onClick={() => addToCart(course.id)} className="btn-primary">Ajouter</button>}
      </div>
    </div>
  );
}
import { NextResponse } from 'next/server';
import { recommend } from '@/lib/ai';
import { courses } from '@/lib/data';

export async function POST(req: Request) {
  const { skills = [] } = await req.json();
  const recos = recommend(skills, courses, 4);
  return NextResponse.json({ recommendations: recos.map(r => ({ id: r.course.id, title: r.course.title, gap: r.gap, score: +r.score.toFixed(3) })) });
}
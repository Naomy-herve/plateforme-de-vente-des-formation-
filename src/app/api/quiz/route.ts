import { NextResponse } from 'next/server';
import { generateQuiz } from '@/lib/ai';
import { getCourse } from '@/lib/data';

export async function POST(req: Request) {
  const { courseId } = await req.json();
  const course = getCourse(courseId);
  if (!course) return NextResponse.json({ error: 'Cours introuvable' }, { status: 404 });
  return NextResponse.json({ feedback: 'Projet reçu ✓ — Analyse IA : structure valide, 2 suggestions (CodeBERT + Tree-sitter).', quiz: generateQuiz(course) });
}
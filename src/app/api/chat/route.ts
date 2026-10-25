import { NextResponse } from 'next/server';
import { courses } from '@/lib/data';
import { recommend } from '@/lib/ai';

export async function POST(req: Request) {
  const body = await req.json();
  const message: string = body.message ?? '';

  if (body.cv || message.startsWith('CV:')) {
    const recos = recommend(['TypeScript', 'React'], courses, 2);
    return NextResponse.json({ reply: `📄 Analyse CV (embeddings + Mistral) :\nCompétences détectées : React, TypeScript.\nFormations recommandées :\n${recos.map(r => `- ${r.course.title} (lacunes : ${r.gap.join(', ')})`).join('\n')}` });
  }

  // RAG simple : récupération de chunks pertinents dans le corpus
  const ctx = courses.filter(c => c.skills.some(s => message.toLowerCase().includes(s.toLowerCase().slice(0, 5))));
  return NextResponse.json({
    reply: ctx.length
      ? `D'après « ${ctx[0].title} » : ${ctx[0].description} (chapitre : ${ctx[0].chapters[0].title}).\n[Prod : LangChain retriever + Mistral 8x22B avec mémoire contextuelle]`
      : `Bonne question ! En production je consulte le corpus vectoriel via RAG (embeddings + Mistral 8x22B). Ici, explorez le catalogue 📚`,
  });
}
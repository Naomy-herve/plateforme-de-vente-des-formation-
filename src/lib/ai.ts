import type { Course, QuizQuestion } from '@/types';

// ---- Embeddings (stub local ; en prod : Mistral embeddings API) ----
const tokenize = (s: string) => s.toLowerCase().split(/[\s,]+/);
export function skillVector(skills: string[], universe: string[]) {
  return universe.map(u => (skills.some(s => tokenize(s).includes(u.toLowerCase())) ? 1 : 0));
}
const cosine = (a: number[], b: number[]) => {
  const dot = a.reduce((s, v, i) => s + v * b[i], 0);
  const na = Math.hypot(...a), nb = Math.hypot(...b);
  return na && nb ? dot / (na * nb) : 0;
};

/** Reco : compétences manquantes + popularité collaborative (rating x students). */
export function recommend(userSkills: string[], all: Course[], topN = 3) {
  const universe = [...new Set(all.flatMap(c => c.skills))];
  const uVec = skillVector(userSkills, universe);
  return all
    .map(c => ({
      course: c,
      gap: c.skills.filter(s => !userSkills.includes(s)),
      score: cosine(uVec, skillVector(c.skills, universe)) * 0.6
           + (c.rating / 5) * Math.log10(c.students) * 0.4,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/** Résumé vidéo — en prod : Whisper (ASR) puis LLaMA 3. Ici : chapitres. */
export function videoSummary(course: Course) {
  return `🎬 ${course.title}\n` +
    course.chapters.map((c, i) => `${i + 1}. ${c.title} — ${c.summary ?? 'Résumé IA indisponible (branchez Whisper).'}`).join('\n');
}

/** Générateur de quiz — en prod : T5/LangChain. Template déterministe ici. */
export function generateQuiz(course: Course): QuizQuestion[] {
  return course.chapters.map((c, i) => ({
    question: `Quelle notion clé est couverte dans « ${c.title} » ?`,
    options: [
      c.summary ?? `Le chapitre ${i + 1} : ${c.title}`,
      'Une notion hors programme du cours',
      'Aucune notion utile',
      `Un concept d'un autre cours`,
    ],
    answer: 0,
  }));
}

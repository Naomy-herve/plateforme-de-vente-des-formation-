export interface Chapter { id: string; title: string; duration: number; summary?: string }
export interface Course {
  id: string; title: string; instructor: string; description: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  durationH: number; price: number; rating: number; students: number;
  skills: string[]; chapters: Chapter[]; videoUrl: string;
}
export interface QuizQuestion { question: string; options: string[]; answer: number }
export interface Note { courseId: string; chapterId: string; time: number; text: string }
export interface Badge { id: string; label: string; earned: boolean }

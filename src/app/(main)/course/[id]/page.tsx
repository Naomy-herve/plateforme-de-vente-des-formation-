import { notFound } from 'next/navigation';
import Link from 'next/link';
import { courses, getCourse } from '@/lib/data';
import VideoPlayer from '@/components/VideoPlayer';
import ProjectUpload from '@/components/ProjectUpload';
import InstructorChat from '@/components/InstructorChat';

export function generateStaticParams() { return courses.map(c => ({ id: c.id })); }

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id);
  if (!course) notFound();
  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="mt-1 text-gray-400">{course.instructor} · {course.level} · ★ {course.rating}</p>
        <VideoPlayer course={course} />
        <section className="card mt-6">
          <h2 className="mb-2 font-bold">📦 Ressources téléchargeables</h2>
          <ul className="text-sm text-brand-light">
            <li><a href={`/resources/${course.id}/slides.pdf`} download>📄 Slides (PDF)</a></li>
            <li><a href={`/resources/${course.id}/starter-code.zip`} download>💾 Code de démarrage</a></li>
          </ul>
        </section>
        <ProjectUpload courseId={course.id} />
      </div>
      <aside className="space-y-4">
        <InstructorChat instructor={course.instructor} />
        <div className="card text-sm">
          <h3 className="mb-2 font-bold">🧩 Compétences</h3>
          <div className="flex flex-wrap gap-2">{course.skills.map(s => <span key={s} className="rounded bg-brand/30 px-2 py-1">{s}</span>)}</div>
          <Link href="/checkout" className="btn-primary mt-4 block text-center">Acheter — {course.price} €</Link>
        </div>
      </aside>
    </div>
  );
}
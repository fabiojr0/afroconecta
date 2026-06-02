import { ContentCard } from '@/components/ContentCard';
import { QuizCard } from '@/components/QuizCard';
import { SectionHeader } from '@/components/SectionHeader';
import { artigosDestaque, quizzes } from '@/constants/content';

export default function EducacaoPage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-10 pb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>Aprender</h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          Trilhas de letramento racial no seu ritmo.
        </p>
      </div>

      <div>
        <SectionHeader titulo="Trilhas" />
        <div className="flex flex-col gap-3">
          {artigosDestaque.map((artigo) => (
            <ContentCard key={artigo.id} artigo={artigo} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeader titulo="Quizzes de fixação" />
        <div className="flex flex-col gap-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
}

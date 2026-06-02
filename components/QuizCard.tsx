'use client';

import Link from 'next/link';
import { ChevronRight, HelpCircle } from 'lucide-react';
import type { Quiz } from '@/constants/content';

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <Link
      href={`/quiz/${quiz.id}`}
      className="block rounded-2xl p-4 bg-white shadow-sm border transition-opacity active:opacity-80"
      style={{ borderColor: '#E4E0D8' }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex-shrink-0 flex items-center justify-center rounded-xl"
          style={{ width: 40, height: 40, backgroundColor: `${quiz.cor}1A` }}
        >
          <HelpCircle size={20} color={quiz.cor} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold leading-snug mb-1" style={{ color: '#1A1A1A' }}>
            {quiz.titulo}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
            {quiz.descricao}
          </p>
          <span className="text-xs font-semibold mt-1 block" style={{ color: quiz.cor }}>
            {quiz.perguntas.length} perguntas
          </span>
        </div>
        <ChevronRight size={18} color="#1F4E79" className="flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}

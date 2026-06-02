'use client';

import { Lightbulb } from 'lucide-react';
import type { DicaDoDia } from '@/constants/content';

export function TipOfDayCard({ dica }: { dica: DicaDoDia }) {
  return (
    <div
      className="rounded-2xl p-4 flex gap-3"
      style={{ backgroundColor: '#E7EEF5', border: '1px solid #3A6EA520' }}
    >
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-xl"
        style={{ width: 40, height: 40, backgroundColor: '#1F4E7914' }}
      >
        <Lightbulb size={20} color="#1F4E79" />
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#1F4E79' }}>
          {dica.titulo}
        </span>
        <p className="text-sm leading-relaxed" style={{ color: '#3F3F46' }}>
          {dica.texto}
        </p>
      </div>
    </div>
  );
}

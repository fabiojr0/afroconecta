'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { Artigo } from '@/constants/content';

export function ContentCard({ artigo }: { artigo: Artigo }) {
  return (
    <Link
      href={`/artigo/${artigo.id}`}
      className="block rounded-2xl p-4 bg-white shadow-sm border transition-opacity active:opacity-80"
      style={{ borderColor: '#E4E0D8' }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-1 self-stretch rounded-full"
          style={{ backgroundColor: artigo.cor }}
        />
        <div className="flex-1 min-w-0">
          <span
            className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2"
            style={{ backgroundColor: `${artigo.cor}1A`, color: artigo.cor }}
          >
            {artigo.categoria}
          </span>
          <p className="text-base font-bold leading-snug mb-1" style={{ color: '#1A1A1A' }}>
            {artigo.titulo}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
            {artigo.resumo}
          </p>
        </div>
        <ChevronRight size={18} color="#1F4E79" className="flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}

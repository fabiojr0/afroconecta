import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { artigosDestaque } from '@/constants/content';

export function generateStaticParams() {
  return artigosDestaque.map((a) => ({ id: a.id }));
}

export default async function ArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artigo = artigosDestaque.find((a) => a.id === id);
  if (!artigo) notFound();

  return (
    <div className="flex flex-col px-4 pt-10 pb-10 gap-5" style={{ backgroundColor: '#F4F4F1' }}>
      <Link
        href="/educacao"
        className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity active:opacity-70"
        style={{ color: '#1F4E79' }}
      >
        <ArrowLeft size={18} />
        Voltar
      </Link>

      <div>
        <span
          className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
          style={{ backgroundColor: `${artigo.cor}1A`, color: artigo.cor }}
        >
          {artigo.categoria}
        </span>
        <h1 className="text-3xl font-extrabold leading-tight mb-3" style={{ color: '#1A1A1A' }}>
          {artigo.titulo}
        </h1>
        <p className="text-base leading-relaxed" style={{ color: '#6B7280' }}>
          {artigo.resumo}
        </p>
      </div>

      <div
        className="h-1 w-12 rounded-full"
        style={{ backgroundColor: artigo.cor }}
      />

      <div className="flex flex-col gap-6">
        {artigo.corpo.map((secao, i) => (
          <div key={i} className="flex flex-col gap-3">
            {secao.subtitulo && (
              <h2 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
                {secao.subtitulo}
              </h2>
            )}
            {secao.paragrafos.map((p, j) => (
              <p key={j} className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                {p}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

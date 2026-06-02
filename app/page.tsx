'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRound, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { EmergencyButton } from '@/components/EmergencyButton';
import { TipOfDayCard } from '@/components/TipOfDayCard';
import { ContentCard } from '@/components/ContentCard';
import { SectionHeader } from '@/components/SectionHeader';
import { PerfilModal } from '@/components/PerfilModal';
import { acessosRapidos, artigosDestaque, dicaDoDia } from '@/constants/content';

export default function HomePage() {
  const router = useRouter();
  const { user, nomeAnonimo } = useAuth();
  const [perfilVisivel, setPerfilVisivel] = useState(false);

  const inicial =
    (
      (user?.user_metadata?.nome_completo as string | undefined) ??
      nomeAnonimo ??
      ''
    )
      .trim()
      .charAt(0)
      .toUpperCase() || null;

  return (
    <div className="flex flex-col gap-6 px-4 pt-12 pb-6">
      {/* Cabeçalho */}
      <div className="flex items-start gap-3">
        <div className="flex-1 flex flex-col gap-1">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#C0623F' }}
          >
            AfroConecta
          </span>
          <h1 className="text-3xl font-extrabold leading-tight" style={{ color: '#1A1A1A' }}>
            Conhecimento que combate o racismo
          </h1>
          <p className="text-base" style={{ color: '#6B7280' }}>
            Aprenda, conheça seus direitos e encontre apoio — tudo em um só lugar.
          </p>
        </div>
        <button
          onClick={() => setPerfilVisivel(true)}
          className="flex-shrink-0 flex items-center justify-center rounded-full mt-1 transition-opacity active:opacity-70"
          style={{ width: 44, height: 44, backgroundColor: '#1F4E79' }}
          aria-label="Abrir perfil"
        >
          {inicial ? (
            <span className="text-base font-semibold text-white">{inicial}</span>
          ) : (
            <UserRound size={22} color="#fff" />
          )}
        </button>
      </div>

      <PerfilModal visivel={perfilVisivel} onFechar={() => setPerfilVisivel(false)} />

      {/* Denúncia urgente */}
      <EmergencyButton />

      {/* Dica do dia */}
      <TipOfDayCard dica={dicaDoDia} />

      {/* Atalhos */}
      <div>
        <SectionHeader titulo="Comece por aqui" />
        <div className="grid grid-cols-3 gap-3">
          {acessosRapidos.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.rota)}
              className="relative flex flex-col justify-start rounded-2xl p-3 min-h-24 transition-opacity active:opacity-70"
              style={{ backgroundColor: '#E7EEF5' }}
              aria-label={`${item.titulo}. ${item.descricao}.`}
            >
              <span className="text-sm font-semibold leading-tight" style={{ color: '#1F4E79' }}>
                {item.titulo}
              </span>
              <span className="text-xs mt-1" style={{ color: '#3F3F46' }}>
                {item.descricao}
              </span>
              <ChevronRight
                size={16}
                color="#1F4E79"
                className="absolute top-3 right-3"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Artigos em destaque */}
      <div>
        <SectionHeader
          titulo="Em destaque"
          acaoLabel="Ver tudo"
          onAcaoPress={() => router.push('/educacao')}
        />
        <div className="flex flex-col gap-3">
          {artigosDestaque.map((artigo) => (
            <ContentCard key={artigo.id} artigo={artigo} />
          ))}
        </div>
      </div>
    </div>
  );
}

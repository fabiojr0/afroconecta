import { SectionHeader } from '@/components/SectionHeader';

const leis = [
  {
    titulo: 'Racismo (Lei 7.716/1989)',
    texto:
      'Crime inafiançável e imprescritível. Atinge toda a coletividade ofendida ' +
      '(ex.: negar emprego ou atendimento por raça/cor).',
  },
  {
    titulo: 'Injúria racial (Lei 14.532/2023)',
    texto:
      'Ofender a dignidade de alguém usando elementos de raça/cor passou a ser ' +
      'equiparado a racismo, com pena maior e inafiançável.',
  },
  {
    titulo: 'Estatuto da Igualdade Racial (Lei 12.288/2010)',
    texto:
      'Garante o direito à igualdade de oportunidades e ao combate à ' +
      'discriminação em saúde, educação, trabalho e cultura.',
  },
];

const passos = [
  'Garanta sua segurança e, se houver risco imediato, ligue 190.',
  'Reúna provas: prints, fotos, vídeos, áudios e nomes de testemunhas.',
  'Registre um Boletim de Ocorrência (presencial ou delegacia online).',
  'Procure a Defensoria Pública ou um(a) advogado(a) para orientação.',
];

export default function DireitoPage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-10 pb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>Seus direitos</h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          O que diz a lei e como agir diante da discriminação.
        </p>
      </div>

      <div>
        <SectionHeader titulo="A legislação" />
        <div className="flex flex-col gap-3">
          {leis.map((lei) => (
            <div
              key={lei.titulo}
              className="rounded-2xl p-4 bg-white shadow-sm border"
              style={{ borderColor: '#E4E0D8' }}
            >
              <p className="text-lg font-bold mb-2" style={{ color: '#1A1A1A' }}>
                {lei.titulo}
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                {lei.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader titulo="Sofri discriminação. E agora?" />
        <div
          className="rounded-2xl p-4 bg-white shadow-sm border flex flex-col gap-3"
          style={{ borderColor: '#E4E0D8' }}
        >
          {passos.map((passo, i) => (
            <div key={passo} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full text-white text-xs font-semibold"
                style={{ width: 26, height: 26, backgroundColor: '#1F4E79' }}
              >
                {i + 1}
              </div>
              <p className="text-base leading-relaxed flex-1" style={{ color: '#1A1A1A' }}>
                {passo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

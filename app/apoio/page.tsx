import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

const contatos = [
  {
    nome: 'Disque 100',
    descricao: 'Direitos Humanos · denúncias de discriminação',
    telefone: '100',
  },
  {
    nome: 'Polícia (190)',
    descricao: 'Emergência e risco imediato',
    telefone: '190',
  },
  {
    nome: 'Disque 180',
    descricao: 'Atendimento à mulher',
    telefone: '180',
  },
];

const orgaos = [
  {
    nome: 'Defensoria Pública',
    tipo: 'Apoio jurídico gratuito',
    cidade: 'Sua cidade',
    buscaMaps: 'Defensoria Pública perto de mim',
  },
  {
    nome: 'Delegacia de Crimes Raciais',
    tipo: 'Registro especializado',
    cidade: 'Sua cidade',
    buscaMaps: 'Delegacia de crimes raciais perto de mim',
  },
  {
    nome: 'Centro de Referência (CRAS)',
    tipo: 'Apoio psicossocial',
    cidade: 'Sua cidade',
    buscaMaps: 'CRAS Centro de Referência de Assistência Social perto de mim',
  },
];

export default function ApoioPage() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-10 pb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>Apoio e denúncia</h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          Você não está só. Encontre canais de proteção e acolhimento.
        </p>
      </div>

      <div>
        <SectionHeader titulo="Contatos úteis" />
        <div className="flex flex-col gap-3">
          {contatos.map((c) => (
            <a
              key={c.telefone}
              href={`tel:${c.telefone}`}
              className="flex items-center gap-3 rounded-2xl p-4 bg-white shadow-sm border transition-opacity active:opacity-70"
              style={{ borderColor: '#E4E0D8' }}
              aria-label={`Ligar para ${c.nome}. ${c.descricao}.`}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, backgroundColor: '#E7EEF5' }}
              >
                <Phone size={22} color="#1F4E79" />
              </div>
              <div>
                <p className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                  {c.nome}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                  {c.descricao}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader titulo="Órgãos e ONGs próximos" />
        <div className="flex flex-col gap-3">
          {orgaos.map((o) => (
            <a
              key={o.nome}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.buscaMaps)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl p-4 bg-white shadow-sm border transition-opacity active:opacity-70"
              style={{ borderColor: '#E4E0D8' }}
              aria-label={`Ver ${o.nome} no mapa`}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-xl"
                style={{ width: 44, height: 44, backgroundColor: '#E8DCCB' }}
              >
                <MapPin size={22} color="#C0623F" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                  {o.nome}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>
                  {o.tipo} · {o.cidade}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ExternalLink size={14} color="#1F4E79" />
                  <span className="text-xs font-semibold" style={{ color: '#1F4E79' }}>
                    Ver no mapa
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

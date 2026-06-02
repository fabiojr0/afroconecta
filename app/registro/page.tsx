'use client';

import { useState } from 'react';
import { Lock, Trash2 } from 'lucide-react';
import { useOcorrencias } from '@/hooks/useOcorrencias';
import { useAuth } from '@/context/AuthContext';
import { salvarOcorrencia } from '@/lib/db';
import { SectionHeader } from '@/components/SectionHeader';

const VAZIO = { data: '', local: '', descricao: '', testemunhas: '' };

export default function RegistroPage() {
  const { ocorrencias, adicionar, remover } = useOcorrencias();
  const { user, obterNomeParaSalvar } = useAuth();
  const [form, setForm] = useState(VAZIO);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [confirmarId, setConfirmarId] = useState<string | null>(null);

  const atualizar = (campo: keyof typeof VAZIO) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [campo]: e.target.value }));

  const salvar = async () => {
    if (!form.descricao.trim()) {
      setErro('Descreva o que aconteceu para salvar o registro.');
      return;
    }
    setErro(null);
    setSalvando(true);

    const registro = adicionar({
      data: form.data.trim(),
      local: form.local.trim(),
      descricao: form.descricao.trim(),
      testemunhas: form.testemunhas.trim(),
    });

    const nome = await obterNomeParaSalvar();
    if (nome !== null) {
      await salvarOcorrencia(registro, user?.id ?? null, nome);
    }

    setForm(VAZIO);
    setSalvando(false);
  };

  return (
    <div className="flex flex-col gap-6 px-4 pt-10 pb-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold" style={{ color: '#1A1A1A' }}>Registrar ocorrência</h1>
        <p className="text-base" style={{ color: '#6B7280' }}>
          Um diário privado para guardar o que aconteceu.
        </p>
      </div>

      {/* Aviso de privacidade */}
      <div
        className="flex items-center gap-2 rounded-xl p-3"
        style={{ backgroundColor: '#E9F3EC' }}
      >
        <Lock size={16} color="#2E7D52" />
        <p className="text-xs" style={{ color: '#2E7D52' }}>
          Seus registros ficam neste dispositivo e, se conectado, também na nuvem.
        </p>
      </div>

      {/* Formulário */}
      <div
        className="rounded-2xl p-4 bg-white shadow-sm border flex flex-col gap-4"
        style={{ borderColor: '#E4E0D8' }}
      >
        <Field
          label="Quando aconteceu?"
          placeholder="Ex.: 28/05/2026, por volta das 14h"
          value={form.data}
          onChange={atualizar('data')}
        />
        <Field
          label="Onde aconteceu?"
          placeholder="Ex.: ônibus linha 800, mercado, trabalho..."
          value={form.local}
          onChange={atualizar('local')}
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: '#3F3F46' }}>
            O que aconteceu? *
          </label>
          <textarea
            className="w-full rounded-xl border px-4 py-3 text-base outline-none resize-none min-h-24 focus:ring-2 focus:ring-blue-200"
            style={{
              borderColor: '#E4E0D8',
              backgroundColor: '#F4F4F1',
              color: '#1A1A1A',
            }}
            placeholder="Descreva os fatos com o máximo de detalhes."
            value={form.descricao}
            onChange={atualizar('descricao')}
          />
        </div>
        <Field
          label="Testemunhas"
          placeholder="Nomes e contatos, se houver."
          value={form.testemunhas}
          onChange={atualizar('testemunhas')}
        />

        {erro && (
          <p className="text-sm" style={{ color: '#C0392B' }}>{erro}</p>
        )}

        <button
          onClick={salvar}
          disabled={salvando}
          className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60 transition-opacity active:opacity-80"
          style={{ backgroundColor: '#1F4E79' }}
        >
          {salvando ? 'Salvando...' : 'Salvar registro'}
        </button>
      </div>

      {/* Lista de registros */}
      <div>
        <SectionHeader titulo={`Registros salvos (${ocorrencias.length})`} />
        {ocorrencias.length === 0 ? (
          <p className="text-base" style={{ color: '#6B7280' }}>
            Nenhum registro ainda. O que você salvar aparece aqui.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {ocorrencias.map((o) => (
              <div
                key={o.id}
                className="rounded-2xl p-4 bg-white shadow-sm border"
                style={{ borderColor: '#E4E0D8' }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base font-semibold" style={{ color: '#1A1A1A' }}>
                    {o.data || 'Data não informada'}
                  </span>
                  <button
                    onClick={() => setConfirmarId(o.id)}
                    aria-label="Apagar este registro"
                    className="p-1 transition-opacity active:opacity-70"
                  >
                    <Trash2 size={18} color="#C0392B" />
                  </button>
                </div>
                {o.local && (
                  <p className="text-xs mb-1" style={{ color: '#6B7280' }}>{o.local}</p>
                )}
                <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
                  {o.descricao}
                </p>
                {o.testemunhas && (
                  <p className="text-xs mt-2" style={{ color: '#6B7280' }}>
                    Testemunhas: {o.testemunhas}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmação de remoção */}
      {confirmarId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 flex flex-col gap-4 shadow-xl">
            <p className="text-lg font-bold" style={{ color: '#1A1A1A' }}>Apagar registro</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>Esta ação não pode ser desfeita.</p>
            <button
              onClick={() => { remover(confirmarId); setConfirmarId(null); }}
              className="w-full rounded-xl py-3 font-semibold text-white"
              style={{ backgroundColor: '#C0392B' }}
            >
              Apagar
            </button>
            <button
              onClick={() => setConfirmarId(null)}
              className="w-full text-center py-2 text-sm"
              style={{ color: '#6B7280' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold" style={{ color: '#3F3F46' }}>
        {label}
      </label>
      <input
        type="text"
        className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-200"
        style={{
          borderColor: '#E4E0D8',
          backgroundColor: '#F4F4F1',
          color: '#1A1A1A',
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={label}
      />
    </div>
  );
}

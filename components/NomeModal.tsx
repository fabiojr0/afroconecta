'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function NomeModal() {
  const { nomeModalVisivel, confirmarNome, cancelarNome } = useAuth();
  const [nome, setNome] = useState('');

  if (!nomeModalVisivel) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 flex flex-col gap-4 shadow-xl">
        <div>
          <p className="text-lg font-bold mb-1" style={{ color: '#1A1A1A' }}>
            Como você se chama?
          </p>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            Para salvar seu registro, precisamos de um nome.
          </p>
        </div>
        <input
          className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2"
          style={{
            borderColor: '#E4E0D8',
            backgroundColor: '#F4F4F1',
            color: '#1A1A1A',
          }}
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoFocus
        />
        <button
          onClick={() => { if (nome.trim()) confirmarNome(nome); }}
          disabled={!nome.trim()}
          className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-50 transition-opacity"
          style={{ backgroundColor: '#1F4E79' }}
        >
          Confirmar
        </button>
        <button
          onClick={cancelarNome}
          className="w-full text-center text-sm py-1"
          style={{ color: '#6B7280' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

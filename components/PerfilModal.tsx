'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface PerfilModalProps {
  visivel: boolean;
  onFechar: () => void;
}

export function PerfilModal({ visivel, onFechar }: PerfilModalProps) {
  const { user, nomeAnonimo, signOut, atualizarNomeAnonimo } = useAuth();
  const router = useRouter();
  const [editandoNome, setEditandoNome] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  if (!visivel) return null;

  const nomeExibido =
    (user?.user_metadata?.nome_completo as string | undefined) ??
    user?.email ??
    nomeAnonimo ??
    'Visitante';

  const handleSairOuLogin = async () => {
    if (user) {
      await signOut();
      onFechar();
      router.push('/auth');
    } else {
      onFechar();
      router.push('/auth');
    }
  };

  const handleSalvarNome = () => {
    if (novoNome.trim()) {
      atualizarNomeAnonimo(novoNome.trim());
      setEditandoNome(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={onFechar}
    >
      <div
        className="w-full max-w-sm rounded-t-3xl bg-white p-6 flex flex-col gap-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto" style={{ backgroundColor: '#E4E0D8' }} />

        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full text-white text-base font-bold"
            style={{ width: 48, height: 48, backgroundColor: '#1F4E79' }}
          >
            {nomeExibido.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold" style={{ color: '#1A1A1A' }}>{nomeExibido}</p>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              {user ? 'Conta conectada' : 'Visitante anônimo'}
            </p>
          </div>
        </div>

        {!user && (
          <>
            {editandoNome ? (
              <div className="flex flex-col gap-2">
                <input
                  className="w-full rounded-xl border px-4 py-3 text-base outline-none"
                  style={{ borderColor: '#E4E0D8', backgroundColor: '#F4F4F1', color: '#1A1A1A' }}
                  placeholder="Seu nome"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={handleSalvarNome}
                  className="w-full rounded-xl py-3 font-semibold text-white"
                  style={{ backgroundColor: '#1F4E79' }}
                >
                  Salvar
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setNovoNome(nomeAnonimo ?? ''); setEditandoNome(true); }}
                className="w-full rounded-xl py-3 border font-semibold transition-opacity active:opacity-70"
                style={{ borderColor: '#E4E0D8', color: '#3F3F46' }}
              >
                Editar nome
              </button>
            )}
          </>
        )}

        <button
          onClick={handleSairOuLogin}
          className="w-full rounded-xl py-3 font-semibold text-white transition-opacity active:opacity-70"
          style={{ backgroundColor: user ? '#C0392B' : '#1F4E79' }}
        >
          {user ? 'Sair da conta' : 'Fazer login'}
        </button>

        <button
          onClick={onFechar}
          className="w-full text-center py-2 text-sm"
          style={{ color: '#6B7280' }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

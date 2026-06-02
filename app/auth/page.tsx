'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

type Modo = 'entrar' | 'cadastrar';

export default function AuthPage() {
  const router = useRouter();
  const { signIn, signUp, pularAuth } = useAuth();
  const [modo, setModo] = useState<Modo>('entrar');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (modo === 'cadastrar' && !nomeCompleto.trim()) {
      setErro('Informe seu nome completo para criar a conta.');
      return;
    }
    if (!email.trim() || !senha.trim()) {
      setErro('Preencha e-mail e senha para continuar.');
      return;
    }
    setErro(null);
    setCarregando(true);
    const { erro: e } =
      modo === 'entrar'
        ? await signIn(email.trim(), senha)
        : await signUp(email.trim(), senha, nomeCompleto.trim());
    setCarregando(false);
    if (e) {
      setErro(e);
      return;
    }
    router.replace('/');
  };

  const handlePular = () => {
    pularAuth();
    router.replace('/');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-6"
      style={{ backgroundColor: '#F4F4F1' }}
    >
      {/* Logo + título */}
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/afroconectalogo.png"
          alt="AfroConecta logo"
          width={72}
          height={72}
          className="rounded-2xl"
        />
        <h1 className="text-3xl font-extrabold text-center" style={{ color: '#1F4E79' }}>
          AfroConecta
        </h1>
        <p className="text-base text-center px-4" style={{ color: '#3F3F46' }}>
          Entre para salvar seu progresso e registros na nuvem, ou continue sem conta.
        </p>
      </div>

      {/* Card do formulário */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 bg-white shadow-sm border flex flex-col gap-4"
        style={{ borderColor: '#E4E0D8' }}
      >
        {/* Toggle Entrar / Cadastrar */}
        <div
          className="flex rounded-xl p-1 gap-1"
          style={{ backgroundColor: '#F4F4F1' }}
        >
          {(['entrar', 'cadastrar'] as Modo[]).map((m) => (
            <button
              key={m}
              onClick={() => { setModo(m); setErro(null); }}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: modo === m ? '#FFFFFF' : 'transparent',
                color: modo === m ? '#1F4E79' : '#6B7280',
                boxShadow: modo === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {m === 'entrar' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        {/* Nome completo (só no cadastro) */}
        {modo === 'cadastrar' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: '#3F3F46' }}>
              Nome completo
            </label>
            <input
              type="text"
              className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#E4E0D8', backgroundColor: '#F4F4F1', color: '#1A1A1A' }}
              placeholder="Como você se chama?"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              autoComplete="name"
            />
          </div>
        )}

        {/* E-mail */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: '#3F3F46' }}>E-mail</label>
          <input
            type="email"
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-200"
            style={{ borderColor: '#E4E0D8', backgroundColor: '#F4F4F1', color: '#1A1A1A' }}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold" style={{ color: '#3F3F46' }}>Senha</label>
          <input
            type="password"
            className="w-full rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-200"
            style={{ borderColor: '#E4E0D8', backgroundColor: '#F4F4F1', color: '#1A1A1A' }}
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'}
          />
        </div>

        {erro && <p className="text-sm" style={{ color: '#C0392B' }}>{erro}</p>}

        <button
          onClick={handleSubmit}
          disabled={carregando}
          className="w-full rounded-xl py-3 font-semibold text-white disabled:opacity-60 transition-opacity active:opacity-80"
          style={{ backgroundColor: '#1F4E79' }}
        >
          {carregando
            ? modo === 'entrar' ? 'Entrando...' : 'Cadastrando...'
            : modo === 'entrar' ? 'Entrar' : 'Criar conta'}
        </button>
      </div>

      <button
        onClick={handlePular}
        className="text-base py-2 transition-opacity active:opacity-70"
        style={{ color: '#6B7280' }}
      >
        Continuar sem conta
      </button>
    </div>
  );
}

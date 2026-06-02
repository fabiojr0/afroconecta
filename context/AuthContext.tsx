'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

const AUTH_SKIP_KEY = '@afroconecta/auth_skip';
const NOME_ANONIMO_KEY = '@afroconecta/nome_anonimo';

function lsGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
}
function lsSet(key: string, value: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
}
function lsDel(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  carregando: boolean;
  authDecisionMade: boolean;
  nomeAnonimo: string | null;
  signIn: (email: string, senha: string) => Promise<{ erro: string | null }>;
  signUp: (email: string, senha: string, nomeCompleto: string) => Promise<{ erro: string | null }>;
  signOut: () => Promise<void>;
  pularAuth: () => void;
  obterNomeParaSalvar: () => Promise<string | null>;
  atualizarNomeAnonimo: (nome: string) => void;
  nomeModalVisivel: boolean;
  confirmarNome: (nome: string) => void;
  cancelarNome: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [authDecisionMade, setAuthDecisionMade] = useState(false);
  const [nomeAnonimo, setNomeAnonimo] = useState<string | null>(null);
  const [nomeModalVisivel, setNomeModalVisivel] = useState(false);
  const resolveNomeRef = useRef<((nome: string | null) => void) | null>(null);

  useEffect(() => {
    let ativo = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!ativo) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) setAuthDecisionMade(true);

      const skip = lsGet(AUTH_SKIP_KEY);
      if (skip) setAuthDecisionMade(true);

      const nome = lsGet(NOME_ANONIMO_KEY);
      if (nome) setNomeAnonimo(nome);

      setCarregando(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) setAuthDecisionMade(true);
    });

    return () => {
      ativo = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, senha: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (!error) setAuthDecisionMade(true);
    return { erro: error?.message ?? null };
  }, []);

  const signUp = useCallback(async (email: string, senha: string, nomeCompleto: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { data: { nome_completo: nomeCompleto } },
    });
    if (!error) setAuthDecisionMade(true);
    return { erro: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    lsDel(AUTH_SKIP_KEY);
    lsDel(NOME_ANONIMO_KEY);
    setNomeAnonimo(null);
    setUser(null);
    setSession(null);
    setAuthDecisionMade(false);
  }, []);

  const pularAuth = useCallback(() => {
    lsSet(AUTH_SKIP_KEY, '1');
    setAuthDecisionMade(true);
  }, []);

  const obterNomeParaSalvar = useCallback((): Promise<string | null> => {
    if (user) {
      const nome =
        (user.user_metadata?.nome_completo as string | undefined) ?? user.email ?? null;
      return Promise.resolve(nome);
    }
    if (nomeAnonimo) return Promise.resolve(nomeAnonimo);

    return new Promise<string | null>((resolve) => {
      resolveNomeRef.current = resolve;
      setNomeModalVisivel(true);
    });
  }, [user, nomeAnonimo]);

  const confirmarNome = useCallback((nome: string) => {
    const nomeTrimmed = nome.trim();
    lsSet(NOME_ANONIMO_KEY, nomeTrimmed);
    setNomeAnonimo(nomeTrimmed);
    setNomeModalVisivel(false);
    resolveNomeRef.current?.(nomeTrimmed);
    resolveNomeRef.current = null;
  }, []);

  const atualizarNomeAnonimo = useCallback((nome: string) => {
    const nomeTrimmed = nome.trim();
    lsSet(NOME_ANONIMO_KEY, nomeTrimmed);
    setNomeAnonimo(nomeTrimmed);
  }, []);

  const cancelarNome = useCallback(() => {
    setNomeModalVisivel(false);
    resolveNomeRef.current?.(null);
    resolveNomeRef.current = null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        carregando,
        authDecisionMade,
        nomeAnonimo,
        signIn,
        signUp,
        signOut,
        pularAuth,
        obterNomeParaSalvar,
        atualizarNomeAnonimo,
        nomeModalVisivel,
        confirmarNome,
        cancelarNome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}

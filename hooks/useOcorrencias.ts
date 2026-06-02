'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '@raizes/ocorrencias';

export type Ocorrencia = {
  id: string;
  data: string;
  local: string;
  descricao: string;
  testemunhas: string;
  criadoEm: number;
};

export type NovaOcorrencia = Omit<Ocorrencia, 'id' | 'criadoEm'>;

function readStorage(): Ocorrencia[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Ocorrencia[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(lista: Ocorrencia[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

export function useOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    setOcorrencias(readStorage());
  }, []);

  const persistir = useCallback((lista: Ocorrencia[]) => {
    setOcorrencias(lista);
    writeStorage(lista);
  }, []);

  const adicionar = useCallback(
    (nova: NovaOcorrencia): Ocorrencia => {
      const registro: Ocorrencia = {
        ...nova,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        criadoEm: Date.now(),
      };
      const atual = readStorage();
      persistir([registro, ...atual]);
      return registro;
    },
    [persistir]
  );

  const remover = useCallback(
    (id: string) => {
      persistir(ocorrencias.filter((o) => o.id !== id));
    },
    [ocorrencias, persistir]
  );

  return { ocorrencias, adicionar, remover };
}

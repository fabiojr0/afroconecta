import { supabase } from './supabase';
import type { Ocorrencia } from '@/hooks/useOcorrencias';

function supabaseConfigurado() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export async function salvarOcorrencia(
  ocorrencia: Ocorrencia,
  userId: string | null,
  nomeUsuario: string
) {
  if (!supabaseConfigurado()) return { erro: null };
  const { error } = await supabase.from('ocorrencias').insert({
    user_id: userId ?? undefined,
    nome_usuario: nomeUsuario,
    data: ocorrencia.data || null,
    local: ocorrencia.local || null,
    descricao: ocorrencia.descricao,
    testemunhas: ocorrencia.testemunhas || null,
    criado_em: new Date(ocorrencia.criadoEm).toISOString(),
  });
  return { erro: error?.message ?? null };
}

export async function salvarResultadoQuiz(params: {
  userId: string | null;
  nomeUsuario: string;
  quizId: string;
  quizTitulo: string;
  acertos: number;
  total: number;
  percentagem: number;
}) {
  if (!supabaseConfigurado()) return { erro: null };
  const { error } = await supabase.from('resultados_quiz').insert({
    user_id: params.userId ?? undefined,
    nome_usuario: params.nomeUsuario,
    quiz_id: params.quizId,
    quiz_titulo: params.quizTitulo,
    acertos: params.acertos,
    total: params.total,
    percentagem: params.percentagem,
  });
  return { erro: error?.message ?? null };
}

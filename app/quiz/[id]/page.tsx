'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Check, RotateCcw, Trophy, X } from 'lucide-react';
import { quizzes } from '@/constants/content';
import { useAuth } from '@/context/AuthContext';
import { salvarResultadoQuiz } from '@/lib/db';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const quiz = useMemo(() => quizzes.find((q) => q.id === id), [id]);
  const { user, obterNomeParaSalvar } = useAuth();

  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const jaSlvouRef = useRef(false);

  const reiniciar = useCallback(() => {
    setIndice(0);
    setSelecionada(null);
    setAcertos(0);
    setFinalizado(false);
    jaSlvouRef.current = false;
  }, []);

  const responder = useCallback(
    (opcao: number) => {
      if (selecionada !== null || !quiz) return;
      setSelecionada(opcao);
      if (opcao === quiz.perguntas[indice].correta) {
        setAcertos((a) => a + 1);
      }
    },
    [selecionada, quiz, indice]
  );

  const avancar = useCallback(() => {
    if (!quiz) return;
    if (indice + 1 >= quiz.perguntas.length) {
      setFinalizado(true);
      return;
    }
    setIndice((i) => i + 1);
    setSelecionada(null);
  }, [quiz, indice]);

  useEffect(() => {
    if (!finalizado || !quiz || jaSlvouRef.current) return;
    jaSlvouRef.current = true;
    const total = quiz.perguntas.length;
    const pct = Math.round((acertos / total) * 100);
    obterNomeParaSalvar().then((nome) => {
      if (nome === null) return;
      salvarResultadoQuiz({
        userId: user?.id ?? null,
        nomeUsuario: nome,
        quizId: quiz.id,
        quizTitulo: quiz.titulo,
        acertos,
        total,
        percentagem: pct,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalizado]);

  if (!quiz) {
    return (
      <div className="flex flex-col px-4 pt-10">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: '#1F4E79' }}>
          <ArrowLeft size={18} /> Voltar
        </button>
        <p style={{ color: '#6B7280' }}>Quiz não encontrado.</p>
      </div>
    );
  }

  if (finalizado) {
    const total = quiz.perguntas.length;
    const pct = Math.round((acertos / total) * 100);
    return (
      <div className="flex flex-col px-4 pt-10 pb-10 gap-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: '#1F4E79' }}>
          <ArrowLeft size={18} /> {quiz.titulo}
        </button>
        <div
          className="rounded-2xl p-6 bg-white shadow-sm border flex flex-col items-center gap-3 text-center"
          style={{ borderColor: '#E4E0D8' }}
        >
          <div
            className="flex items-center justify-center rounded-full mb-2"
            style={{ width: 64, height: 64, backgroundColor: `${quiz.cor}1A` }}
          >
            <Trophy size={32} color={quiz.cor} />
          </div>
          <h2 className="text-xl font-bold" style={{ color: '#1A1A1A' }}>
            Você acertou {acertos} de {total}
          </h2>
          <p className="text-base font-semibold" style={{ color: '#6B7280' }}>
            {pct}% de aproveitamento
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
            {pct >= 70
              ? 'Mandou muito bem! Continue se aprofundando no tema.'
              : 'Bom começo — revise o conteúdo e tente novamente.'}
          </p>
          <button
            onClick={reiniciar}
            className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white mt-2 transition-opacity active:opacity-80"
            style={{ backgroundColor: quiz.cor }}
          >
            <RotateCcw size={18} />
            Refazer quiz
          </button>
        </div>
      </div>
    );
  }

  const pergunta = quiz.perguntas[indice];
  const respondida = selecionada !== null;
  const progresso = (indice + 1) / quiz.perguntas.length;

  return (
    <div className="flex flex-col px-4 pt-10 pb-10 gap-5">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: '#1F4E79' }}
      >
        <ArrowLeft size={18} /> {quiz.titulo}
      </button>

      {/* Progress */}
      <div>
        <p className="text-xs mb-2" style={{ color: '#6B7280' }}>
          Pergunta {indice + 1} de {quiz.perguntas.length}
        </p>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E4E0D8' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progresso * 100}%`, backgroundColor: quiz.cor }}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold leading-snug" style={{ color: '#1A1A1A' }}>
        {pergunta.enunciado}
      </h2>

      <div className="flex flex-col gap-3">
        {pergunta.opcoes.map((opcao, i) => {
          const correta = i === pergunta.correta;
          const escolhida = i === selecionada;
          const mostrarCerta = respondida && correta;
          const mostrarErrada = respondida && escolhida && !correta;

          let borderColor = '#E4E0D8';
          let bgColor = '#FFFFFF';
          if (mostrarCerta) { borderColor = '#2E7D52'; bgColor = '#2E7D5214'; }
          if (mostrarErrada) { borderColor = '#C0392B'; bgColor = '#C0392B14'; }

          return (
            <button
              key={i}
              onClick={() => responder(i)}
              disabled={respondida}
              className="flex items-center justify-between gap-3 rounded-2xl px-4 py-4 border text-left transition-all active:scale-[0.98] disabled:cursor-default"
              style={{ borderColor, backgroundColor: bgColor, borderWidth: 1.5 }}
            >
              <span className="text-base font-semibold flex-1" style={{ color: '#1A1A1A' }}>
                {opcao}
              </span>
              {respondida && correta && <Check size={20} color="#2E7D52" />}
              {respondida && escolhida && !correta && <X size={20} color="#C0392B" />}
            </button>
          );
        })}
      </div>

      {respondida && (
        <div
          className="rounded-2xl p-4 flex flex-col gap-1"
          style={{ backgroundColor: '#E7EEF5' }}
        >
          <p className="text-base font-semibold" style={{ color: '#1F4E79' }}>
            {selecionada === pergunta.correta ? 'Correto!' : 'Quase lá'}
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#3F3F46' }}>
            {pergunta.explicacao}
          </p>
        </div>
      )}

      {respondida && (
        <button
          onClick={avancar}
          className="w-full rounded-2xl py-4 font-semibold text-white transition-opacity active:opacity-80"
          style={{ backgroundColor: quiz.cor }}
        >
          {indice + 1 >= quiz.perguntas.length ? 'Ver resultado' : 'Próxima'}
        </button>
      )}
    </div>
  );
}

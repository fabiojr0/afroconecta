'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';

export function EmergencyButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 rounded-2xl px-5 py-4 font-semibold text-white transition-transform active:scale-95"
        style={{ backgroundColor: '#C0392B' }}
        aria-label="Denúncia urgente"
      >
        <span
          className="flex items-center justify-center rounded-xl"
          style={{ width: 40, height: 40, backgroundColor: 'rgba(255,255,255,0.18)' }}
        >
          <AlertTriangle size={22} color="#fff" />
        </span>
        <span className="flex flex-col items-start">
          <span className="text-base font-bold leading-tight">Denúncia urgente</span>
          <span className="text-sm font-normal opacity-90">Acione agora um canal de proteção</span>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6 bg-white flex flex-col gap-3">
            <p className="text-base font-bold" style={{ color: '#1A1A1A' }}>Denúncia urgente</p>
            <p className="text-sm" style={{ color: '#6B7280' }}>Você pode acionar agora um canal de proteção:</p>
            <a
              href="tel:100"
              className="w-full text-center rounded-xl py-3 font-semibold text-white transition-opacity active:opacity-80"
              style={{ backgroundColor: '#C0392B' }}
              onClick={() => setOpen(false)}
            >
              Ligar 100 (Direitos Humanos)
            </a>
            <button
              onClick={() => { setOpen(false); router.push('/apoio'); }}
              className="w-full text-center rounded-xl py-3 font-semibold border transition-opacity active:opacity-80"
              style={{ borderColor: '#E4E0D8', color: '#1F4E79' }}
            >
              Ver canais de apoio
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full text-center py-2 text-sm"
              style={{ color: '#6B7280' }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

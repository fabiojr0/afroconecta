interface SectionHeaderProps {
  titulo: string;
  acaoLabel?: string;
  onAcaoPress?: () => void;
}

export function SectionHeader({ titulo, acaoLabel, onAcaoPress }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-lg font-bold" style={{ color: '#1A1A1A' }}>
        {titulo}
      </span>
      {acaoLabel && onAcaoPress && (
        <button
          onClick={onAcaoPress}
          className="text-sm font-semibold transition-opacity active:opacity-70"
          style={{ color: '#1F4E79' }}
        >
          {acaoLabel}
        </button>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, House, LifeBuoy, NotebookPen, Scale } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Início', Icon: House },
  { href: '/educacao', label: 'Aprender', Icon: BookOpen },
  { href: '/direito', label: 'Direitos', Icon: Scale },
  { href: '/apoio', label: 'Apoio', Icon: LifeBuoy },
  { href: '/registro', label: 'Registrar', Icon: NotebookPen },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center border-t"
      style={{ backgroundColor: '#FFFFFF', borderColor: '#E4E0D8', height: 64, paddingBottom: 4 }}
    >
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-opacity active:opacity-70"
            aria-current={active ? 'page' : undefined}
          >
            <Icon
              size={22}
              color={active ? '#1F4E79' : '#9CA3AF'}
              strokeWidth={active ? 2.5 : 1.8}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: active ? '#1F4E79' : '#9CA3AF' }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { NomeModal } from '@/components/NomeModal';

export const metadata: Metadata = {
  title: 'AfroConecta',
  description: 'Conhecimento que combate o racismo — aprenda, conheça seus direitos e encontre apoio.',
  icons: { icon: '/afroconectalogo.png', apple: '/afroconectalogo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: '#F4F4F1', minHeight: '100vh' }}>
        <AuthProvider>
          <main className="mx-auto max-w-lg min-h-screen pb-20">
            {children}
          </main>
          <Navbar />
          <NomeModal />
        </AuthProvider>
      </body>
    </html>
  );
}

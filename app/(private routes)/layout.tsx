'use client';

import { ReactNode } from 'react';
import Providers from '@/lib/providers';
import Header from '@/components/Header/Header';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Providers>
      <Header />
      <main className="container">
        {children}
      </main>
    </Providers>
  );
}

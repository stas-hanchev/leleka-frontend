'use client';

import { ReactNode } from 'react';
import Providers from '@/lib/providers';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Providers>
      <div className="private-layout">{children}</div>
    </Providers>
  );
}

import { PropsWithChildren } from 'react';

import { AlgorithmInfo } from '@/components/algorithm-info';

export default function AlgorithmsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AlgorithmInfo />
      {children}
    </>
  );
}

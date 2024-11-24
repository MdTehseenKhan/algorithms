import type { HTMLAttributes } from 'react';

import { cn } from '@/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('w-full px-6 md:px-20', className)}>{children}</div>
  );
};
Container.displayName = 'Container';

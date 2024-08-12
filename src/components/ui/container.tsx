import { HTMLAttributes } from 'react';

import { cn } from '@/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn('w-full px-6 lg:container md:px-20 lg:mx-auto', className)}
    >
      {children}
    </div>
  );
};
Container.displayName = 'Container';

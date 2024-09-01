import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/utils';

const List = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid gap-1">{children}</div>;
};
List.displayName = 'List';

const ListHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-sm text-muted-foreground font-medium leading-none mb-2">
      {children}
    </div>
  );
};
ListHeader.displayName = 'ListHeader';

interface ListItemProps extends React.PropsWithChildren {
  href?: string;
  className?: string;
}
const ListItem = ({ href, className, children }: ListItemProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'group -mx-3 flex flex-col gap-1 rounded-md p-3 transition-all hover:bg-accent hover:text-accent-foreground',
          className
        )}
      >
        {children}
      </Link>
    );
  }
  return (
    <div
      className={cn(
        'group -mx-3 flex flex-col gap-1 rounded-md p-3 transition-all hover:bg-accent hover:text-accent-foreground',
        className
      )}
    >
      {children}
    </div>
  );
};
ListItem.displayName = 'ListItem';

const ListItemTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-sm font-medium leading-none">{children}</h1>;
};
ListItemTitle.displayName = 'ListItemTitle';

const ListItemDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs text-muted-foreground">{children}</p>;
};
ListItemDescription.displayName = 'ListItemDescription';

export { List, ListHeader, ListItem, ListItemTitle, ListItemDescription };

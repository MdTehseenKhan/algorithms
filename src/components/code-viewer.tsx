'use client';

import type { FC, PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useMediaQuery } from '@/core/hooks/use-media-query';

export const CodeViewer: FC<PropsWithChildren> = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const Panel = isDesktop ? Sheet : Drawer;
  const PanelTrigger = isDesktop ? SheetTrigger : DrawerTrigger;
  const PanelContent = isDesktop ? SheetContent : DrawerContent;

  return (
    <Panel>
      <PanelTrigger asChild>
        <Button size="sm" variant="secondary">
          View Code
        </Button>
      </PanelTrigger>
      <PanelContent className="h-2/3 md:h-full md:min-w-[800px] p-0">
        <div className="relative overflow-y-auto p-4 h-full md:py-12">
          {children}
        </div>
      </PanelContent>
    </Panel>
  );
};

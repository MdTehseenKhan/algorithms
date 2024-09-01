'use client';

import { FC } from 'react';
import { BundledLanguage } from 'shiki';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { AlgorithmCode } from '@/utils/algorithms';
import { useMediaQuery } from '@/core/hooks/use-media-query';
import { CodeBlock } from './ui/codeblock';

interface CodeViewerProps {
  title: string;
  codes: AlgorithmCode[];
}

export const CodeViewer: FC<CodeViewerProps> = ({ title, codes }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const Panel = isDesktop ? Sheet : Drawer;
  const PanelTrigger = isDesktop ? SheetTrigger : DrawerTrigger;
  const PanelContent = isDesktop ? SheetContent : DrawerContent;
  const PanelHeader = isDesktop ? SheetHeader : DrawerHeader;
  const PanelTitle = isDesktop ? SheetTitle : DrawerTitle;

  return (
    <Panel>
      <PanelTrigger asChild>
        <Button size="sm" variant="secondary">
          View Code
        </Button>
      </PanelTrigger>
      <PanelContent className="md:min-w-[800px] pb-20">
        <PanelHeader className="mb-6">
          <PanelTitle>{title}</PanelTitle>
        </PanelHeader>
        <div className="flex-col space-y-4">
          {codes.map(({ language, code }) => (
            <div key={language} className="flex-col space-y-2">
              <h3 className="font-semibold">{language}</h3>
              <CodeBlock
                code={code}
                filename="ceasar-cipher.ts"
                lang={language.toLowerCase() as BundledLanguage}
              />
            </div>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
};

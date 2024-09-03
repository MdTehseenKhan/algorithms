import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/codeblock';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { AlgorithmCode } from '@/utils/algorithms';

interface CodeViewerProps {
  codes: AlgorithmCode[];
  filename?: string;
}

export const CodeViewer: FC<CodeViewerProps> = ({ codes, filename }) => {
  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="sm" variant="secondary">
              View Code
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-2/3 justify-center">
            {/* <ScrollArea className="h-full w-full"> */}
            <div className="overflow-y-auto p-4">
              <CodeBlock filename={filename} codes={codes} />
            </div>
            {/* </ScrollArea> */}
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:block">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="secondary">
              View Code
            </Button>
          </SheetTrigger>
          <SheetContent className="md:min-w-[800px] pb-20">
            <CodeBlock filename={filename} codes={codes} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

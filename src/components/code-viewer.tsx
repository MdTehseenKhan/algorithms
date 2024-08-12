'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { FC } from 'react';

import { CopyBlock, dracula } from 'react-code-blocks';

interface CodeViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CodeViewer: FC<CodeViewerProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="md:min-w-[800px] overflow-y-scroll">
        <SheetHeader className="mb-6">
          <SheetTitle>
            {/* {algorithmsData[selectedAlgorithm].title} */}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-col space-y-4">
          {/* {algorithmsData[selectedAlgorithm].codes.map(
          ({ language, code }) => (
            <div key={language} className="flex-col space-y-2">
              <h3 className="font-semibold">{language}</h3>
              <CopyBlock
                text={code}
                language={language.toLowerCase()}
                showLineNumbers={false}
                theme={dracula}
              />
            </div>
          )
        )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default CodeViewer;

import type { BundledLanguage, BundledTheme } from 'shiki';

import * as React from 'react';
// import {
//   transformerNotationDiff,
//   transformerNotationHighlight,
// } from '@shikijs/transformers';
import { createHighlighter } from 'shiki';

import { CopyToClipboard } from '@/components/ui/copy-to-clipboard';

import { AlgorithmCode } from '@/utils/algorithms';

type CodeBlockProps = {
  codes: AlgorithmCode[];
  lang?: BundledLanguage;
  theme?: BundledTheme;
  filename?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = async ({
  codes,
  lang = 'typescript',
  theme = 'material-theme-darker',
  filename,
}) => {
  const highlighter = await createHighlighter({
    themes: [theme],
    langs: [lang],
  });
  const html = highlighter.codeToHtml(codes[0].code, {
    lang,
    theme,
    // transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  return (
    // <div className="rounded-lg bg-gradient-to-r from-sky-200 to-sky-400 p-4 !pr-0 md:p-8 lg:p-12 [&>pre]:rounded-none max-w-xl">
    <div className="rounded-md">
      <div className="flex items-center justify-between rounded-t-md bg-gradient-to-r from-neutral-900 to-neutral-800 text-sm h-11 px-4">
        {filename && <span className="text-secondary">{filename}</span>}
        <CopyToClipboard code={codes[0].code} />
      </div>
      <div
        className="rounded-b-md border-t-2 border-neutral-700 text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full overflow-y-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
    // </div>
  );
};
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };

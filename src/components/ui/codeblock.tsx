'use client';

// import {
//   transformerNotationHighlight,
//   transformerNotationDiff,
// } from "@shikijs/transformers";
import type { BundledLanguage, BundledTheme } from 'shiki';

import * as React from 'react';
import { codeToHtml } from 'shiki';

import { CopyToClipboard } from '@/components/ui/copy-to-clipboard';
import { If } from '@/components/if';
import { CodeBlockSkeleton } from '@/components/skeleton/codeblock-skeleton';

type CodeBlockProps = {
  code: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  filename?: string;
};

export function CodeBlock({
  code,
  lang = 'typescript',
  theme = 'material-theme-darker',
  filename,
}: CodeBlockProps) {
  const [html, setHtml] = React.useState('');

  React.useEffect(() => {
    async function getHtml() {
      const innerHtml = await codeToHtml(code, {
        lang,
        theme,
        // transformers: [transformerNotationHighlight(), transformerNotationDiff()],
      });
      setHtml(innerHtml);
    }
    getHtml();
  }, [code, theme, lang]);

  return (
    // <div className="rounded-lg bg-gradient-to-r from-sky-200 to-sky-400 p-4 !pr-0 md:p-8 lg:p-12 [&>pre]:rounded-none max-w-xl">
    <div className="overflow-hidden rounded-md">
      <div className="flex items-center justify-between bg-gradient-to-r from-neutral-900 to-neutral-800 text-sm h-11 px-4">
        {filename && <span className="text-secondary">{filename}</span>}
        <CopyToClipboard code={code} />
      </div>
      <If condition={html} fallback={<CodeBlockSkeleton />}>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="border-t-2 border-neutral-700 text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        />
      </If>
    </div>
    // </div>
  );
}

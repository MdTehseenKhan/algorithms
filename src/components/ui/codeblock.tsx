import type { AlgorithmCode } from '@/utils/algorithms';
import type { BundledLanguage, BundledTheme } from 'shiki';
// import {
//   transformerNotationDiff,
//   transformerNotationHighlight,
// } from '@shikijs/transformers';
import { codeToHtml } from 'shiki';

import { CopyToClipboard } from '@/components/ui/copy-to-clipboard';

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
  const html = await codeToHtml(codes[0].code, {
    lang,
    theme,
    // transformers: [transformerNotationHighlight(), transformerNotationDiff()],
  });

  return (
    <div className="rounded-md">
      <div className="flex items-center justify-between rounded-t-md bg-gradient-to-r from-neutral-900 to-neutral-800 border-b-2 border-neutral-700 text-sm h-11 px-4">
        {filename && <span className="text-gray-200">{filename}.ts</span>}
        <CopyToClipboard code={codes[0].code} />
      </div>
      <div
        className="rounded-b-md text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-neutral-900 [&>pre]:py-3 [&>pre]:pl-4 [&>pre]:pr-5 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        // biome-ignore lint: Dangerous html
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};
CodeBlock.displayName = 'CodeBlock';

export { CodeBlock };

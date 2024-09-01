import { relative } from 'path';

const getStagedFiles = (filenames) => {
  return filenames.map((f) => relative(process.cwd(), f));
};

const buildPrettierCommand = (filenames) => {
  return `prettier --write ${getStagedFiles(filenames).join(' ')}`;
};

const builTypeCommand = (filenames) => {
  // tsc-files: A tiny tool to run `tsc` on specific files without ignoring `tsconfig.json`.
  return `tsc-files --noEmit --skipLibCheck ${getStagedFiles(filenames).join(' ')}`;
};

const buildEslintCommand = (filenames) => {
  return `next lint --fix --file ${getStagedFiles(filenames).join(' --file ')}`;
};

const lintStagedConfig = {
  '**/*.{js,jsx,ts,tsx}': buildEslintCommand,
  '**/*.{ts,tsx}': builTypeCommand,
  '**/*.{js,jsx,ts,tsx,json,css,scss,md}': buildPrettierCommand,
};

export default lintStagedConfig;

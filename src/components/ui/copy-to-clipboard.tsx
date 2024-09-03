'use client';

import React, { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/utils';

export const CopyToClipboard = ({
  code,
  className,
}: {
  code: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success('Copied to clipboard');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard', error);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={cn(
        'relative p-2 hover:bg-secondary/10 rounded-sm outline-none overflow-hidden',
        className
      )}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      <CopyIcon
        className={cn(
          'absolute inset-0 transition-all duration-300 text-background size-4',
          copied ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        )}
      />
      <CheckIcon
        className={cn(
          'absolute inset-0 transition-all duration-300 text-background size-4',
          copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}
      />
    </button>
  );
};

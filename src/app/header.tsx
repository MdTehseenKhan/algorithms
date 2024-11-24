import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

import { GithubIcon } from '@/components/icons/github';
import { buttonVariants } from '@/components/ui/button';

import { ToggleTheme } from '@/components/toggle-theme';
import { cn } from '@/utils';

export function Header() {
  return (
    <div className="fixed top-0 w-full h-20 flex items-center bg-background/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 md:px-20 w-full max-w-2xl mx-auto">
        <div>
          <Link href="/" className="text-2xl font-semibold">
            Algorithms
          </Link>

          <div className="flex text-muted-foreground text-xs">
            <span>Built by</span>
            <Link
              className="text-blue-400 ml-1"
              href="https://www.linkedin.com/in/md-tehseen-khan/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Muhammad Tehseen Khan
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
            href="https://github.com/MdTehseenKhan"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubIcon />
          </Link>

          <ToggleTheme />
          {/* <Link
            href="/"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <MenuIcon />
          </Link> */}

          {/* <Button variant="ghost" size="icon">
            <MenuIcon />
          </Button> */}
        </div>
      </div>
    </div>
  );
}

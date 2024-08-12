import { Container } from '@/components/ui/container';
import { ArrowUpRightIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <div className="h-20 flex items-center fixed top-0 w-full">
      <Container className="flex items-center justify-between">
        <div>
          <div className="flex items-end">
            <h1 className="text-2xl font-semibold">Algorithms</h1>
            <Link
              className="text-xs flex items-center text-blue-400 ml-2 mb-1 whitespace-nowrap"
              href="https://github.com/MdTehseenKhan/algorithms"
              rel="noopener noreferrer"
              target="_blank"
            >
              Source Code <ArrowUpRightIcon className="ml-px size-3" />
            </Link>
          </div>

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

        <div className="p-2">
          <MenuIcon />
        </div>
      </Container>
    </div>
  );
}

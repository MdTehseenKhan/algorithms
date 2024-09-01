import { Skeleton } from '@/components/skeleton';

export function CodeBlockSkeleton() {
  return (
    <div className="border-t-2 border-neutral-700 p-4 bg-[#171717] space-y-9">
      <div className="space-y-2 *:bg-[#303030]">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-5 w-5" />
      </div>
      <div className="space-y-2 *:bg-[#303030]">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-5 w-5" />
      </div>
      <div className="space-y-2 *:bg-[#303030]">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  );
}

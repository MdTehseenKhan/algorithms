'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { CodeViewer } from '@/components/code-viewer';

import { algorithmList } from '@/utils/algorithms';

export const AlgorithmInfo = () => {
  const segments = useSelectedLayoutSegments();
  const category = segments[0];
  const algo = segments[1];

  const algorithm = algorithmList[category][algo];

  return (
    <div className="grid gap-4">
      <Container>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>{algorithm.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">
            {algorithm.description}
          </CardContent>
        </Card>
      </Container>

      <Container>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Time Complexity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="flex w-full text-sm text-muted-foreground">
                <span className="w-28">Worst Case:</span>
                <span>{algorithm.worstCase}</span>
              </p>
              <p className="flex w-full text-sm text-muted-foreground">
                <span className="w-28">Average Case:</span>
                <span>{algorithm.averageCase}</span>
              </p>
              <p className="flex w-full text-sm text-muted-foreground">
                <span className="w-28">Best Case:</span>
                <span>{algorithm.bestCase}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>

      <Container>
        <div className="flex justify-between px-6 mb-4">
          <h1 className="text-2xl font-semibold">Implementation</h1>
          <CodeViewer title={algorithm.title} codes={algorithm.codes} />
        </div>
      </Container>
    </div>
  );
};

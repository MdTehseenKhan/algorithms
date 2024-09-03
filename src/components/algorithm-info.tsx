import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { CodeViewer } from '@/components/code-viewer';

import { algorithms } from '@/utils/algorithms';

export const AlgorithmInfo = ({ algorithmName }: { algorithmName: string }) => {
  const algorithm = algorithms[algorithmName];

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
              <p className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
                <span>Worst Case</span>
                <span className="flex h-px flex-1 bg-muted-foreground/50"></span>
                <span>{algorithm.worstCase}</span>
              </p>
              <p className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
                <span>Average Case</span>
                <span className="flex h-px flex-1 bg-muted-foreground/50"></span>
                <span>{algorithm.averageCase}</span>
              </p>
              <p className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
                <span>Best Case</span>
                <span className="flex h-px flex-1 bg-muted-foreground/50"></span>
                <span>{algorithm.bestCase}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>

      <Container>
        <div className="flex justify-between px-6 mb-4">
          <h1 className="text-2xl font-semibold">Implementation</h1>
          <CodeViewer filename={algorithmName} codes={algorithm.codes} />
        </div>
      </Container>
    </div>
  );
};

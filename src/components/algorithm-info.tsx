import { CodeViewer } from '@/components/code-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/codeblock';
import { Container } from '@/components/ui/container';

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
              <TimeComplexity
                title="Best Case"
                complexity={algorithm.bestCase}
              />
              <TimeComplexity
                title="Average Case"
                complexity={algorithm.averageCase}
              />
              <TimeComplexity
                title="Worst Case"
                complexity={algorithm.worstCase}
              />
            </div>
          </CardContent>
        </Card>
      </Container>

      <Container>
        <div className="flex justify-between px-6 mb-4">
          <h1 className="text-2xl font-semibold">Implementation</h1>
          <CodeViewer>
            <CodeBlock filename={algorithmName} codes={algorithm.codes} />
          </CodeViewer>
        </div>
      </Container>
    </div>
  );
};

function TimeComplexity({
  title,
  complexity,
}: {
  title: string;
  complexity: string;
}) {
  return (
    <p className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
      <span>{title}</span>
      <span className="flex h-px flex-1 bg-muted-foreground/50" />
      <span>{complexity}</span>
    </p>
  );
}

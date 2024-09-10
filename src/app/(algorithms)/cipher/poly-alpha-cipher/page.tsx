import { Container } from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlgorithmInfo } from '@/components/algorithm-info';

import { DecodingForm } from './decoding-form';
import { EncodingForm } from './encoding-form';

export default function PolyAlphaCipherPage() {
  return (
    <main>
      <AlgorithmInfo algorithmName="poly-alpha-cipher" />
      <Container className="pb-20">
        <Tabs defaultValue="encoding" className="min-w-80 w-full px-6">
          <TabsList className="flex w-full *:flex-1">
            <TabsTrigger value="encoding">Encoding</TabsTrigger>
            <TabsTrigger value="decoding">Decoding</TabsTrigger>
          </TabsList>
          <TabsContent value="encoding">
            <EncodingForm />
          </TabsContent>
          <TabsContent value="decoding">
            <DecodingForm />
          </TabsContent>
        </Tabs>
      </Container>
    </main>
  );
}

import { Container } from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlgorithmInfo } from '@/components/algorithm-info';

import { DecryptionForm } from './decryption-form';
import { EncryptionForm } from './encryption-form';

export default function VigenereCipherPage() {
  return (
    <main>
      <AlgorithmInfo algorithmName="playfair-cipher" />
      <Container className="pb-20">
        <Tabs defaultValue="encryption" className="min-w-80 w-full px-6">
          <TabsList className="flex w-full *:flex-1">
            <TabsTrigger value="encryption">Encryption</TabsTrigger>
            <TabsTrigger value="decryption">Decryption</TabsTrigger>
          </TabsList>
          <TabsContent value="encryption">
            <EncryptionForm />
          </TabsContent>
          <TabsContent value="decryption">
            <DecryptionForm />
          </TabsContent>
        </Tabs>
      </Container>
    </main>
  );
}

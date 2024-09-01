import { Container } from '@/components/ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DecryptionForm } from './decryption-form';
import { EncryptionForm } from './encryption-form';

export default async function CeasarCipherPage() {
  return (
    <main>
      <Container>
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

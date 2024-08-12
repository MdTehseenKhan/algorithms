import EncryptionForm from './encryption-form';
import { Container } from '@/components/ui/container';

export default function CeasarCipherPage() {
  return (
    <main>
      <Container>
        <div className="min-h-screen py-20">
          <EncryptionForm />
        </div>
      </Container>
    </main>
  );
}

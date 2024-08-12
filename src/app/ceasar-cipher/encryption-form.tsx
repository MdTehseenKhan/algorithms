'use client';

import { encrypt } from '@/algorithms/ceasar-cipher';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { LockIcon } from 'lucide-react';
import { useState } from 'react';

interface EncryptionFormProps {}

export default function EncryptionForm({}: EncryptionFormProps) {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const { toast } = useToast();

  const onMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (encryptedMessage) {
      setEncryptedMessage('');
    }
    setMessage(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const _encryptedMessage = encrypt(message, 3);
    setEncryptedMessage(_encryptedMessage);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Encryption</CardTitle>
        <CardDescription>
          Encrypt your message using the Caesar cipher
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="encrypt">Message</Label>
            <Input
              id="encrypt"
              placeholder="Enter message here"
              value={message}
              onChange={onMessageChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" onClick={onSubmit}>
            Encrypt
          </Button>
        </div>

        {encryptedMessage && (
          <Alert className="mt-4" variant="success">
            <LockIcon className="size-4" />
            <AlertTitle>Encrypted Message</AlertTitle>
            <AlertDescription>{encryptedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

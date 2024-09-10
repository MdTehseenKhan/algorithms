'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockOpenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/components/ui/form/form-input';

import { decryptWithPlayfairCipher } from '@/algorithms/cipher/playfair-cipher';
import {
  playfairCipherFormSchema,
  PlayfairCipherFormValues,
} from './validation';

export function DecryptionForm() {
  const form = useForm<PlayfairCipherFormValues>({
    resolver: zodResolver(playfairCipherFormSchema),
    defaultValues: {
      message: '',
      decryptedMessage: '',
      key: '',
    },
  });
  const decryptedMessage = form.watch('decryptedMessage');

  const handleClearDecryptedMessage = () => {
    if (decryptedMessage) {
      form.setValue('decryptedMessage', '');
    }
  };

  const onSubmit = (data: PlayfairCipherFormValues) => {
    try {
      const decryptedGrid = decryptWithPlayfairCipher(data.message, data.key);
      form.setValue('decryptedMessage', decryptedGrid);
    } catch (error) {
      toast.error('Invalid key, please try again!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Decryption</CardTitle>
        <CardDescription>
          Decode your message using the Playfair Cipher
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormInput
              form={form}
              fieldName="message"
              fieldLabel="Message"
              placeholder="Enter message here"
              onChange={handleClearDecryptedMessage}
              required
            />
            <FormInput
              form={form}
              fieldName="key"
              fieldLabel="Key"
              placeholder="Enter key here"
              onChange={handleClearDecryptedMessage}
              required
            />
            <Button type="submit" className="w-full">
              Decrypt
            </Button>
          </form>
        </Form>

        {decryptedMessage && (
          <Alert className="mt-4" variant="success">
            <LockOpenIcon className="size-4" />
            <AlertTitle>Decrypted Grid</AlertTitle>
            <AlertDescription>{decryptedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

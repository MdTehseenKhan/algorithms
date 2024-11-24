'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon } from 'lucide-react';
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

import { encryptWithPlayfairCipher } from '@/algorithms/cipher/playfair-cipher';
import {
  type PlayfairCipherFormValues,
  playfairCipherFormSchema,
} from './validation';

export function EncryptionForm() {
  const form = useForm<PlayfairCipherFormValues>({
    resolver: zodResolver(playfairCipherFormSchema),
    defaultValues: {
      message: '',
      encryptedMessage: '',
      key: '',
    },
  });
  const encryptedMessage = form.watch('encryptedMessage');

  const handleClearEncryptedMessage = () => {
    if (encryptedMessage) {
      form.setValue('encryptedMessage', '');
    }
  };

  const onSubmit = (data: PlayfairCipherFormValues) => {
    try {
      const encryptedGrid = encryptWithPlayfairCipher(data.message, data.key);
      form.setValue('encryptedMessage', encryptedGrid);
    } catch (error) {
      toast.error('Invalid key, please try again!');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Encryption</CardTitle>
        <CardDescription>
          Encode your message using the Playfair Cipher
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
              onChange={handleClearEncryptedMessage}
              required
            />
            <FormInput
              form={form}
              fieldName="key"
              fieldLabel="Key"
              placeholder="Enter key here"
              onChange={handleClearEncryptedMessage}
              required
            />
            <Button type="submit" className="w-full">
              Encrypt
            </Button>
          </form>
        </Form>

        {encryptedMessage && (
          <Alert className="mt-4" variant="success">
            <LockIcon className="size-4" />
            <AlertTitle>Encrypted Grid</AlertTitle>
            <AlertDescription>{encryptedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

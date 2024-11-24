'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockOpenIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

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

import { decryptWithCaesarCipher } from '@/algorithms/cipher/ceasar-cipher';
import { ceasarCipherFormSchema, type CeasarCipherFormValues } from './validation';

export function DecryptionForm() {
  const form = useForm<CeasarCipherFormValues>({
    resolver: zodResolver(ceasarCipherFormSchema),
    defaultValues: {
      message: '',
      decryptedMessage: '',
      shift: 3,
    },
  });
  const decryptedMessage = form.watch('decryptedMessage');

  const handleClearDecryptedMessage = () => {
    if (decryptedMessage) {
      form.setValue('decryptedMessage', '');
    }
  };

  const onSubmit = (data: CeasarCipherFormValues) => {
    const _decryptedMessage = decryptWithCaesarCipher(data.message, data.shift);
    form.setValue('decryptedMessage', _decryptedMessage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Decryption</CardTitle>
        <CardDescription>
          Decrypt your message using the Caesar cipher
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
              type="number"
              min={1}
              max={26}
              fieldName="shift"
              fieldLabel="Number of shifts"
              placeholder="Enter number of shifts here"
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
            <AlertTitle>Decrypted Message</AlertTitle>
            <AlertDescription>{decryptedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

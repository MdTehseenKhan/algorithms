'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon } from 'lucide-react';
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

import { encryptWithCaesarCipher } from '@/algorithms/cipher/ceasar-cipher';
import { toast } from 'sonner';
import {
  type CeasarCipherFormValues,
  ceasarCipherFormSchema,
} from './validation';

export function EncryptionForm() {
  const form = useForm<CeasarCipherFormValues>({
    resolver: zodResolver(ceasarCipherFormSchema),
    defaultValues: {
      message: '',
      encryptedMessage: '',
      shift: 3,
    },
  });
  const encryptedMessage = form.watch('encryptedMessage');

  const handleClearEncryptedMessage = () => {
    if (encryptedMessage) {
      form.setValue('encryptedMessage', '');
    }
  };

  const onSubmit = async (data: CeasarCipherFormValues) => {
    const _encryptedMessage = encryptWithCaesarCipher(data.message, data.shift);
    form.setValue('encryptedMessage', _encryptedMessage);
    try {
      await navigator.clipboard.writeText(_encryptedMessage);
      toast.success('Encrypted message copied to clipboard');
    } catch (error) {
      console.error('Error copying to clipboard', { error });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Encryption</CardTitle>
        <CardDescription>
          Encrypt your message using the Caesar cipher
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
              type="number"
              min={1}
              max={26}
              fieldName="shift"
              fieldLabel="Number of shifts"
              placeholder="Enter number of shifts here"
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
            <AlertTitle>Encrypted Message</AlertTitle>
            <AlertDescription>{encryptedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

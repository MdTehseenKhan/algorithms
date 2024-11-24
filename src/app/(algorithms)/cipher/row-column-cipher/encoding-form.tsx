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

import { encodeWithRowColumnCipher } from '@/algorithms/cipher/row-column-cipher';
import { toast } from 'sonner';
import {
  type RowColumnCipherFormValues,
  rowColumnCipherFormSchema,
} from './validation';

export function EncodingForm() {
  const form = useForm<RowColumnCipherFormValues>({
    resolver: zodResolver(rowColumnCipherFormSchema),
    defaultValues: {
      message: '',
      encodedMessage: '',
      key: undefined,
    },
  });
  const encodedMessage = form.watch('encodedMessage');

  const handleClearEncodedMessage = () => {
    if (encodedMessage) {
      form.setValue('encodedMessage', '');
    }
  };

  const onSubmit = async (data: RowColumnCipherFormValues) => {
    try {
      const _encodedMessage = encodeWithRowColumnCipher(data.message, data.key);
      form.setValue('encodedMessage', _encodedMessage);
      await navigator.clipboard.writeText(_encodedMessage);
      toast.success('Encoded message copied to clipboard');
    } catch (error) {
      toast.error('Error Encoding');
      console.error('Error Encoding', { error });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Encoding</CardTitle>
        <CardDescription>
          Encode your message using the Row Column cipher
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
              onChange={handleClearEncodedMessage}
              required
            />
            <FormInput
              form={form}
              type="number"
              fieldName="key"
              fieldLabel="Key"
              placeholder="Enter key here"
              onChange={handleClearEncodedMessage}
              required
            />
            <Button type="submit" className="w-full">
              Encode
            </Button>
          </form>
        </Form>

        {encodedMessage && (
          <Alert className="mt-4" variant="success">
            <LockIcon className="size-4" />
            <AlertTitle>Encoded Message</AlertTitle>
            <AlertDescription>{encodedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

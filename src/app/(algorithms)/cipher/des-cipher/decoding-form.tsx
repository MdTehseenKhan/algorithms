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

import { decodeWithDESCipher } from '@/algorithms/cipher/des-cipher';
import {
  type DesCipherFormValues,
  desCipherFormSchema,
} from './validation';

export function DecodingForm() {
  const form = useForm<DesCipherFormValues>({
    resolver: zodResolver(desCipherFormSchema),
    defaultValues: {
      message: '',
      decodedMessage: '',
      key: '',
    },
  });
  const decodedMessage = form.watch('decodedMessage');

  const handleClearDecodedMessage = () => {
    if (decodedMessage) {
      form.setValue('decodedMessage', '');
    }
  };

  const onSubmit = async (data: DesCipherFormValues) => {
    try {
      const _decodedMessage = decodeWithDESCipher(data.message, data.key);
      form.setValue('decodedMessage', _decodedMessage);
      await navigator.clipboard.writeText(_decodedMessage);
      toast.success('Decoded message copied to clipboard');
    } catch (error) {
      toast.error('Error Decoding');
      console.error('Error Decoding', { error });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Decoding</CardTitle>
        <CardDescription>
          Decode your message using the DES cipher
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
              onChange={handleClearDecodedMessage}
              required
            />
            <FormInput
              form={form}
              fieldName="key"
              fieldLabel="Key"
              placeholder="Enter key here"
              onChange={handleClearDecodedMessage}
              required
            />
            <Button type="submit" className="w-full">
              Decode
            </Button>
          </form>
        </Form>

        {decodedMessage && (
          <Alert className="mt-4" variant="success">
            <LockOpenIcon className="size-4" />
            <AlertTitle>Decoded Message</AlertTitle>
            <AlertDescription>{decodedMessage}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

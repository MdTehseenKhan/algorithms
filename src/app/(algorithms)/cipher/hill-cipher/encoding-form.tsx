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

import { encodeWithHillCipher } from '@/algorithms/cipher/hill-cipher';
import { toast } from 'sonner';
import { type HillCipherFormValues, hillCipherFormSchema } from './validation';

export function EncodingForm() {
  const form = useForm<HillCipherFormValues>({
    resolver: zodResolver(hillCipherFormSchema),
    defaultValues: {
      message: '',
      encodedMessage: '',
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    },
  });
  const encodedMessage = form.watch('encodedMessage');

  const handleClearEncodedMessage = () => {
    if (encodedMessage) {
      form.setValue('encodedMessage', '');
    }
  };

  const onSubmit = async ({ message, a, b, c, d }: HillCipherFormValues) => {
    try {
      const matrix = { a, b, c, d };
      const _encodedMessage = encodeWithHillCipher(message, matrix);
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
          Encode your message using the Hill cipher
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
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                form={form}
                type="number"
                fieldName="a"
                fieldLabel="A"
                placeholder="Enter A here"
                onChange={handleClearEncodedMessage}
                required
              />
              <FormInput
                form={form}
                type="number"
                fieldName="b"
                fieldLabel="B"
                placeholder="Enter B here"
                onChange={handleClearEncodedMessage}
                required
              />
              <FormInput
                form={form}
                type="number"
                fieldName="c"
                fieldLabel="C"
                placeholder="Enter C here"
                onChange={handleClearEncodedMessage}
                required
              />
              <FormInput
                form={form}
                type="number"
                fieldName="d"
                fieldLabel="D"
                placeholder="Enter D here"
                onChange={handleClearEncodedMessage}
                required
              />
            </div>
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

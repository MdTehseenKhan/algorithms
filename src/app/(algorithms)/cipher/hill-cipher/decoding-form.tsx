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

import { decodeWithHillCipher } from '@/algorithms/cipher/hill-cipher';
import { toast } from 'sonner';
import { type HillCipherFormValues, hillCipherFormSchema } from './validation';

export function DecodingForm() {
  const form = useForm<HillCipherFormValues>({
    resolver: zodResolver(hillCipherFormSchema),
    defaultValues: {
      message: '',
      decodedMessage: '',
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    },
  });
  const decodedMessage = form.watch('decodedMessage');

  const handleClearDecodedMessage = () => {
    if (decodedMessage) {
      form.setValue('decodedMessage', '');
    }
  };

  const onSubmit = async ({ message, a, b, c, d }: HillCipherFormValues) => {
    try {
      const matrix = { a, b, c, d };
      const _decodedMessage = decodeWithHillCipher(message, matrix);
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
          Decode your message using the Hill cipher
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
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                form={form}
                type="number"
                fieldName="a"
                fieldLabel="A"
                placeholder="Enter A here"
                onChange={handleClearDecodedMessage}
                required
              />
              <FormInput
                form={form}
                type="number"
                fieldName="b"
                fieldLabel="B"
                placeholder="Enter B here"
                onChange={handleClearDecodedMessage}
                required
              />
              <FormInput
                form={form}
                type="number"
                fieldName="c"
                fieldLabel="C"
                placeholder="Enter C here"
                onChange={handleClearDecodedMessage}
                required
              />
              <FormInput
                form={form}
                type="number"
                fieldName="d"
                fieldLabel="D"
                placeholder="Enter D here"
                onChange={handleClearDecodedMessage}
                required
              />
            </div>
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

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

import { encodeWithOtpCipher } from '@/algorithms/cipher/otp-cipher';
import {
  otpCipherEncodingFormSchema,
  type OtpCipherEncodingFormValues,
} from './validation';

export function EncodingForm() {
  const form = useForm<OtpCipherEncodingFormValues>({
    resolver: zodResolver(otpCipherEncodingFormSchema),
    defaultValues: {
      message: '',
      encodedMessage: '',
      key: '',
    },
  });
  const encodedMessage = form.watch('encodedMessage');

  const handleClearEncodedMessage = () => {
    if (encodedMessage) {
      form.setValue('encodedMessage', '');
    }
  };

  const onSubmit = (data: OtpCipherEncodingFormValues) => {
    const encodedData = encodeWithOtpCipher(data.message, data.key);
    form.setValue('encodedMessage', encodedData.ciphertext);
    form.setValue('key', encodedData.key);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Encoding</CardTitle>
        <CardDescription>
          Encode your message using the One-Time Pad cipher
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
              fieldName="key"
              fieldLabel="Key (optional)"
              placeholder="Enter key here"
              onChange={handleClearEncodedMessage}
            />
            <Button type="submit" className="w-full">
              Encode
            </Button>
          </form>
        </Form>

        {encodedMessage && (
          <>
            <Alert className="mt-4" variant="success">
              <LockIcon className="size-4" />
              <AlertTitle>Encoded Message</AlertTitle>
              <AlertDescription>{encodedMessage}</AlertDescription>
            </Alert>
            <Alert className="mt-4" variant="success">
              <LockIcon className="size-4" />
              <AlertTitle>Key</AlertTitle>
              <AlertDescription>{form.getValues('key')}</AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
}

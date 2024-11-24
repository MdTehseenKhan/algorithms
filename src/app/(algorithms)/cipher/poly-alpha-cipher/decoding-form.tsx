'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockOpenIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';

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

import { decodeWithPolyAlphaCipher } from '@/algorithms/cipher/poly-alpha-cipher';
import {
  type PolyAlphaCipherFormValues,
  polyAlphaCipherFormSchema,
} from './validation';

export function DecodingForm() {
  const form = useForm<PolyAlphaCipherFormValues>({
    resolver: zodResolver(polyAlphaCipherFormSchema),
    defaultValues: {
      message: '',
      decodedMessage: '',
      keys: [{ key: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'keys',
    control: form.control,
  });

  const decodedMessage = form.watch('decodedMessage');

  const handleClearDecodedMessage = () => {
    if (decodedMessage) {
      form.setValue('decodedMessage', '');
    }
  };

  const onSubmit = (data: PolyAlphaCipherFormValues) => {
    const keys = data.keys.map((key) => key.key);
    const _decodedMessage = decodeWithPolyAlphaCipher(data.message, keys);
    form.setValue('decodedMessage', _decodedMessage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Decoding</CardTitle>
        <CardDescription>
          Decode your message using the Poly-Alpha Cipher.
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

            {fields?.map((field, index) => (
              <div className="flex gap-2 items-end" key={field.id}>
                <FormInput
                  form={form}
                  fieldName={`keys.${index}.key`}
                  fieldLabel={`Key ${index + 1}`}
                  placeholder={`Enter key ${index + 1} here`}
                  onChange={handleClearDecodedMessage}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  disabled={fields?.length === 1}
                  onClick={() => remove(index)}
                  className="size-10 text-muted-foreground hover:text-foreground p-0"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            ))}

            {fields.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ key: '' })}
                className="w-fit"
              >
                <PlusIcon className="size-4 text-foreground mr-2" />
                <span>Add Key</span>
              </Button>
            )}

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

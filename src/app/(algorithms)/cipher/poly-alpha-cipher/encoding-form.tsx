'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon, PlusIcon, Trash2Icon } from 'lucide-react';
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

import { encodeWithPolyAlphaCipher } from '@/algorithms/cipher/poly-alpha-cipher';
import { toast } from 'sonner';
import {
  type PolyAlphaCipherFormValues,
  polyAlphaCipherFormSchema,
} from './validation';

export function EncodingForm() {
  const form = useForm<PolyAlphaCipherFormValues>({
    resolver: zodResolver(polyAlphaCipherFormSchema),
    defaultValues: {
      message: '',
      encodedMessage: '',
      keys: [{ key: '' }],
    },
  });
  const encodedMessage = form.watch('encodedMessage');

  const { fields, append, remove } = useFieldArray({
    name: 'keys',
    control: form.control,
  });

  const handleClearEncodedMessage = () => {
    if (encodedMessage) {
      form.setValue('encodedMessage', '');
    }
  };

  const onSubmit = async (data: PolyAlphaCipherFormValues) => {
    const keys = data.keys.map((key) => key.key);
    const _encodedMessage = encodeWithPolyAlphaCipher(data.message, keys);
    form.setValue('encodedMessage', _encodedMessage);
    try {
      await navigator.clipboard.writeText(_encodedMessage);
      toast.success('Encoded message copied to clipboard');
    } catch (error) {
      console.error('Error copying to clipboard', { error });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Encoding</CardTitle>
        <CardDescription>
          Encode your message using the Poly-Alpha cipher
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

            {fields?.map((field, index) => (
              <div className="flex gap-2 items-end" key={field.id}>
                <FormInput
                  form={form}
                  fieldName={`keys.${index}.key`}
                  fieldLabel={`Key ${index + 1}`}
                  placeholder={`Enter key ${index + 1} here`}
                  onChange={handleClearEncodedMessage}
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

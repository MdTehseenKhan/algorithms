'use client';

import type * as React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, type InputProps } from '@/components/ui/input';

export interface FormInputProps extends Omit<InputProps, 'form'> {
  // biome-ignore lint/suspicious/noExplicitAny: Dynamic form
  form: UseFormReturn<any>;
  fieldName: string;
  fieldLabel?: string;
  description?: React.ReactNode;
}

export const FormInput: React.FC<FormInputProps> = ({
  form,
  fieldName,
  fieldLabel,
  description,
  placeholder,
  onChange,
  ...props
}) => {
  return (
    <FormField
      name={fieldName}
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-full">
          {fieldLabel && <FormLabel>{fieldLabel}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              {...props}
              placeholder={placeholder ?? fieldLabel}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

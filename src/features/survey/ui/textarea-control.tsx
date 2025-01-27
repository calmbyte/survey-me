import React, {memo} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Textarea, TextareaInput} from '@/components/ui/textarea';

export const TextareaControl = memo(({name}: {name: string}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <Textarea size="md" className="w-full" isInvalid={!!errors[name]}>
          <TextareaInput
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            placeholder="Your text goes here..."
          />
        </Textarea>
      )}
    />
  );
});

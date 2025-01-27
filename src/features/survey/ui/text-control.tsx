import React from 'react';
import {Input, InputField} from '@/components/ui/input';
import {Controller, useFormContext} from 'react-hook-form';

export const TextControl = ({name}: {name: string}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}}) => (
        <Input variant="outline" size="md" isInvalid={!!errors[name]}>
          <InputField
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            placeholder="Enter Text here..."
          />
        </Input>
      )}
    />
  );
};

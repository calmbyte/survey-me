import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from '@/components/ui/radio';
import {CircleIcon} from 'lucide-react-native';

type Props = {
  options: string[];
  name: string;
};

export const RadioControl = ({name, options}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <RadioGroup
          value={value}
          onChange={onChange}
          isInvalid={!!errors[name]}>
          {options.map(o => (
            <Radio key={o} value={o} size="md">
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
              <RadioLabel>{o}</RadioLabel>
            </Radio>
          ))}
        </RadioGroup>
      )}
    />
  );
};

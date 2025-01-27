import React from 'react';
import {View} from 'react-native';

import {CheckboxQuestion as CQType} from '../types/question';
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from '@/components/ui/checkbox';
import {CheckIcon} from 'lucide-react-native';
import {useController, useFormContext} from 'react-hook-form';

type Props = {
  options: CQType['options'];
  name: string;
};

export const CheckboxControl = ({options, name}: Props) => {
  const {
    control,
    watch,
    formState: {errors},
  } = useFormContext();

  const selectedOptions = watch(name);

  const {
    field: {onChange},
  } = useController({
    name,
    control,
  });

  const handleChange = (checked: boolean, option: string) => {
    const optionsSet = new Set(selectedOptions);
    if (checked) {
      optionsSet.add(option);
    } else {
      optionsSet.delete(option);
    }
    onChange([...optionsSet.values()]);
  };

  return (
    <View>
      {options.map(o => (
        <Checkbox
          value={o}
          size="md"
          key={o}
          isInvalid={!!errors[name]}
          onChange={checked => {
            handleChange(checked, o);
          }}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>{o}</CheckboxLabel>
        </Checkbox>
      ))}
    </View>
  );
};

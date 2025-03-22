import React from 'react';
import {Text, View} from 'react-native';

import {Question as QType} from '@/src/types/question';

import {CheckboxControl} from './checkbox-control';
import {TextControl} from './text-control';
import {TextareaControl} from './textarea-control';
import {RadioControl} from './radio-control';

type Props = {
  question: QType;
};

export const Question = ({question}: Props) => {
  return (
    <View className="rounded-[8] border-2 border-black p-[8]">
      <Text>
        {question.description} {question.props.required && <Text>*</Text>}
      </Text>
      {question.type === 'checkbox' && (
        <CheckboxControl name={question.id} options={question.options} />
      )}
      {question.type === 'text' && <TextControl name={question.id} />}
      {question.type === 'textarea' && <TextareaControl name={question.id} />}
      {question.type === 'radio' && (
        <RadioControl name={question.id} options={question.options} />
      )}
    </View>
  );
};

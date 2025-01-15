import React from 'react';
import {Text, View} from 'react-native';

import {Question as QType} from '../types/question';
import {CheckboxControl} from './checkbox-question';
import {TextControl} from './text-control';
import {TextareaControl} from './textarea-control';
import {RadioControl} from './radio-control';

type Props = {
  question: QType;
};

export const Question = ({question}: Props) => {
  return (
    <View
      style={{
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        padding: 8,
      }}>
      <Text>Type: {question.type}</Text>
      <Text>===============</Text>
      <Text>{question.text}</Text>
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

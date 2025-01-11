import React from 'react';
import {Question as QuestionType} from '../types/question';
import {Text, View} from 'react-native';

type Props = {
  question: QuestionType;
};

export const Question = ({question}: Props) => {
  return (
    <View>
      <Text>{question.text}</Text>
    </View>
  );
};

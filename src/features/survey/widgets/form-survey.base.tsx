import React from 'react';
import {View} from 'react-native';
import {useForm} from 'react-hook-form';
import {useFormContext} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {array, object, Schema, string, StringSchema, ArraySchema} from 'yup';

import {Button, ButtonText} from '@/components/ui/button';
import {setActiveScreen} from '@/src/state/app';

import {Question} from '../ui/question';
import {FormSurvey} from '../types/survey';
import {Question as QuestionType} from '../types/question';

export type Props = {
  survey: FormSurvey;
};

export const renderItem = ({item}: {item: QuestionType}) => {
  return <Question question={item} />;
};

export const ItemSeparator = () => <View className="h-[24]" />;

export const keyExtractor = (item: QuestionType) => item.id;

export const ListFooter = () => {
  const {handleSubmit} = useFormContext();

  const handleSubmitCb = (data: Record<string, string | string[]>) => {
    console.log(data);
    setActiveScreen('submission');
  };

  return (
    <View className="mt-6">
      <Button
        onPress={handleSubmit(handleSubmitCb)}
        size="md"
        variant="solid"
        action="primary">
        <ButtonText>Submit</ButtonText>
      </Button>
    </View>
  );
};

export const createValidationSchema = (questions: QuestionType[]) => {
  const schema: Record<string, Schema> = {};

  for (const q of questions) {
    switch (q.type) {
      case 'text':
      case 'textarea':
        schema[q.id] = string();
        if (q.props.maxLength) {
          schema[q.id] = (schema[q.id] as StringSchema).max(q.props.maxLength);
        }
        break;
      case 'radio':
        schema[q.id] = string();
        break;
      case 'checkbox':
        schema[q.id] = array();
        break;
      default:
        break;
    }

    if (q.props.required) {
      switch (q.type) {
        case 'checkbox':
          schema[q.id] = (schema[q.id] as ArraySchema<string[], Schema>).min(
            1,
            'Select at least one option',
          );
          break;
        default:
          schema[q.id] = schema[q.id].required('This field is required');
          break;
      }
    }
  }

  return object().shape(schema);
};

export const useSurveyForm = (survey: FormSurvey) => {
  const methods = useForm({
    defaultValues: survey.questions.reduce((acc, question) => {
      switch (question.type) {
        case 'textarea':
        case 'text':
        case 'radio':
          acc[question.id] = '';
          break;
        case 'checkbox':
          acc[question.id] = [];
          break;
        default:
          break;
      }
      return acc;
    }, {} as Record<string, string | []>),
    resolver: yupResolver(createValidationSchema(survey.questions)),
  });

  return methods;
};

import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import {array, ArraySchema, object, Schema, string, StringSchema} from 'yup';

import {Survey as SurveyType} from '../types/survey';
import {Question} from '../types/question';
import {FormSurvey} from './form-survey';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    marginTop: 12,
    marginBottom: 12,
  },
});

type Props = {survey: SurveyType; onSubmit: () => void};

const createValidationSchema = (questions: Question[]) => {
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

const useSurveyForm = (survey: SurveyType) => {
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

export const Survey = ({survey, onSubmit}: Props) => {
  const methods = useSurveyForm(survey);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{survey.title}</Text>
      <FormProvider {...methods}>
        {survey.type === 'form' && (
          <FormSurvey onSubmit={onSubmit} questions={survey.questions} />
        )}
      </FormProvider>
    </SafeAreaView>
  );
};

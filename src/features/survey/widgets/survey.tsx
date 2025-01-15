import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Survey as SurveyType} from '../types/survey';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FormSurvey} from './form-survey';
import {FormProvider, useForm} from 'react-hook-form';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    marginTop: 12,
  },
});

type Props = {survey: SurveyType};

export const Survey = ({survey}: Props) => {
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
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{survey.title}</Text>
      <FormProvider {...methods}>
        {survey.type === 'form' && <FormSurvey questions={survey.questions} />}
      </FormProvider>
    </SafeAreaView>
  );
};

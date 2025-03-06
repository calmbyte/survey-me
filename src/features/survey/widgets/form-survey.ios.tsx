import React from 'react';
import {FormProvider} from 'react-hook-form';
import {FlatList, KeyboardAvoidingView} from 'react-native';

import {
  ItemSeparator,
  keyExtractor,
  ListFooter,
  Props,
  renderItem,
  useSurveyForm,
} from './form-survey.base';

export const FormSurvey = ({survey}: Props) => {
  const methods = useSurveyForm(survey);

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <FlatList
          data={survey.questions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={<ListFooter />}
        />
      </KeyboardAvoidingView>
    </FormProvider>
  );
};

import React, {useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import {FormProvider} from 'react-hook-form';

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

  useEffect(() => {
    Alert.alert('Welcome', 'Please fill out the survey');
  }, []);

  return (
    <FormProvider {...methods}>
      <FlatList
        data={survey.questions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={<ListFooter />}
      />
    </FormProvider>
  );
};

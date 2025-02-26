import React, {useEffect} from 'react';
import {Alert, FlatList} from 'react-native';

import {
  ItemSeparator,
  keyExtractor,
  ListFooter,
  Props,
  renderItem,
} from './form-survey.base';

export const FormSurvey = ({questions, onSubmit}: Props) => {
  useEffect(() => {
    Alert.alert('Welcome', 'Please fill out the survey');
  }, []);

  return (
    <FlatList
      data={questions}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparator}
      ListFooterComponent={<ListFooter onSubmit={onSubmit} />}
    />
  );
};

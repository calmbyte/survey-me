import React from 'react';
import {FlatList, KeyboardAvoidingView} from 'react-native';

import {
  ItemSeparator,
  keyExtractor,
  ListFooter,
  Props,
  renderItem,
} from './form-survey.base';

export const FormSurvey = ({questions, onSubmit}: Props) => {
  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={<ListFooter onSubmit={onSubmit} />}
      />
    </KeyboardAvoidingView>
  );
};

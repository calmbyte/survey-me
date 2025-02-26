import React from 'react';
import {View} from 'react-native';

import {Question as QuestionType} from '../types/question';
import {Question} from '../ui/question';
import {Button, ButtonText} from '@/components/ui/button';
import {useFormContext} from 'react-hook-form';

export type Props = {
  questions: QuestionType[];
  onSubmit: () => void;
};

export const renderItem = ({item}: {item: QuestionType}) => {
  return <Question question={item} />;
};

export const ItemSeparator = () => <View className="h-[24]" />;

export const keyExtractor = (item: QuestionType) => item.id;

export const ListFooter = ({onSubmit}: {onSubmit: () => void}) => {
  const {handleSubmit} = useFormContext();

  const handleSubmitCb = (data: Record<string, string | string[]>) => {
    console.log(data);
    onSubmit();
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

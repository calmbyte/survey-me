import React from 'react';
import {View} from 'react-native';

import {Question as QuestionType} from '../types/question';
import {Question} from '../ui/question';
import {Button, ButtonText} from '@/components/ui/button';
import {useFormContext} from 'react-hook-form';

export type Props = {
  questions: QuestionType[];
};

export const renderItem = ({item}: {item: QuestionType}) => {
  return <Question question={item} />;
};

export const ItemSeparator = () => <View className="h-[24]" />;

export const keyExtractor = (item: QuestionType) => item.id;

export const ListFooter = () => {
  const {handleSubmit} = useFormContext();

  const onSubmit = (data: Record<string, string | string[]>) => {
    console.log(data);
  };

  return (
    <View className="mt-6">
      <Button
        onPress={handleSubmit(onSubmit)}
        size="md"
        variant="solid"
        action="primary">
        <ButtonText>Submit</ButtonText>
      </Button>
    </View>
  );
};

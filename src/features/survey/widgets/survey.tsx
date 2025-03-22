import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Survey as SurveyType} from '../../../types/types/survey';
import {FormSurvey} from './form-survey';

type Props = {survey: SurveyType};

export const Survey = ({survey}: Props) => {
  return (
    <SafeAreaView className="flex-1 px-6">
      <Text className="text-[32px] mb-16">{survey.title}</Text>

      {/* TODO: implement other survey types */}
      {survey.type === 'form' && <FormSurvey survey={survey} />}
    </SafeAreaView>
  );
};

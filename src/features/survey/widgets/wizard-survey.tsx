import {FormProvider} from 'react-hook-form';
import {FlatList, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {WizardSurvey as WizardSurveyType} from '@/src/types/survey';
import {setActiveScreen} from '@/src/state/app';

import {useWizardSteps} from '../hooks/useWizardSteps';
import {WizardFooter} from '../ui/wizard-footer';
import {
  ItemSeparator,
  keyExtractor,
  renderItem,
  useSurveyForm,
} from './survey.base';
import {createSurveyResult} from '@/src/services/api/survey';

type Props = {
  survey: WizardSurveyType;
};

export const WizardSurvey = ({survey}: Props) => {
  const {nextStep, previousStep, isFirstStep, isLastStep, currentStep} =
    useWizardSteps(survey.question_groups.length);

  const currentQuestionGroup = survey.question_groups[currentStep];

  const methods = useSurveyForm(currentQuestionGroup.questions);

  const [form, setForm] = useState<Record<string, string | string[]>>({});

  const handleNext = useCallback(() => {
    methods.handleSubmit(data => {
      setForm({...form, ...data});
      nextStep();
    })();
  }, [methods, nextStep, form]);

  const handleSubmit = useCallback(() => {
    methods.handleSubmit(async data => {
      const mergedForm = {...form, ...data};
      const payload = Object.entries(mergedForm).map(
        ([questionId, answer]) => ({
          questionId,
          answer,
        }),
      );
      // TODO: error handling
      await createSurveyResult(survey.id, payload);
      setActiveScreen('submission');
    })();
  }, [methods, form, survey.id]);

  return (
    <FormProvider {...methods}>
      <View className="flex-1">
        <View className="flex-1">
          <Text>{currentQuestionGroup.title}</Text>
          <FlatList
            data={currentQuestionGroup.questions}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
        <WizardFooter
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNextStep={handleNext}
          onPreviousStep={previousStep}
          onSubmit={handleSubmit}
        />
      </View>
    </FormProvider>
  );
};

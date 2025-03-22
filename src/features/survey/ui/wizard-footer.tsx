import React from 'react';
import {View} from 'react-native';

import {Button, ButtonText} from '@/components/ui/button';

type Props = {
  isFirstStep: boolean;
  isLastStep: boolean;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onSubmit: () => void;
};

export const WizardFooter = ({
  isFirstStep,
  isLastStep,
  onNextStep,
  onPreviousStep,
  onSubmit,
}: Props) => {
  return (
    <View className="flex-row justify-between">
      {!isFirstStep && (
        <Button onPress={onPreviousStep} className="mr-auto">
          <ButtonText>Previous</ButtonText>
        </Button>
      )}
      {!isLastStep ? (
        <Button onPress={onNextStep} className="ml-auto">
          <ButtonText>Next</ButtonText>
        </Button>
      ) : (
        <Button className="ml-auto" onPress={onSubmit}>
          <ButtonText>Submit</ButtonText>
        </Button>
      )}
    </View>
  );
};

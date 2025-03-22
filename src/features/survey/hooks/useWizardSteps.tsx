import {useState} from 'react';

export const useWizardSteps = (stepsCount: number) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < stepsCount - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return {
    currentStep,
    nextStep,
    previousStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === stepsCount - 1,
  };
};

import {setActiveScreen} from '../state/app';

export const useAppNavigation = () => {
  const openCamera = () => {
    setActiveScreen('camera');
  };

  const openWelcome = () => {
    setActiveScreen('welcome');
  };

  const openSurvey = () => {
    setActiveScreen('survey');
  };

  const openSubmission = () => {
    setActiveScreen('submission');
  };

  return {
    openCamera,
    openWelcome,
    openSurvey,
    openSubmission,
  };
};

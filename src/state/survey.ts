import {create} from 'zustand';

import {Survey} from '@/src/types/survey';

import {createSelectors} from './createSelectors';

interface SurveyState {
  surveyPublicId: string;
  survey: Survey | null;
}

const surveyStore = create<SurveyState>(() => ({
  surveyPublicId: '',
  survey: null,
}));

export const useSurveyStore = createSelectors(surveyStore);

export const setSurveyPublicId = (surveyPublicId: string) => {
  surveyStore.setState({surveyPublicId});
};

export const setSurvey = (survey: Survey) => {
  surveyStore.setState({survey});
};

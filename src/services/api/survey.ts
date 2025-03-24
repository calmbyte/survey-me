import {API_URL} from '@env';

import {Survey} from '@/src/types/survey';
import {Answer} from '@/src/types/answer';

export const getSurveyByCode = async (code: string): Promise<Survey> => {
  const response = await fetch(`${API_URL}/surveys/public/${code}`);
  return response.json();
};

export const createSurveyResult = async (
  surveyId: string,
  answers: Answer[],
) => {
  const response = await fetch(`${API_URL}/surveys/${surveyId}/results`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({answers}),
  });
  return response.json();
};

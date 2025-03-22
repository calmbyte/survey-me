import {API_URL} from '@env';

import {Survey} from '@/src/types/survey';

export const getSurveyByCode = async (code: string): Promise<Survey> => {
  const response = await fetch(`${API_URL}/surveys/public/${code}`);
  return response.json();
};

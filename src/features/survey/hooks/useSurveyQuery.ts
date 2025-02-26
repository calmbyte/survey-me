import {useCallback, useState} from 'react';
import {Survey as SurveyType} from '../types/survey';

const surveyMock: SurveyType = {
  id: '1',
  title: 'Survey #1',
  description: 'This is a survey',
  type: 'form',
  questions: [
    {
      id: 'color',
      text: 'Select colors with blue shade',
      type: 'checkbox',
      options: ['Green', 'Cyan', 'Lightblue'],
      props: {
        required: true,
      },
    },
    {
      id: 'name',
      text: 'What is your name?',
      type: 'text',
      props: {
        required: true,
        maxLength: 50,
      },
    },
    {
      id: 'hobbies',
      text: 'Please let us know about your hobbies',
      type: 'textarea',
      props: {
        required: true,
        maxLength: 50,
      },
    },
    {
      id: 'gender',
      text: 'Gender',
      type: 'radio',
      options: ['Male', 'Female', 'Other'],
      props: {
        required: true,
      },
    },
  ],
};

const w8 = (t: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(surveyMock);
    }, t);
  });

export const useSurveyQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SurveyType | null>(null);

  const fetchSurvey = useCallback(async () => {
    setLoading(true);
    try {
      // const response = await fetch('https://api.example.com/survey', {
      //   headers: {'Content-Type': 'application/json'},
      // });
      // const json = await response.json();
      // setData(json);
      await w8(1000);
      setData(surveyMock);
    } catch (e) {
      setError((e as {message: string}).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {loading, error, data, fetchSurvey};
};

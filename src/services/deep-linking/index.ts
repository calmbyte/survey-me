import {Linking} from 'react-native';
import {setActiveScreen} from '@/src/state/app';
import {setSurveyPublicId, setSurvey} from '@/src/state/survey';
import {getSurveyByCode} from '@/src/services/api/survey';

const PREFIX = 'surveyme://';

export const configureDeepLinking = () => {
  // Handle deep links when app is already running
  Linking.addEventListener('url', handleDeepLink);

  // Handle deep links when app is opened from a link
  Linking.getInitialURL().then(url => {
    if (url) {
      handleDeepLink({url});
    }
  });
};

const handleDeepLink = async ({url}: {url: string}) => {
  try {
    // Remove the prefix to get the path
    const path = url.replace(PREFIX, '');
    const pathSegments = path.split('?')[0].split('/');

    // Handle different deep link paths
    switch (pathSegments[0]) {
      case 'survey':
        if (pathSegments[1]) {
          const surveyCode = pathSegments[1];
          setSurveyPublicId(surveyCode);

          // Fetch survey data
          const survey = await getSurveyByCode(surveyCode);
          if (survey) {
            setSurvey(survey);
            setActiveScreen('survey');
          }
        }
        break;
      default:
        setActiveScreen('welcome');
    }
  } catch (error) {
    console.error('Error handling deep link:', error);
    setActiveScreen('welcome');
  }
};

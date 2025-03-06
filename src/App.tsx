import '../global.css';

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';

import {useAppStore} from './state/app';
import {useAppNavigation} from './hooks/useAppNavigation';

import {CameraScreen} from './features/camera/screen';
import {SurveyScreen} from './features/survey/screen';
import {WelcomeScreen} from './features/welcome/screen';
import {SubmissionScreen} from './features/submission/screen';

function App(): React.JSX.Element {
  const activeScreen = useAppStore.use.activeScreen();

  const {openCamera, openWelcome, openSurvey, openSubmission} =
    useAppNavigation();

  return (
    <GluestackUIProvider>
      <SafeAreaProvider>
        <CameraScreen
          isVisible={activeScreen === 'camera'}
          onClose={openWelcome}
        />
        <WelcomeScreen
          onOpenSurvey={openSurvey}
          isVisible={activeScreen === 'welcome'}
          onOpenCamera={openCamera}
        />
        <SurveyScreen
          isVisible={activeScreen === 'survey'}
          onOpenSubmission={openSubmission}
        />
        <SubmissionScreen
          isVisible={activeScreen === 'submission'}
          onOpenWelcome={openWelcome}
        />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

export default App;

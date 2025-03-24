import '../global.css';

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';

import {useAppStore} from './state/app';
import {configureDeepLinking} from './services/deep-linking';

import {CameraScreen} from './features/camera/screen';
import {SurveyScreen} from './features/survey/screen';
import {WelcomeScreen} from './features/welcome/screen';
import {SubmissionScreen} from './features/submission/screen';

function App(): React.JSX.Element {
  const activeScreen = useAppStore.use.activeScreen();

  useEffect(() => {
    configureDeepLinking();
  }, []);

  return (
    <GluestackUIProvider>
      <SafeAreaProvider>
        <WelcomeScreen isVisible={activeScreen === 'welcome'} />
        <CameraScreen isVisible={activeScreen === 'camera'} />
        <SurveyScreen isVisible={activeScreen === 'survey'} />
        <SubmissionScreen isVisible={activeScreen === 'submission'} />
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

export default App;

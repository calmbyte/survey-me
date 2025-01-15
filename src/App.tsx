/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '../global.css';

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Screen as CameraScreen} from './features/camera/screen';
import {Screen as WelcomeScreen} from './features/welcome/screen';
import {Screen as SurveyScreen} from './features/survey/screen';
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider';

type Screen = 'camera' | 'survey' | 'welcome';

function App(): React.JSX.Element {
  const openCamera = () => {
    setActiveScreen('camera');
  };

  const openWelcome = () => {
    setActiveScreen('welcome');
  };

  const openSurvey = () => {
    setActiveScreen('survey');
  };

  const [activeScreen, setActiveScreen] = useState<Screen>('welcome');

  return (
    <GluestackUIProvider>
      <SafeAreaProvider>
        <View style={styles.container}>
          <CameraScreen
            isVisible={activeScreen === 'camera'}
            onClose={openWelcome}
          />
          <WelcomeScreen
            onOpenSurvey={openSurvey}
            isVisible={activeScreen === 'welcome'}
            onOpenCamera={openCamera}
          />
          <SurveyScreen isVisible={activeScreen === 'survey'} />
        </View>
      </SafeAreaProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});

export default App;

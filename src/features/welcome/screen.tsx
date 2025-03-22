import React, {useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useCheckCameraPermission} from '../../services/permissions/hooks/useCheckCameraPermission';
import {Camera} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setActiveScreen} from '@/src/state/app';
import {setSurveyPublicId, useSurveyStore} from '@/src/state/survey';
import {setSurvey} from '@/src/state/survey';
import {Button, ButtonText} from '@/components/ui/button';
import {getSurveyByCode} from '@/src/services/api/survey';

type Props = {
  isVisible: boolean;
};

export const WelcomeScreen = ({isVisible}: Props) => {
  const opacity = useSharedValue(0);
  const {top} = useSafeAreaInsets();

  const {isCameraPermissionGranted} = useCheckCameraPermission();
  const surveyPublicId = useSurveyStore.use.surveyPublicId();

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [isVisible, opacity]);

  const handleOpenCamera = () => {
    setActiveScreen('camera');
  };

  // TMP
  const handleGetSurveyByCode = async () => {
    const survey = await getSurveyByCode(
      '972fb085-a050-4fa8-aa39-9cff12ca889c',
    );
    setSurvey(survey);
    setActiveScreen('survey');
  };

  return (
    <Animated.View
      className={`flex-1 items-center ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity,
      }}>
      <Text className="text-[32px] mb-16" style={{marginTop: top + 100}}>
        Welcome to SurveyMe
      </Text>
      <View className="items-center self-center gap-4 ">
        <View className="items-center gap-4 border border-red-500 p-3">
          <Text>This section is tmp</Text>
          <Text className="text-2xl">Insert survey code</Text>
          <TextInput
            placeholder="FE3BC12P"
            placeholderTextColor={'#ccc'}
            className="rounded-xl bg-[#FFFAEC] text-[#31363F] border border-[#31363F] w-[180px] py-3 px-4 text-2xl uppercase"
            onChangeText={setSurveyPublicId}
            value={surveyPublicId}
          />
          <Button onPress={handleGetSurveyByCode}>
            <ButtonText>TMP get survey code</ButtonText>
          </Button>
          <Text className="text-2xl">Or</Text>
        </View>
        <Button
          size="lg"
          onPress={handleOpenCamera}
          disabled={!isCameraPermissionGranted}>
          <Camera color="#FFFAEC" />
          <ButtonText>Scan QR</ButtonText>
        </Button>
      </View>
    </Animated.View>
  );
};

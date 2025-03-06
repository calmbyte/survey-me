import React, {useEffect, useState} from 'react';
import {Text, Pressable, TextInput, View, Keyboard} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useCheckCameraPermission} from '../../services/permissions/hooks/useCheckCameraPermission';
import {Camera} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  isVisible: boolean;
  onOpenCamera: () => void;
  onOpenSurvey: () => void;
};

export const WelcomeScreen = ({
  isVisible,
  onOpenCamera,
  onOpenSurvey,
}: Props) => {
  const opacity = useSharedValue(0);
  const {top} = useSafeAreaInsets();
  const {isCameraPermissionGranted} = useCheckCameraPermission();

  const [code, setCode] = useState('');

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

  useEffect(() => {
    if (code.length > 7) {
      onOpenSurvey();
      setCode('');
      Keyboard.dismiss();
    }
  }, [code, onOpenSurvey]);

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
      <View className="items-center self-center gap-4">
        <Text className="text-2xl">Insert survey code</Text>
        <TextInput
          placeholder="FE3BC12P"
          placeholderTextColor={'#ccc'}
          className="rounded-xl bg-[#FFFAEC] text-[#31363F] border border-[#31363F] w-[180px] py-3 px-4 text-2xl uppercase"
          onChangeText={setCode}
          value={code}
        />
        <Text className="text-2xl">Or</Text>
        <Pressable
          disabled={!isCameraPermissionGranted}
          className="flex-row items-center justify-center bg-[#31363F] py-3 px-[18px] rounded-xl gap-3"
          onPress={onOpenCamera}>
          <Camera color="#FFFAEC" />
          <Text className="text-[#FFFAEC] text-xl">Scan QR</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

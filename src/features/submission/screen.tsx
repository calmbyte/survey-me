import {Button, ButtonText} from '@/components/ui/button';
import {setActiveScreen} from '@/src/state/app';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  Easing,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  isVisible: boolean;
};

export const SubmissionScreen = ({isVisible}: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 600,
        easing: Easing.inOut(Easing.cubic),
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 600,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isVisible, opacity]);

  const handleOpenWelcome = () => {
    setActiveScreen('welcome');
  };

  return (
    <Animated.View
      className={`absolute inset-0 ${
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity,
      }}>
      <View className="flex-1 items-center justify-center">
        <Text>Thanks for your submission!</Text>
        <Text>We will get back to you soon.</Text>
        <Button className="mt-4" onPress={handleOpenWelcome}>
          <ButtonText>Go back</ButtonText>
        </Button>
      </View>
    </Animated.View>
  );
};

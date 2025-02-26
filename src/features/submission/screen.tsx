import {Button, ButtonText} from '@/components/ui/button';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useSharedValue,
  Easing,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  isVisible: boolean;
  onOpenWelcome: () => void;
};

export const SubmissionScreen = ({isVisible, onOpenWelcome}: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [isVisible, opacity]);

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          opacity,
          pointerEvents: isVisible ? 'auto' : 'none',
        },
      ]}>
      <View className="flex-1 items-center justify-center">
        <Text>Thanks for your submission!</Text>
        <Text>We will get back to you soon.</Text>
        <Button className="mt-4" onPress={onOpenWelcome}>
          <ButtonText>Go back</ButtonText>
        </Button>
      </View>
    </Animated.View>
  );
};

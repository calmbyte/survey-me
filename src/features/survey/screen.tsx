import React, {memo, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {Survey} from './widgets/survey';
import {useSurveyStore} from '@/src/state/survey';
type Props = {
  isVisible: boolean;
};

export const SurveyScreen = memo(({isVisible}: Props) => {
  const opacity = useSharedValue(0);

  const survey = useSurveyStore.use.survey();

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 500,
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
      <View className="flex-1">
        {!survey && (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#31363F" />
          </View>
        )}
        {survey && <Survey survey={survey} />}
      </View>
    </Animated.View>
  );
});

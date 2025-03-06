import React, {memo, useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Survey} from './widgets/survey';
import {useSurveyQuery} from './hooks/useSurveyQuery';

type Props = {
  isVisible: boolean;
  onOpenSubmission: () => void;
};

export const SurveyScreen = memo(({isVisible, onOpenSubmission}: Props) => {
  const opacity = useSharedValue(0);

  const {data, loading, error, fetchSurvey} = useSurveyQuery();

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.cubic),
      });
      fetchSurvey();
    } else {
      opacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [fetchSurvey, isVisible, opacity]);

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
        {loading && !data && (
          <View className="items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#31363F" />
          </View>
        )}
        {error && (
          <View className="items-center justify-center flex-1">
            <Text>Error {error}</Text>
          </View>
        )}
        {data && <Survey survey={data} onSubmit={onOpenSubmission} />}
      </View>
    </Animated.View>
  );
});

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Survey} from './types/survey';

type Props = {
  isVisible: boolean;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
  },
});

const surveyMock: Survey = {
  id: '1',
  title: 'Survey',
  description: 'This is a survey',
  type: 'form',
  questions: [
    {
      id: '1',
      text: 'What is your name?',
      type: 'radio',
      options: ['John', 'Doe'],
      props: {
        required: true,
      },
    },
    {
      id: '2',
      text: 'What is your favorite color',
      type: 'text',
      props: {
        required: true,
        maxLength: 3,
      },
    },
  ],
};

export const Screen = ({isVisible}: Props) => {
  const opacity = useSharedValue(0);

  const [survey, setSurvey] = useState<Survey>();

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setSurvey(surveyMock);
      }, 500);
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
      <View style={styles.container}>
        {survey ? (
          <Text style={styles.title}>Welcome to Survey App</Text>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="#31363F" />
          </View>
        )}
      </View>
    </Animated.View>
  );
};

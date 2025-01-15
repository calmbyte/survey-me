import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Survey as SurveyType} from './types/survey';
import {Survey} from './widgets/survey';

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

const surveyMock: SurveyType = {
  id: '1',
  title: 'Survey #1',
  description: 'This is a survey',
  type: 'form',
  questions: [
    {
      id: 'color',
      text: 'Select colors with blue shade',
      type: 'checkbox',
      options: ['Green', 'Cyan', 'Lightblue'],
      props: {
        required: true,
      },
    },
    {
      id: 'name',
      text: 'What is your name?',
      type: 'text',
      props: {
        required: true,
        maxLength: 50,
      },
    },
    {
      id: 'hobbies',
      text: 'Please let us know about your hobbies',
      type: 'textarea',
      props: {
        required: true,
        maxLength: 50,
      },
    },
    {
      id: 'gender',
      text: 'Gender',
      type: 'radio',
      options: ['Male', 'Female', 'Other'],
      props: {
        required: true,
      },
    },
  ],
};

export const Screen = ({isVisible}: Props) => {
  const opacity = useSharedValue(0);

  const [survey, setSurvey] = useState<SurveyType>();

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
          <Survey survey={survey} />
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

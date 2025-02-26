import React, {useEffect, useState} from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useCheckCameraPermission} from '../../services/permissions/hooks/useCheckCameraPermission';
import {Camera} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 64,
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    gap: 16,
  },
  text: {
    fontSize: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#31363F',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    color: '#FFFAEC',
    fontSize: 20,
  },
  input: {
    borderRadius: 12,
    backgroundColor: '#FFFAEC',
    color: '#31363F',
    borderWidth: 1,
    borderColor: '#31363F',
    width: 180,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 24,
    textTransform: 'uppercase',
  },
});

type Props = {
  isVisible: boolean;
  onOpenCamera: () => void;
  onOpenSurvey: () => void;
};

export const Screen = ({isVisible, onOpenCamera, onOpenSurvey}: Props) => {
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
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {opacity, pointerEvents: isVisible ? 'auto' : 'none'},
      ]}>
      <Text style={[styles.title, {marginTop: top + 100}]}>
        Welcome to SurveyMe
      </Text>
      <View style={styles.content}>
        <Text style={styles.text}>Insert survey code</Text>
        <TextInput
          placeholder="FE3BC12P"
          placeholderTextColor={'#ccc'}
          style={styles.input}
          onChangeText={setCode}
          value={code}
        />
        <Text style={styles.text}>Or</Text>
        <Pressable
          disabled={!isCameraPermissionGranted}
          style={styles.button}
          onPress={onOpenCamera}>
          <Camera color="#FFFAEC" />
          <Text style={styles.buttonText}>Scan QR</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

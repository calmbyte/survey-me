import {
  Commands,
  ReactNativeScannerView,
} from '@pushpendersingh/react-native-scanner';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {X, Zap, ZapOff} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const overlaySize = 10;
const height = Dimensions.get('window').height;

const scaleValue = (height / overlaySize) * 2.25;

const styles = StyleSheet.create({
  overlay: {
    width: overlaySize,
    height: overlaySize,
    borderRadius: 50,
    backgroundColor: 'black',
    position: 'absolute',
    right: -overlaySize,
    bottom: -overlaySize,
    pointerEvents: 'none',
    transformOrigin: 'center center',
  },
  controlBtnContainer: {
    zIndex: 2,
    position: 'absolute',
    left: 16,
  },
  controlBtn: {
    width: 60,
    height: 60,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#333',
  },
  scanner: {
    zIndex: 2,
    flex: 1,
  },
});

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const Screen = ({isVisible, onClose}: Props) => {
  const {top} = useSafeAreaInsets();
  const scannerRef = useRef(null);
  const scale = useSharedValue(1);
  const [animationState, setAnimationState] = useState<
    'idle' | 'in-progress' | 'finished'
  >('idle');

  const [isFlashlightEnabled, setIsFlashlightEnabled] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scale.value,
      [scaleValue * 0.85, scaleValue],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  useEffect(() => {
    if (isVisible) {
      setAnimationState('in-progress');
      scale.value = withTiming(
        scaleValue,
        {
          duration: 800,
          easing: Easing.out(Easing.cubic),
        },
        () => {
          runOnJS(setAnimationState)('finished');
        },
      );
    }
  }, [isVisible, scale]);

  const handleClose = () => {
    onClose();
    setAnimationState('in-progress');
    scale.value = withTiming(
      1,
      {
        duration: 500,
        easing: Easing.in(Easing.cubic),
      },
      () => {
        runOnJS(setAnimationState)('idle');
      },
    );
  };

  const toggleFlashlight = () => {
    if (isFlashlightEnabled) {
      disableFlashlight();
    } else {
      enableFlashlight();
    }
    setIsFlashlightEnabled(prev => !prev);
  };

  const enableFlashlight = () => {
    if (scannerRef?.current) {
      Commands.enableFlashlight(scannerRef.current);
    }
  };

  const disableFlashlight = () => {
    if (scannerRef?.current) {
      Commands.disableFlashlight(scannerRef.current);
    }
  };

  return (
    <>
      <View
        style={[
          StyleSheet.absoluteFill,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            pointerEvents: isVisible ? 'auto' : 'none',
          },
        ]}>
        <Animated.View
          style={[
            {
              transform: [{scale}],
            },
            styles.overlay,
          ]}
        />
        {animationState === 'finished' && (
          <ReactNativeScannerView
            ref={scannerRef}
            style={styles.scanner}
            onQrScanned={(...args) => {
              console.log(args);
            }}
            pauseAfterCapture
            isActive
            showBox
          />
        )}
        <Animated.View
          style={[styles.controlBtnContainer, animatedStyle, {top: 16 + top}]}>
          <Pressable onPress={handleClose} style={styles.controlBtn}>
            <X size={38} color="#333" />
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[styles.controlBtnContainer, animatedStyle, {top: 100 + top}]}>
          <Pressable onPress={toggleFlashlight} style={styles.controlBtn}>
            {isFlashlightEnabled ? (
              <ZapOff size={38} color="#333" />
            ) : (
              <Zap size={38} color="#333" />
            )}
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
};

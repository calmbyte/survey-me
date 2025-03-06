import {
  Commands,
  ReactNativeScannerView,
} from '@pushpendersingh/react-native-scanner';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Pressable, View} from 'react-native';
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

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const CameraScreen = ({isVisible, onClose}: Props) => {
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
        className={`absolute inset-0 ${
          isVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}>
        <Animated.View
          style={{
            transform: [{scale}],
          }}
          className="w-[10px] h-[10px] rounded-full bg-black absolute -right-[10px] -bottom-[10px] pointer-events-none origin-center"
        />
        {animationState === 'finished' && (
          <ReactNativeScannerView
            ref={scannerRef}
            className="z-20 flex-1"
            onQrScanned={(...args) => {
              console.log(args);
            }}
            pauseAfterCapture
            isActive
            showBox
          />
        )}
        <Animated.View
          style={[animatedStyle, {top: 16 + top}]}
          className="z-20 absolute left-4">
          <Pressable
            onPress={handleClose}
            className="w-[60px] h-[60px] rounded-[32px] justify-center items-center bg-white border-2 border-[#333]">
            <X size={38} color="#333" />
          </Pressable>
        </Animated.View>
        <Animated.View
          style={[animatedStyle, {top: 100 + top}]}
          className="z-20 absolute left-4">
          <Pressable
            onPress={toggleFlashlight}
            className="w-[60px] h-[60px] rounded-[32px] justify-center items-center bg-white border-2 border-[#333]">
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

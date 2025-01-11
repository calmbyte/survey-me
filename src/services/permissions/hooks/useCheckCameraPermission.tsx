import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

export const useCheckCameraPermission = () => {
  const [isCameraPermissionGranted, setIsCameraPermissionGranted] =
    useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA,
        );

        switch (result) {
          case RESULTS.UNAVAILABLE:
            // console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            Alert.alert(
              'Permission Denied',
              'You need to grant camera permission first',
            );
            openSettings();
            break;
          case RESULTS.GRANTED:
            setIsCameraPermissionGranted(true);
            break;
          case RESULTS.BLOCKED:
            Alert.alert(
              'Permission Blocked',
              'You need to grant camera permission first',
            );
            openSettings();
            break;
        }
      } catch (error) {
        console.error('Failed to request camera permission', error);
      }
    })();
  }, []);

  return {isCameraPermissionGranted};
};

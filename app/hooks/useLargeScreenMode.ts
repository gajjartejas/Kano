import { useEffect, useState } from 'react';

//App Modules
import { Dimensions, useWindowDimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';

export const useIsLandscape = () => {
  const { width, height } = useWindowDimensions();
  return width > height;
};

const useLargeScreenMode = () => {
  const isLandscape = useIsLandscape();
  const [isLargeScreen, setIsLargeScreen] = useState(isTablet() || isLandscape);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(isTablet() || isLandscape);
    };

    checkScreenSize();

    const dimensionChangeListener = Dimensions.addEventListener('change', checkScreenSize);

    return () => {
      dimensionChangeListener.remove();
    };
  }, [isLandscape]);

  return isLargeScreen;
};

export default useLargeScreenMode;

import { useEffect, useState } from 'react';

//App Modules
import { Dimensions } from 'react-native';
import { isTablet } from 'react-native-device-info';

const useLargeScreenMode = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const { width, height } = Dimensions.get('window');
      const isLandscape = width > height;
      setIsLargeScreen(isTablet() || isLandscape);
    };

    checkScreenSize();

    const dimensionChangeListener = Dimensions.addEventListener('change', checkScreenSize);

    return () => {
      dimensionChangeListener.remove();
    };
  }, []);

  return isLargeScreen;
};

export default useLargeScreenMode;

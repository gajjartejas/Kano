import { useWindowDimensions } from 'react-native';

export const useActualDimensions = () => {
  const { width, height, ...rest } = useWindowDimensions();
  const isLandscape = width > height;
  return { actualWidth: isLandscape ? height : width, actualHeight: isLandscape ? width : height, ...rest };
};

export default useActualDimensions;

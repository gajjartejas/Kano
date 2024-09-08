import React from 'react';

//App Modules
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';
import useAppRating from 'app/hooks/useAppRating';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'Loading'>;

const Loading = ({ navigation }: Props) => {
  //Constants
  const { rateAppIfNeeded } = useAppRating();

  React.useEffect(() => {
    navigation.replace('HomeTabs', {});
    rateAppIfNeeded().then(() => {
      analytics().logEvent('rate_app_opens');
    });
  }, [navigation, rateAppIfNeeded]);

  return null;
};

export default Loading;

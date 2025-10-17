import * as React from 'react';
import { StatusBar } from 'react-native';

//Third Party
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import analytics from '@react-native-firebase/analytics';

//Screens
import LoggedInTabNavigator from 'app/navigation/HomeTabNavigator';

//App Modules
import { HomeTabNavigatorParams } from 'app/navigation/types';
import useToastConfig from 'app/hooks/useToastConfig';
import { PaperThemeDark, PaperThemeDefault } from 'app/config/app-theme-config';
import useThemeConfigStore from 'app/store/themeConfig';
import { useCallback, useRef } from 'react';
import useAppRating from 'app/hooks/useAppRating';

const homeOptions: Object = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerShown: false,
};

const RootNavigation: React.FC = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<any | null>(null);
  const { addItemView } = useAppRating();

  const isDark = useThemeConfigStore(state => state.isDark);
  const primary = useThemeConfigStore(state => state.primary);
  const onPrimary = useThemeConfigStore(state => state.onPrimary);
  const secondaryContainer = useThemeConfigStore(state => state.secondaryContainer);
  const onSecondary = useThemeConfigStore(state => state.onSecondary);
  const Stack = createNativeStackNavigator<HomeTabNavigatorParams>();
  const toastConfig = useToastConfig();
  const theme: any = isDark
    ? {
        ...PaperThemeDark,
        colors: {
          ...PaperThemeDark.colors,
          primary: primary,
          onPrimary: onPrimary,
          secondaryContainer: secondaryContainer,
          onSecondary: onSecondary,
        },
      }
    : {
        ...PaperThemeDefault,
        colors: {
          ...PaperThemeDefault.colors,
          primary: primary,
          onPrimary: onPrimary,
          secondaryContainer: secondaryContainer,
          onSecondary: onSecondary,
        },
      };

  const onReady = useCallback(async () => {
    routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
  }, [navigationRef]);

  const onStateChange = useCallback(async () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef?.getCurrentRoute()?.name;
    const currentRouteParams = navigationRef?.getCurrentRoute()?.params;

    if (previousRouteName !== currentRouteName) {
      analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
        screen_params: currentRouteParams,
      });
      addItemView();
    }
    routeNameRef.current = currentRouteName;
  }, [addItemView, navigationRef]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer ref={navigationRef} theme={theme} onReady={onReady} onStateChange={onStateChange}>
        <StatusBar
          backgroundColor={'#FFFFFF00'}
          barStyle={isDark ? 'light-content' : 'dark-content'}
          translucent={true}
        />
        <Stack.Navigator>
          <Stack.Screen name="LoggedInTabNavigator" component={LoggedInTabNavigator} options={homeOptions} />
        </Stack.Navigator>
        <Toast config={toastConfig} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootNavigation;

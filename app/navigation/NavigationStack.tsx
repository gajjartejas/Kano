import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';

//Third Party
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import analytics from '@react-native-firebase/analytics';

//Screens
import HomeTabNavigator from 'app/navigation/HomeTabNavigator';

//Redux
import IState from 'app/models/models/appState';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//App Modules

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      primary: string;
      onPrimary: string;

      background: string;
      onBackground: string;

      surface: string;
      onSurface: string;

      error: string;
      shadow: string;

      textTitle: string;
      card: string;
      opacity: string;

      white: string;
      black: string;
    }

    interface Theme {}
  }
}

const Stack = createNativeStackNavigator();

const homeOptions: Object = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerShown: false,
};

interface IProps {
  theme: Theme;
}

const Navigator: React.FC<IProps> = (props: IProps) => {
  const routeNameRef = React.useRef<string | null>();
  const navigationRef = React.useRef<any>();

  const { theme } = props;
  const isDark = useSelector((state: IState) => state.themeReducer.isDark);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current!.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          let currentRoute = navigationRef.current.getCurrentRoute();
          let currentRouteName = currentRoute.name;
          let currentScreenName = currentRoute.name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentScreenName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}
        theme={theme}>
        <StatusBar
          backgroundColor={isDark ? '#000000' : '#00000000'}
          barStyle={isDark ? 'light-content' : 'dark-content'}
          translucent={false}
        />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeTabNavigator} options={homeOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const RootNavigation: React.FC = () => {
  const primary = useSelector((state: IState) => state.themeReducer.primary);
  const onPrimary = useSelector((state: IState) => state.themeReducer.onPrimary);

  const PaperThemeDefault = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: primary,
      onPrimary: onPrimary,

      background: '#F9F9F9',
      onBackground: '#000000',

      surface: '#F9F9F9',
      onSurface: '#000000',

      error: '#FF0000',
      shadow: '#000000',

      textTitle: '#535b6b',
      card: '#FFFFFF',
      opacity: '80',

      white: '#ffffff',
      black: '#000000',
    },
  };

  const PaperThemeDark = {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      primary: primary,
      onPrimary: onPrimary,

      background: '#000000',
      onBackground: '#FFFFFF',

      surface: '#222222',
      onSurface: '#FFFFFF',

      error: '#FF0000',
      shadow: '#000000',

      textTitle: '#FFFFFF',
      card: '#1E1E1E',
      opacity: '99',

      white: '#ffffff',
      black: '#000000',
    },
  };

  const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
    },
  };

  const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
    },
  };

  const isDark = useSelector((state: IState) => state.themeReducer.isDark);

  return (
    <PaperProvider theme={isDark ? PaperThemeDark : PaperThemeDefault}>
      <Navigator theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme} />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootNavigation;

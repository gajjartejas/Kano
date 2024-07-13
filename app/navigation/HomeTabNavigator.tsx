import React from 'react';

//Third Party
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-easy-icon';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Screens
import Loading from 'app/screens/Loading';
import DashboardTab from 'app/screens/Home/DashboardTab';
import MoreTab from 'app/screens/Home/MoreTab';
import MoreApps from 'app/screens/Settings/MoreApps';
import Settings from 'app/screens/Settings/Settings';
import About from 'app/screens/Settings/About';
import SelectAppearance from 'app/screens/Settings/SelectAppearance';
import License from 'app/screens/Settings/License';
import Translators from 'app/screens/Settings/Translators';
import LearnCharsList from 'app/screens/HomeIntro/CharsIntro/LearnCharsList';
import GujaratiScriptIntro from 'app/screens/HomeIntro/IntroductionToGujaratiScript/GujaratiScriptIntro';
import LearnCharsChart from 'app/screens/HomeIntro/CharsIntro/LearnCharsChart';
import LearnCharInfo from 'app/screens/HomeIntro/CharsIntro/LearnCharInfo';
import LearnCharsCard from 'app/screens/HomeIntro/LearnCharsCard';
import LearnBySelectedChar from 'app/screens/HomeIntro/CharsIntro/LearnBySelectedChar';
import LearnCharStrokeOrder from 'app/screens/HomeIntro/CharsIntro/LearnCharStrokeOrder';
import GeneralSetting from 'app/screens/Settings/GeneralSetting';
import CardAnimation from 'app/screens/Settings/CardAnimation';
import LearnCharAnimatedDrawing from 'app/screens/HomeIntro/CharsIntro/LearnCharAnimatedDrawing';
import SwipeCardSetting from 'app/screens/Settings/SwipeCardSetting';
import ChangeLanguage from 'app/screens/Settings/ChangeLanguage';

//App Modules
import { HomeTabsNavigatorParams, LoggedInTabNavigatorParams } from 'app/navigation/types';
import { AppTheme } from 'app/models/theme';

const Tab = createMaterialBottomTabNavigator<HomeTabsNavigatorParams>();

function HomeTabs() {
  //Constants
  const { colors } = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{}}
      inactiveColor={colors.secondaryContainer}
      activeColor={colors.secondaryContainer}
      barStyle={{ backgroundColor: colors.background, height: insets.bottom + 60 }}>
      <Tab.Screen
        name="DashboardTab"
        component={DashboardTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Icon
              type="material-community"
              name="view-dashboard"
              color={focused ? colors.white : colors.primary}
              size={21}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreTab}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Icon
              type="material-community"
              name="dots-horizontal"
              color={focused ? colors.white : colors.primary}
              size={21}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const LoggedInStack = createNativeStackNavigator<LoggedInTabNavigatorParams>();

const LoggedInTabNavigator = () => {
  return (
    <LoggedInStack.Navigator>
      <LoggedInStack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="MoreApps" component={MoreApps} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="About" component={About} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="SelectAppearance" component={SelectAppearance} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="License" component={License} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="Translators" component={Translators} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="LearnCharsList" component={LearnCharsList} options={{ headerShown: false }} />
      <LoggedInStack.Screen
        name="GujaratiScriptIntro"
        component={GujaratiScriptIntro}
        options={{ headerShown: false }}
      />
      <LoggedInStack.Screen name="LearnCharsChart" component={LearnCharsChart} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="LearnCharInfo" component={LearnCharInfo} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="LearnCharsCard" component={LearnCharsCard} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="GeneralSetting" component={GeneralSetting} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="SwipeCardSetting" component={SwipeCardSetting} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="CardAnimation" component={CardAnimation} options={{ headerShown: false }} />
      <LoggedInStack.Screen name="ChangeLanguage" component={ChangeLanguage} options={{ headerShown: false }} />
      <LoggedInStack.Group screenOptions={{ presentation: 'modal' }}>
        <LoggedInStack.Screen
          name="LearnBySelectedChar"
          component={LearnBySelectedChar}
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
        <LoggedInStack.Screen
          name="LearnCharStrokeOrder"
          component={LearnCharStrokeOrder}
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
        <LoggedInStack.Screen
          name="LearnCharAnimatedDrawing"
          component={LearnCharAnimatedDrawing}
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
      </LoggedInStack.Group>
    </LoggedInStack.Navigator>
  );
};

export default LoggedInTabNavigator;

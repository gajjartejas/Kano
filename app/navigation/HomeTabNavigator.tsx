import React from 'react';

//Third Party
import { useTheme } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Screens
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
import CommonIcon from 'app/components/CommonIcon.tsx';

const Tab = createBottomTabNavigator<HomeTabsNavigatorParams>();

function HomeTabs() {
  //Constants
  const { colors } = useTheme<AppTheme>();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: insets.bottom + 44,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="DashboardTab"
        component={DashboardTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonIcon
              type="material"
              name="view-dashboard"
              size={22}
              color={focused ? colors.primary : colors.onSurfaceVariant}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <CommonIcon
              type="fontawesome6"
              name="ellipsis"
              size={20}
              color={focused ? colors.primary : colors.onSurfaceVariant}
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
    <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
      <LoggedInStack.Screen name="Loading" component={Loading} />
      <LoggedInStack.Screen name="HomeTabs" component={HomeTabs} />
      <LoggedInStack.Screen name="MoreApps" component={MoreApps} />
      <LoggedInStack.Screen name="Settings" component={Settings} />
      <LoggedInStack.Screen name="About" component={About} />
      <LoggedInStack.Screen name="SelectAppearance" component={SelectAppearance} />
      <LoggedInStack.Screen name="License" component={License} />
      <LoggedInStack.Screen name="Translators" component={Translators} />
      <LoggedInStack.Screen name="LearnCharsList" component={LearnCharsList} />
      <LoggedInStack.Screen name="GujaratiScriptIntro" component={GujaratiScriptIntro} />
      <LoggedInStack.Screen name="LearnCharsChart" component={LearnCharsChart} />
      <LoggedInStack.Screen name="LearnCharInfo" component={LearnCharInfo} />
      <LoggedInStack.Screen name="LearnCharsCard" component={LearnCharsCard} />
      <LoggedInStack.Screen name="GeneralSetting" component={GeneralSetting} />
      <LoggedInStack.Screen name="SwipeCardSetting" component={SwipeCardSetting} />
      <LoggedInStack.Screen name="CardAnimation" component={CardAnimation} />
      <LoggedInStack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <LoggedInStack.Group screenOptions={{ presentation: 'modal' }}>
        <LoggedInStack.Screen
          name="LearnBySelectedChar"
          component={LearnBySelectedChar}
          options={{ animation: 'slide_from_bottom' }}
        />
        <LoggedInStack.Screen
          name="LearnCharStrokeOrder"
          component={LearnCharStrokeOrder}
          options={{ animation: 'slide_from_bottom' }}
        />
        <LoggedInStack.Screen
          name="LearnCharAnimatedDrawing"
          component={LearnCharAnimatedDrawing}
          options={{ animation: 'slide_from_bottom' }}
        />
      </LoggedInStack.Group>
    </LoggedInStack.Navigator>
  );
};

export default LoggedInTabNavigator;

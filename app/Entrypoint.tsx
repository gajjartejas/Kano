/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import './locales';
import AppManager from 'app/components/AppManager';
import Navigator from 'app/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RealmContext from 'app/realm/RealmContext';
import { SingletonHooksContainer } from 'react-singleton-hook';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Optimize memory usage and performance: https://reactnavigation.org/docs/react-native-screens/
 */
enableScreens();

const Entrypoint: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <RealmContext.RealmProvider>
          <AppManager>
            <Navigator />
          </AppManager>
          <SingletonHooksContainer />
        </RealmContext.RealmProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Entrypoint;

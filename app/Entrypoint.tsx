/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from 'app/store';
import { enableScreens } from 'react-native-screens';
import './locales';
import LoadingScreen from 'app/screens/Auth/Loading';
import AppManager from 'app/components/AppManager';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
const { persistor, store } = configureStore();

/**
 * Optimize memory usage and performance: https://reactnavigation.org/docs/react-native-screens/
 */
enableScreens();

const Entrypoint: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <AppManager>
            <LoadingScreen />
          </AppManager>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Entrypoint;

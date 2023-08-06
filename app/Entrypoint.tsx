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

/**
 * Optimize memory usage and performance: https://reactnavigation.org/docs/react-native-screens/
 */
enableScreens();

const Entrypoint: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppManager>
        <Navigator />
      </AppManager>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Entrypoint;

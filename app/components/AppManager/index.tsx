import React, { memo, ReactElement } from 'react';
import { View } from 'react-native';

//App Modules
import styles from './styles';

//Interface
export type Props = {
  children: ReactElement[] | ReactElement;
};

const AppManager = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default memo(AppManager);

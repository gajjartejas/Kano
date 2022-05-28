import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

//Thirdparty
import { SvgProps } from 'react-native-svg';

//Local Modules
import Config from 'app/config';

interface SVGIconProps extends SvgProps {
  iconName: string;
}

const SVGIcon = (props: SVGIconProps) => {
  const OtherComponent = Config.svgIconForName(props.iconName)();

  return (
    <View>
      <React.Suspense fallback={<Text>Loading...</Text>}>
        <OtherComponent style={styles.leftIcon} width={44} height={44} />
      </React.Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  leftIcon: { marginHorizontal: 20 },
});

export default SVGIcon;

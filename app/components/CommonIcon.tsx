import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';

// Import icon sets
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

export type IconType = 'fontawesome6' | 'material';

interface CommonIconProps {
  type: IconType;
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle | TextStyle;
  onPress?: () => void;
}

const iconMap = {
  fontawesome6: FontAwesome6,
  material: MaterialDesignIcons,
};

const CommonIcon: React.FC<CommonIconProps> = ({ type, name, size, color, style, onPress }) => {
  const IconComponent = iconMap[type] as any;
  return <IconComponent iconStyle={'solid'} name={name} size={size} color={color} style={style} onPress={onPress} />;
};

export default CommonIcon;

import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';

//Constants
const { width } = Dimensions.get('window');

//Interface
export interface IDashboardItem {
  id: number;
  title: string;
  subtitle: string;
  iconBackgroundColor: string;
  iconName: string;
}

//Interface
interface IDashboardItemProps {
  item: IDashboardItem;
  index: number;
  onPress: (item: IDashboardItem, index: number) => void;
}

const DashboardItem = (props: IDashboardItemProps) => {
  //Consts
  const { colors } = useTheme();
  const { item, index } = props;

  return (
    <View
      style={[styles.container, { backgroundColor: `${colors.background}`, shadowColor: `${colors.onBackground}11` }]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.onBackground}20` }]}
        onPress={() => props.onPress(item, index)}>
        <>
          {/* <Icon type={item.iconFamily} name={item.iconName} color={item.iconBackgroundColor} size={24} /> */}
          <Text numberOfLines={1} style={[styles.titleText, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={[styles.subtitleText, { color: `${colors.text}60` }]}>
            {item.subtitle}
          </Text>
        </>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: width / 2 - 24,
    borderRadius: 18,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowOpacity: 1.0,
    marginBottom: 16,
  },
  touchableButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainerView: {
    backgroundColor: 'red',
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
  disabledButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DashboardItem;

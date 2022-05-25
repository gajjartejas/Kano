import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';

//Constants
const { width } = Dimensions.get('window');

//Interface
export interface IHomeListItem {
  id: number;
  title: string;
  subTitle: string;
  iconName: string;
}

export interface IHomeListSection {
  title: string;
  data: IHomeListItem[];
}

//Interface
interface IHomeListItemProps {
  item: IHomeListItem;
  index: number;
  sectionIndex: number;
  onPress: (item: IHomeListItem, index: number, sectionIndex: number) => void;
}

const HomeListItem = (props: IHomeListItemProps) => {
  //Const
  const { colors } = useTheme();
  const { item, index } = props;
  const sectionIndex = props.sectionIndex;

  return (
    <View
      style={[styles.container, { backgroundColor: `${colors.background}`, shadowColor: `${colors.onBackground}11` }]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.onBackground}20` }]}
        onPress={() => props.onPress(item, index, sectionIndex)}>
        <>
          <Text numberOfLines={1} style={[styles.titleText, { color: colors.text }]}>
            {item.title}
          </Text>
          <Text numberOfLines={2} style={[styles.subtitleText, { color: `${colors.text}60` }]}>
            {item.subTitle}
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
});

export default HomeListItem;

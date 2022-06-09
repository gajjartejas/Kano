import React from 'react';
import { View, StyleSheet } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import CircularProgress from './CircularProgress';

//Interface
export interface IVovelCharCellItem {
  id: number;
  en: string;
  gu: string;
}

export interface IVovelListSection {
  title: string;
  data: IVovelCharCellItem[];
}

//Interface
interface IVovelCharCellItemProps {
  item: IVovelCharCellItem;
  index: number;
  sectionIndex: number;
  onPress: (item: IVovelCharCellItem, index: number, sectionIndex: number) => void;
}

const CharCellItem = (props: IVovelCharCellItemProps) => {
  //Const
  const { colors } = useTheme();
  const { item, index } = props;
  const sectionIndex = props.sectionIndex;

  return (
    <View style={[styles.container, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.card}20` }]}
        onPress={() => props.onPress(item, index, sectionIndex)}>
        <View style={styles.iconTextContainer}>
          <Text numberOfLines={2} style={[styles.titleText, { color: colors.textTitle }]}>
            {item.gu}
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowOpacity: 0.2,

    width: 98,
    height: 98,
    marginBottom: 8,
  },
  touchableButton: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 8,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  circularProgress: {
    marginHorizontal: 20,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
    shadowOpacity: 0.41,
    borderRadius: 20,
  },
  iconTextContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconTextContainer1: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  leftIcon: { alignSelf: 'center' },
  iconContainer: { marginHorizontal: 20, width: 44 },
  textContainer: { marginRight: 8, flex: 1 },
});

export default CharCellItem;

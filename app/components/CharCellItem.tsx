import Config from 'app/config';
import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';

//Interface
export interface ICharCellItem {
  id: number;
  en: string;
  gu: string;
  diacritic: string;
}

export interface ICharCellListSection {
  title: string;
  data: ICharCellItem[];
}

//Interface
interface ICharCellItemProps {
  item: ICharCellItem;
  index: number;
  sectionIndex: number;
  onPress: (item: ICharCellItem, index: number, sectionIndex: number) => void;
  numberOfColumns: number;
  cellSpacing: number;
  containerSpacing: number;
}

const CharCellItem = (props: ICharCellItemProps) => {
  //Const
  const { colors } = useTheme();
  const { item, index, numberOfColumns, cellSpacing, containerSpacing } = props;
  const sectionIndex = props.sectionIndex;

  const dim = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${colors.card}`,
          shadowColor: `${colors.shadow}`,
          width: (dim.width - containerSpacing * 2 - cellSpacing * numberOfColumns * 2) / numberOfColumns,
          height: (dim.width - containerSpacing * 2) / numberOfColumns,
        },
      ]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.card}20` }]}
        onPress={() => props.onPress(item, index, sectionIndex)}>
        <View style={styles.iconTextContainerView}>
          <View style={styles.iconTextContainer}>
            <Text numberOfLines={1} style={[styles.titleText, { color: colors.textTitle }]}>
              {item.gu}
            </Text>
            <Text numberOfLines={1} style={[styles.subTitleText, { color: `${colors.textTitle}99` }]}>
              {`${item.en}${item.diacritic ? ' / ' : ''}${item.diacritic}`}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowOpacity: 0.2,
    marginBottom: 6,
    marginHorizontal: 3,
  },
  touchableButton: { flex: 1 },
  titleText: {
    fontWeight: '600',
    fontSize: 30,
    fontFamily: Config.Fonts.NotoSansGujarati.Regular,
  },
  subTitleText: {
    fontWeight: '500',
    fontSize: 18,
    fontFamily: Config.Fonts.NotoSansGujarati.Regular,
  },
  iconTextContainer: { alignItems: 'center', justifyContent: 'center' },
  iconTextContainerView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default CharCellItem;

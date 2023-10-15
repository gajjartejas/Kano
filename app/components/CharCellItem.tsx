import React, { memo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//App Modules
import Config from 'app/config';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import { AppTheme } from 'app/models/theme';

//Interface
export interface ICharCellItem {
  id: number;
  en: string;
  gu: string;
  diacritic: string;
  svg: string;
  audio: string;
  totalLength: number;
  groups: number;
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
  parentWidth?: number;
}

const CharCellItem = (props: ICharCellItemProps) => {
  //Const
  const { colors } = useTheme<AppTheme>();
  const { item, index, numberOfColumns, cellSpacing, containerSpacing, parentWidth, sectionIndex } = props;
  const { width } = useWindowDimensions();

  const pw = parentWidth === undefined ? width : parentWidth;
  const cellW = (pw - containerSpacing * 2 - cellSpacing * numberOfColumns * 2) / numberOfColumns;
  const titleFontSize = cellW * 0.35;
  const subTitleFontSize = cellW * 0.15;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${colors.card}`,
          shadowColor: `${colors.shadow}`,
          width: cellW,
          height: (pw - containerSpacing * 2) / numberOfColumns,
        },
      ]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.card}20` }]}
        onPress={() => props.onPress(item, index, sectionIndex)}>
        <View style={styles.iconTextContainerView}>
          <View style={styles.iconTextContainer}>
            <Text numberOfLines={1} style={[styles.titleText, { color: colors.textTitle, fontSize: titleFontSize }]}>
              {item.gu}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.subTitleText, { color: `${colors.textTitle}99`, fontSize: subTitleFontSize }]}>
              {`${item.en}${item.diacritic ? `/${item.diacritic}` : ''}`}
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

export default memo(CharCellItem, (p, n) => {
  return p.sectionIndex === n.sectionIndex && p.item.id === n.item.id && p.parentWidth === n.parentWidth;
});

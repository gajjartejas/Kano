import React, { memo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import { AppTheme } from 'app/models/theme';

//App Modules
import Config from 'app/config';

//Interface
export interface ISelectCharCellItem {
  id: number;
  title: string;
  subTitle: string;
  selected: boolean;
}

export interface ISelectCharCellListSection {
  title: string;
  data: ISelectCharCellItem[];
}

//Interface
interface ICharCellItemProps {
  item: ISelectCharCellItem;
  index: number;
  sectionIndex: number;
  onPress: (item: ISelectCharCellItem, index: number, sectionIndex: number) => void;
  numberOfColumns: number;
  cellSpacing: number;
  containerSpacing: number;
  selected?: boolean;
  parentWidth?: number;
}

const CharCellItem = (props: ICharCellItemProps) => {
  //Const
  const { colors } = useTheme<AppTheme>();
  const { item, index, sectionIndex, numberOfColumns, cellSpacing, containerSpacing, selected, parentWidth } = props;
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
          backgroundColor: selected ? `${colors.primary}` : `${colors.card}`,
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
            <Text
              numberOfLines={1}
              style={[
                styles.titleText,
                { color: selected ? colors.onPrimary : colors.textTitle, fontSize: titleFontSize },
              ]}>
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[
                styles.subTitleText,
                { color: selected ? `${colors.onPrimary}` : `${colors.textTitle}99`, fontSize: subTitleFontSize },
              ]}>
              {item.subTitle}
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
    elevation: 4,
    shadowOpacity: 0.2,
    marginBottom: 6,
    marginHorizontal: 3,
  },
  touchableButton: {
    flex: 1,
  },
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
  iconTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextContainerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(CharCellItem, (p, n) => {
  return (
    p.index === n.index &&
    p.sectionIndex === n.sectionIndex &&
    p.selected === n.selected &&
    p.item.id === n.item.id &&
    p.parentWidth === n.parentWidth
  );
});

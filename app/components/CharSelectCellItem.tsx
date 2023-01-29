import React, { memo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//App Modules
import Config from 'app/config';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';

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
}

const CharCellItem = (props: ICharCellItemProps) => {
  //Const
  const { colors } = useTheme();
  const { item, index, sectionIndex, numberOfColumns, cellSpacing, containerSpacing, selected } = props;

  const dim = useWindowDimensions();

  const titleFontSize = [20, 30, 30, 30, 30, 30, 24][numberOfColumns];
  const subTitleFontSize = [30, 30, 30, 26, 16, 14, 12][numberOfColumns];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: selected ? `${colors.primary}` : `${colors.card}`,
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
            <Text numberOfLines={1} style={[styles.titleText, { color: colors.textTitle, fontSize: titleFontSize }]}>
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={[styles.subTitleText, { color: `${colors.textTitle}99`, fontSize: subTitleFontSize }]}>
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
  return p.selected === n.selected && p.index === n.index && p.sectionIndex === n.sectionIndex;
});

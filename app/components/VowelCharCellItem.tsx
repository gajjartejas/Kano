import Config from 'app/config';
import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import CircularProgress from './CircularProgress';

//Interface
export interface IVovelCharCellItem {
  id: number;
  en: string;
  gu: string;
  diacritic: string;
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

  const dim = useWindowDimensions();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${colors.card}`,
          // backgroundColor: `red`,
          shadowColor: `${colors.shadow}`,
          width: (dim.width - 40 - 18) / 3,
          height: (dim.width - 40) / 3,
        },
      ]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.card}20` }]}
        onPress={() => props.onPress(item, index, sectionIndex)}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
});

export default CharCellItem;

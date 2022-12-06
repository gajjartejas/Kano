import React, { memo } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//Third Party
import { useTheme, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

//App Modules
import Config from 'app/config';
import { ICharCellItem } from './CharCellItem';
import AppTitleValueItemCell from './AppTitleValueItemCell';

//Interface
interface ILearnCharInfoItemCellProps {
  item: ICharCellItem;
  index: number;
  onPressViewAnimatedDrawing: (item: ICharCellItem, index: number) => void;
}

const LearnCharInfoItemCell = (props: ILearnCharInfoItemCellProps) => {
  //Const
  const { colors } = useTheme();
  const dim = useWindowDimensions();
  const { t } = useTranslation();

  const { item, index } = props;

  return (
    <View style={[styles.container, { width: dim.width }]}>
      <Text style={[styles.headerText, { color: colors.text }]}>{item.gu}</Text>
      <View style={[styles.card, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
        <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.charactor')} value={item.gu} />
        <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.diacritic')} value={item.diacritic} />
        <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.englishCharactor')} value={item.en} />
        <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.numberOfStrokes')} value={item.en} />
        <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.compaxity')} value={item.en} />
        <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.length')} value={item.en} />
      </View>
      <View style={[styles.card, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
        <AppTitleValueItemCell bold touchDisabled title={t('learnCharInfoScreen.moreInfo')} />
        <AppTitleValueItemCell
          iconName="chevron-right"
          iconFamily="font-awesome"
          onPress={() => {}}
          title={t('learnCharInfoScreen.viewStrokeOrder')}
        />
        <AppTitleValueItemCell
          iconName="chevron-right"
          iconFamily="font-awesome"
          onPress={() => props.onPressViewAnimatedDrawing(item, index)}
          title={t('learnCharInfoScreen.viewAnimatedDrawing')}
        />
        <AppTitleValueItemCell
          iconName="play-circle"
          iconFamily="font-awesome"
          leftIconSize={20}
          onPress={() => {}}
          title={t('learnCharInfoScreen.playSound')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
  },

  headerText: {
    alignSelf: 'center',
    fontFamily: Config.Fonts.NotoSansGujarati.SemiBold,
    fontWeight: '400',
    fontSize: 100,
    marginTop: 32,
    marginBottom: 12,
  },
  card: {
    borderRadius: 4,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowOpacity: 0.2,
    marginBottom: 8,
    marginHorizontal: 20,
    paddingVertical: 8,
  },
});

export default memo(LearnCharInfoItemCell, () => false);

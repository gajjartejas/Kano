import React, { memo, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

//Third Party
import { useTheme, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

//App Modules
import Config from 'app/config';
import { ICharCellItem } from './CharCellItem';
import AppTitleValueItemCell from './AppTitleValueItemCell';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme } from 'app/models/theme';
import useSvgReader from 'app/hooks/useSvgReader';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';

//Interface
interface ILearnCharInfoItemCellProps {
  item: ICharCellItem;
  index: number;
  onPressViewAnimatedDrawing: (item: ICharCellItem, index: number) => void;
  onPressStrokeOrder: (item: ICharCellItem, index: number) => void;
  onPressPlaySound: (item: ICharCellItem, index: number) => void;
}

const LearnCharInfoItemCell = (props: ILearnCharInfoItemCellProps) => {
  //Const
  const { colors } = useTheme<AppTheme>();
  const { parsedSvg, readSvg } = useSvgReader();

  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { item, index, onPressPlaySound, onPressViewAnimatedDrawing, onPressStrokeOrder } = props;
  const { gu, svg, en, diacritic: d } = item;

  useEffect(() => {
    readSvg(svg);
  }, [svg, readSvg]);

  const character = gu;
  const diacritic = d && d.trim().length > 0 ? d : 'N/A';
  const englishCharacter = en;
  const numberOfStrokes = parsedSvg?.groups.length.toString();
  const length = parsedSvg?.totalLength ? Math.round(parsedSvg?.totalLength).toString() + ' px' : 'N/A';
  const largeScreenMode = useLargeScreenMode();
  const fontSize = largeScreenMode ? 200 : 100;

  return (
    <View style={[styles.container, { width: width - insets.right - insets.left }, largeScreenMode && styles.flexRow]}>
      <Text
        style={[
          styles.headerText,
          largeScreenMode && styles.headerTextLargeMode,
          { fontSize: fontSize, color: colors.text },
        ]}>
        {gu}
      </Text>

      <View style={styles.rowContainer}>
        <View
          style={[
            styles.card,
            largeScreenMode && styles.cardTablet,
            { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` },
          ]}>
          <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.character')} value={character} />
          <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.diacritic')} value={diacritic} />
          <AppTitleValueItemCell
            touchDisabled
            title={t('learnCharInfoScreen.englishCharacter')}
            value={englishCharacter}
          />
          <AppTitleValueItemCell
            touchDisabled
            title={t('learnCharInfoScreen.numberOfStrokes')}
            value={numberOfStrokes}
          />
          <AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.length')} value={length} />
        </View>
        <View
          style={[
            styles.card,
            largeScreenMode && styles.cardTablet,
            { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` },
          ]}>
          <AppTitleValueItemCell bold touchDisabled title={t('learnCharInfoScreen.moreInfo')} />
          <AppTitleValueItemCell
            iconName="chevron-right"
            iconFamily="font-awesome"
            onPress={() => onPressStrokeOrder(item, index)}
            title={t('learnCharInfoScreen.viewStrokeOrder')}
          />
          <AppTitleValueItemCell
            iconName="chevron-right"
            iconFamily="font-awesome"
            onPress={() => onPressViewAnimatedDrawing(item, index)}
            title={t('learnCharInfoScreen.viewAnimatedDrawing')}
          />
          <AppTitleValueItemCell
            iconName="play-circle"
            iconFamily="font-awesome"
            leftIconSize={20}
            onPress={() => onPressPlaySound(item, index)}
            title={t('learnCharInfoScreen.playSound')}
          />
        </View>
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
    marginTop: 32,
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
  cardTablet: {
    width: '70%',
    alignSelf: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  headerTextLargeMode: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  rowContainer: {
    flex: 1,
    marginTop: 20,
  },
});

export default memo(LearnCharInfoItemCell, (o, n) => o.item.id === n.item.id);

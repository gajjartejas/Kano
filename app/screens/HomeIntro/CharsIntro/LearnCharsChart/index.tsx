import React, { useEffect, useState, useCallback } from 'react';
import { View, useWindowDimensions } from 'react-native';

//ThirdParty
import { Appbar, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';

//App modules
import Components from 'app/components';
import styles from './styles';
import Hooks from 'app/hooks/index';
import { ICharCellItem } from 'app/components/CharCellItem';
import * as RouterParamTypes from 'app/config/router-params';

//Params
type RootStackParamList = {
  LearnCharsChart: RouterParamTypes.LearnCharsChartParams;
  LearnCharInfo: RouterParamTypes.LearnCharInfoParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsChart'>;

const CELL_SPACING = 3;
const CONTAINER_SPACING = 20;

const LearnCharsChart = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { type } = route.params;
  const groupedEntries = Hooks.ChartItemForTypes.useChartItemForTypes(type);
  const { t } = useTranslation();
  const mappedGroupedEntries = groupedEntries.map(v => [v.title, v.data]).flat(1);
  const dim = useWindowDimensions();

  //States
  const [title, setTitle] = useState('');
  const [numberOfColumns, setNumberOfColumns] = useState<number | null>(null);

  const configInterface = useCallback(() => {
    switch (type) {
      case RouterParamTypes.LearnCharsType.Vowel:
        setTitle(t('learnCharsChartScreen.header.titleVowels'));
        setNumberOfColumns(3);
        break;

      case RouterParamTypes.LearnCharsType.Constant:
        setTitle(t('learnCharsChartScreen.header.titleConsonants'));
        setNumberOfColumns(5);
        break;

      case RouterParamTypes.LearnCharsType.Barakhadi:
        setTitle(t('learnCharsChartScreen.header.titleBarakhadi'));
        setNumberOfColumns(4);
        break;

      case RouterParamTypes.LearnCharsType.Number:
        setTitle(t('learnCharsChartScreen.header.titleNumerals'));
        setNumberOfColumns(6);
        break;

      default:
        break;
    }
  }, [t, type]);

  useEffect(() => {
    configInterface();
  }, [configInterface]);

  const cardTapped = (item: ICharCellItem, index: number, sectionIndex: number) => {
    navigation.push('LearnCharInfo', { index, sectionIndex, groupedEntries, type });
  };

  const renderItem = (item: ICharCellItem, index: number, sectionIndex: number) => {
    return (
      <Components.CharCellItem
        key={item.id.toString()}
        containerSpacing={CONTAINER_SPACING}
        cellSpacing={CELL_SPACING}
        numberOfColumns={numberOfColumns!}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
      />
    );
  };

  const renderSection = ({ item }: { item: string | ICharCellItem[] }) => {
    if (typeof item === 'string') {
      return renderSectionHeader(item);
    } else {
      return (
        <View style={styles.sectionItem}>
          {item.map((v, index) => {
            return renderItem(
              v,
              index,
              groupedEntries.findIndex(p => p.data === item),
            );
          })}
        </View>
      );
    }
  };

  const onGoBack = () => {
    navigation.pop();
  };

  const renderSectionHeader = (titleText: string) => {
    if (!titleText || titleText.length < 1) {
      return null;
    }
    return (
      <View style={[styles.listHeaderView, { backgroundColor: colors.background }]}>
        <Text style={[styles.listHeaderText, { color: colors.textTitle }]}>{titleText}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        {!!numberOfColumns && (
          <View style={[styles.listContainer, { paddingHorizontal: CONTAINER_SPACING - 1 }]}>
            <FlashList
              data={mappedGroupedEntries}
              renderItem={renderSection}
              getItemType={item => {
                return typeof item === 'string' ? 'sectionHeader' : 'row';
              }}
              contentContainerStyle={styles.listContentContainer}
              stickyHeaderHiddenOnScroll={true}
              estimatedItemSize={dim.width - CONTAINER_SPACING * 2}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default LearnCharsChart;

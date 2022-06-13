import React, { useEffect, useState, useCallback } from 'react';
import { View, SectionList, SectionListRenderItemInfo } from 'react-native';

//ThirdParty
import { Appbar, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

//App modules
import Components from 'app/components';
import styles from './styles';
import Hooks from 'app/hooks/index';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import * as RouterParamTypes from 'app/config/router-params';

//Params
type RootStackParamList = {
  LearnCharsChart: RouterParamTypes.LearnCharsChartParams;
  LearnCharInfo: RouterParamTypes.LearnCharInfoParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharsChart'>;

const NUMBER_OF_COLUMNS = 6;
const CELL_SPACING = 3;
const CONTAINER_SPACING = 20;

const LearnCharsChart = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const type = route.params.type;
  const groupedEntries = Hooks.useChartItemForTypes(type);
  const { t } = useTranslation();

  //States
  const [title, setTitle] = useState('');

  const configInterface = useCallback(() => {
    switch (type) {
      case RouterParamTypes.LearnCharsType.Vowel:
        setTitle(t('learnCharsChartScreen.header.titleVowels'));
        break;

      case RouterParamTypes.LearnCharsType.Constant:
        setTitle(t('learnCharsChartScreen.header.titleConsonants'));

        break;

      case RouterParamTypes.LearnCharsType.Barakhadi:
        setTitle(t('learnCharsChartScreen.header.titleBarakhadi'));

        break;

      case RouterParamTypes.LearnCharsType.Number:
        setTitle(t('learnCharsChartScreen.header.titleNumerals'));

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
        numberOfColumns={NUMBER_OF_COLUMNS}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
      />
    );
  };

  const renderSection = (info: SectionListRenderItemInfo<ICharCellItem, ICharCellListSection>) => {
    if (info.index !== 0) {
      return null;
    }
    return (
      <View style={styles.sectionItem}>
        {info.section.data.map((item, index) => {
          return renderItem(item, index, groupedEntries.indexOf(info.section));
        })}
      </View>
    );
  };

  const onGoBack = () => {
    navigation.pop();
  };

  const renderSectionHeader = (info: { section: { title: string } }) => {
    return <Text>{info.section.title}</Text>;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <SectionList
          removeClippedSubviews
          maxToRenderPerBatch={10}
          initialNumToRender={5}
          windowSize={21}
          legacyImplementation={false}
          sections={groupedEntries}
          renderItem={renderSection}
          keyExtractor={item => item.id.toString()}
          style={{ paddingHorizontal: CONTAINER_SPACING }}
          renderSectionHeader={renderSectionHeader}
        />
      </View>
    </View>
  );
};

export default LearnCharsChart;

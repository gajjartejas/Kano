import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, useWindowDimensions } from 'react-native';

//ThirdParty
import { Appbar, Button, RadioButton, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';

//App modules
import Components from 'app/components';
import styles from './styles';
import Hooks from 'app/hooks/index';
import { ISelectCharCellItem } from 'app/components/CharSelectCellItem';
import * as RouterParamTypes from 'app/config/router-params';
import { LearnCharsMode } from 'app/config/router-params';

//Params
type RootStackParamList = {
  LearnBySelectedChar: RouterParamTypes.LearnBySelectedCharParams;
  LearnCharInfo: RouterParamTypes.LearnCharInfoParams;
  LearnCharsSequence: RouterParamTypes.LearnCharsSequenceParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnBySelectedChar'>;

const CELL_SPACING = 3;
const CONTAINER_SPACING = 20;

const LearnBySelectedChar = ({ navigation, route }: Props) => {
  //Refs
  const refSelectedIds = useRef<Set<string>>(new Set([]));
  //Actions

  //Constants
  const { colors } = useTheme();
  const { type } = route.params;
  const { t } = useTranslation();
  const dim = useWindowDimensions();
  const groupedEntries = Hooks.ChartItemForTypes.useSelectedChartItemForTypes(type);
  const mappedGroupedEntries = groupedEntries.map(v => [v.title, v.data]).flat(1);

  //States
  const [numberOfColumns, setNumberOfColumns] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set([]));

  const configInterface = useCallback(() => {
    switch (type) {
      case RouterParamTypes.LearnCharsType.Vowel:
        setNumberOfColumns(3);
        break;

      case RouterParamTypes.LearnCharsType.Constant:
        setNumberOfColumns(5);

        break;

      case RouterParamTypes.LearnCharsType.Barakhadi:
        setNumberOfColumns(6);

        break;

      case RouterParamTypes.LearnCharsType.Number:
        setNumberOfColumns(6);

        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    configInterface();
  }, [configInterface]);

  useEffect(() => {
    refSelectedIds.current = selectedIds;
  }, [selectedIds]);

  const cardTapped = (item: ISelectCharCellItem, index: number, sectionIndex: number) => {
    var newSelectedIds = new Set(refSelectedIds.current);
    if (newSelectedIds.has(`${index}-${sectionIndex}`)) {
      newSelectedIds.delete(`${index}-${sectionIndex}`);
    } else {
      newSelectedIds.add(`${index}-${sectionIndex}`);
    }
    setSelectedIds(newSelectedIds);
  };

  const renderItem = (item: ISelectCharCellItem, index: number, sectionIndex: number) => {
    return (
      <Components.CharSelectCellItem
        key={item.id.toString()}
        containerSpacing={CONTAINER_SPACING}
        cellSpacing={CELL_SPACING}
        numberOfColumns={numberOfColumns!}
        item={item}
        index={index}
        sectionIndex={sectionIndex}
        onPress={cardTapped}
        selected={selectedIds.has(`${index}-${sectionIndex}`)}
      />
    );
  };

  const renderSection = ({ item, index }: { item: string | ISelectCharCellItem[]; index: number }) => {
    if (typeof item === 'string') {
      return renderSectionHeader(item, index);
    } else {
      return (
        <View style={styles.sectionItem}>
          {item.map((v, idx) => {
            return renderItem(
              v,
              idx,
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

  const renderSectionHeader = (titleText: string, index: number) => {
    if (!titleText || titleText.length < 1) {
      return null;
    }
    let allSelected = true;
    let sectionIndex = index / 2;
    let x = mappedGroupedEntries[index + 1] as ISelectCharCellItem[];
    for (let i = 0; i < x.length; i++) {
      if (!selectedIds.has(`${i}-${sectionIndex}`)) {
        allSelected = false;
      }
    }
    return (
      <View style={[styles.listHeaderView, { backgroundColor: colors.background }]}>
        <Text style={[styles.listHeaderText, { color: colors.textTitle }]}>{titleText}</Text>
        <RadioButton
          value="first"
          status={allSelected ? 'checked' : 'unchecked'}
          onPress={() => onSelectCheckbox(index)}
        />
      </View>
    );
  };

  const onPressContinue = () => {
    navigation.push('LearnCharsSequence', { type, learnMode: LearnCharsMode.LearnInSequence });
  };

  const onSelectCheckbox = (index: number) => {
    let sectionIndex = index / 2;
    let x = mappedGroupedEntries[index + 1] as ISelectCharCellItem[];
    let newSelectedIds = new Set(refSelectedIds.current);

    let allSelected = true;
    for (let i = 0; i < x.length; i++) {
      if (!newSelectedIds.has(`${i}-${sectionIndex}`)) {
        allSelected = false;
      }
    }

    for (let i = 0; i < x.length; i++) {
      if (allSelected) {
        newSelectedIds.delete(`${i}-${sectionIndex}`);
      } else {
        newSelectedIds.add(`${i}-${sectionIndex}`);
      }
    }
    setSelectedIds(newSelectedIds);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnBySelectedChar.header.title')} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        {!!numberOfColumns && (
          <View style={[styles.listContainer, { paddingHorizontal: CONTAINER_SPACING - 1 }]}>
            <FlashList
              data={mappedGroupedEntries}
              extraData={selectedIds}
              renderItem={renderSection}
              getItemType={item => {
                return typeof item === 'string' ? 'sectionHeader' : 'row';
              }}
              contentContainerStyle={styles.listContentContainer}
              stickyHeaderHiddenOnScroll={true}
              estimatedItemSize={(dim.width - CONTAINER_SPACING * 2) / numberOfColumns}
              keyExtractor={item => {
                if (typeof item === 'string') {
                  return item;
                } else {
                  return JSON.stringify(item);
                }
              }}
            />
          </View>
        )}
      </View>
      <Button mode="contained" onPress={onPressContinue}>
        {t('general.continue')}
      </Button>
    </View>
  );
};

export default LearnBySelectedChar;

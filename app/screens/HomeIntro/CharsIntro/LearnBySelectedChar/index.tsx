import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, useWindowDimensions, Platform } from 'react-native';

//ThirdParty
import { Appbar, Button, Chip, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';

//App modules
import Components from 'app/components';
import styles from './styles';
import Hooks from 'app/hooks/index';
import { ISelectCharCellItem } from 'app/components/CharSelectCellItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LearnCharsType, LoggedInTabNavigatorParams } from 'app/navigation/types';
import { AppTheme } from 'app/models/theme';
import { isTablet } from 'react-native-device-info';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnBySelectedChar'>;

const CELL_SPACING = 3;
const CONTAINER_SPACING = 20;

const LearnBySelectedChar = ({ navigation, route }: Props) => {
  //Refs
  const refSelectedIds = useRef<Set<string>>(new Set([]));
  //Actions

  //Constants
  const { colors } = useTheme<AppTheme>();
  const { type, learnMode, isRandomMode, color } = route.params;
  const { t } = useTranslation();
  const dim = useWindowDimensions();
  const groupedEntries = Hooks.ChartItemForTypes.useSelectedChartItemForTypes(type);
  const mappedGroupedEntries = groupedEntries.map(v => [v.title, v.data]).flat(1);

  //States
  const [numberOfColumns, setNumberOfColumns] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set([]));
  const [parentWidth, setParentWidth] = useState<number | undefined>();

  useEffect(() => {
    const scaleFactor = isTablet() ? 2 : 1;

    switch (type) {
      case LearnCharsType.Vowel:
        setNumberOfColumns(3 * scaleFactor);
        break;

      case LearnCharsType.Constant:
        setNumberOfColumns(5 * scaleFactor);
        break;

      case LearnCharsType.Barakhadi:
        setNumberOfColumns(6 * scaleFactor);
        break;

      case LearnCharsType.Number:
        setNumberOfColumns(6 * scaleFactor);

        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    refSelectedIds.current = selectedIds;
  }, [selectedIds]);

  const cardTapped = useCallback((item: ISelectCharCellItem, index: number, sectionIndex: number) => {
    const newSelectedIds = new Set(refSelectedIds.current);
    if (newSelectedIds.has(`${index}-${sectionIndex}`)) {
      newSelectedIds.delete(`${index}-${sectionIndex}`);
    } else {
      newSelectedIds.add(`${index}-${sectionIndex}`);
    }
    setSelectedIds(newSelectedIds);
  }, []);

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
        parentWidth={parentWidth}
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

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onSelectCheckbox = useCallback(
    (index: number) => {
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
    },
    [mappedGroupedEntries],
  );

  const renderSectionHeader = useCallback(
    (titleText: string, index: number) => {
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
        <View style={styles.listHeaderView}>
          <Text style={[styles.listHeaderText, { color: colors.textTitle }]}>{titleText}</Text>
          <Chip
            selectedColor={allSelected ? colors.white : colors.primary}
            style={[styles.chipStyle, { backgroundColor: allSelected ? colors.primary : colors.white }]}
            textStyle={[styles.chipText, { color: allSelected ? colors.white : colors.primary }]}
            icon={allSelected ? 'check-circle' : 'check-circle-outline'}
            onPress={() => onSelectCheckbox(index)}>
            {allSelected ? t('learnBySelectedChar.unselectAll') : t('learnBySelectedChar.selectAll')}
          </Chip>
        </View>
      );
    },
    [colors.primary, colors.textTitle, colors.white, mappedGroupedEntries, onSelectCheckbox, selectedIds, t],
  );

  const onPressContinue = useCallback(() => {
    navigation.pop();
    setTimeout(() => {
      navigation.navigate('LearnCharsCard', {
        type,
        learnMode: learnMode,
        onlyInclude: selectedIds,
        isRandomMode: isRandomMode,
        color: color,
      });
    }, 500);
  }, [color, isRandomMode, learnMode, navigation, selectedIds, type]);

  const otherProps = Platform.OS === 'ios' ? { statusBarHeight: 0 } : {};
  return (
    <SafeAreaView
      onLayout={event => {
        setParentWidth(event.nativeEvent.layout.width);
      }}
      edges={['bottom']}
      style={[styles.container, { backgroundColor: `${color}15` }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }} {...otherProps}>
        <Appbar.Action icon={'chevron-down'} onPress={onGoBack} />
        <Appbar.Content title={t('learnBySelectedChar.header.title')} />
      </Appbar.Header>
      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        {!!numberOfColumns && parentWidth !== undefined && (
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
                  return item.map(v => v.title).join('');
                }
              }}
            />
          </View>
        )}
      </Components.AppBaseView>
      <Button
        style={styles.continueButton}
        contentStyle={styles.continueButtonContainer}
        disabled={selectedIds.size < 2}
        mode="contained"
        onPress={onPressContinue}>
        {t('general.continue')}
      </Button>
    </SafeAreaView>
  );
};

export default LearnBySelectedChar;

import React, { useCallback, useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';

//ThirdParty
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';

//App modules
import Components from 'app/components';
import { ICharCellItem } from 'app/components/CharCellItem';
import * as RouterParamTypes from 'app/config/router-params';
import Utils from 'app/utils';
import styles from './styles';

//Params
type RootStackParamList = {
  LearnVowelsCharInfo: RouterParamTypes.LearnCharInfoParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnVowelsCharInfo'>;

const LearnVowelsCharInfo = ({ navigation, route }: Props) => {
  //Refs
  const refFlatList = useRef<FlatList>(null);

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dimension = useWindowDimensions();
  const { index, sectionIndex, groupedEntries, type } = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);

  console.log('index', index);
  //States
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const cardTapped = (item: ICharCellItem, _index: number, _sectionIndex: number) => {
    Utils.rateApp.saveItem(item);
  };

  const renderItem = ({ item, index }: { item: ICharCellItem; index: number }) => {
    return (
      <View style={{ width: dimension.width, height: 'auto' }}>
        <Text style={[styles.headerText, { color: colors.text }]}>{item.gu}</Text>
        <View style={[styles.card, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
          <Components.AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.charactor')} value={item.gu} />
          <Components.AppTitleValueItemCell
            touchDisabled
            title={t('learnCharInfoScreen.diacritic')}
            value={item.diacritic}
          />
          <Components.AppTitleValueItemCell
            touchDisabled
            title={t('learnCharInfoScreen.englishCharactor')}
            value={item.en}
          />
          <Components.AppTitleValueItemCell
            touchDisabled
            title={t('learnCharInfoScreen.numberOfStrokes')}
            value={item.en}
          />
          <Components.AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.compaxity')} value={item.en} />
          <Components.AppTitleValueItemCell touchDisabled title={t('learnCharInfoScreen.length')} value={item.en} />
        </View>
        <View style={[styles.card, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
          <Components.AppTitleValueItemCell bold touchDisabled title={t('learnCharInfoScreen.moreInfo')} />
          <Components.AppTitleValueItemCell
            iconName="chevron-right"
            iconFamily="font-awesome"
            onPress={() => {}}
            title={t('learnCharInfoScreen.viewStrokeOrder')}
          />
          <Components.AppTitleValueItemCell
            iconName="chevron-right"
            iconFamily="font-awesome"
            onPress={() => {
              if (!showBottomSheet) {
                setShowBottomSheet(true);
              } else if (bottomSheetRef.current) {
                bottomSheetRef.current.snapToIndex(1);
              }
            }}
            title={t('learnCharInfoScreen.viewAnimatedDrawing')}
          />
          <Components.AppTitleValueItemCell
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

  const onGoBack = () => {
    navigation.pop();
  };

  // callbacks
  const handleSheetChange = useCallback((idx: number) => {
    console.log('handleSheetChange', idx);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnCharInfoScreen.header.title')} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <FlatList
          ref={refFlatList}
          removeClippedSubviews
          maxToRenderPerBatch={1}
          initialNumToRender={1}
          windowSize={3}
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          data={groupedEntries[sectionIndex].data}
          renderItem={renderItem}
          keyExtractor={photo => photo.id.toString()}
          style={{ width: dimension.width }}
          initialScrollIndex={index}
        />
      </View>
      {showBottomSheet && <Components.StrokeOrderBottomSheet ref={bottomSheetRef} onChange={handleSheetChange} />}
    </View>
  );
};

export default LearnVowelsCharInfo;

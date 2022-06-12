import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Dimensions, ScrollView, StatusBar, FlatList, useWindowDimensions } from 'react-native';

//ThirdParty
import { Appbar, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';

//App modules
import Components from 'app/components';
import styles from './styles';
import Utils from 'app/utils';
import Config from 'app/config';
import Hooks from 'app/hooks/index';
import { IVovelCharCellItem } from 'app/components/VowelCharCellItem';
import * as RouterParamTypes from 'app/config/router-params';
import BottomSheet from '@gorhom/bottom-sheet';

//Params
type RootStackParamList = {
  LearnVowelsCharInfo: RouterParamTypes.LearnVowelsCharInfoParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnVowelsCharInfo'>;

const LearnVowelsCharInfo = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dimension = useWindowDimensions();
  const groupedEntries = route.params.groupedEntries;
  const sectionIndex = route.params.sectionIndex;
  const bottomSheetRef = useRef<BottomSheet>(null);

  //States
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const cardTapped = (item: IVovelCharCellItem, _index: number, _sectionIndex: number) => {
    Utils.rateApp.saveItem(item);
  };

  const renderItem = ({ item, index }: { item: IVovelCharCellItem; index: number }) => {
    return (
      <View style={{ width: dimension.width, height: 'auto' }}>
        <Text style={[styles.headerText, { color: colors.text }]}>{item.gu}</Text>
        <View style={[styles.card, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
          <Components.AppTitleValueItemCell touchDisabled title={t('general.charactor')} value={item.gu} />
          <Components.AppTitleValueItemCell touchDisabled title={t('general.diacritic')} value="test" />
          <Components.AppTitleValueItemCell touchDisabled title={t('general.englishCharactor')} value={item.en} />
          <Components.AppTitleValueItemCell touchDisabled title={t('general.numberOfStrokes')} value={item.en} />
          <Components.AppTitleValueItemCell touchDisabled title={t('general.compaxity')} value={item.en} />
          <Components.AppTitleValueItemCell touchDisabled title={t('general.length')} value={item.en} />
        </View>
        <View style={[styles.card, { backgroundColor: `${colors.card}`, shadowColor: `${colors.shadow}` }]}>
          <Components.AppTitleValueItemCell bold touchDisabled title={t('general.moreInfo')} />
          <Components.AppTitleValueItemCell
            iconName="chevron-right"
            iconFamily="font-awesome"
            onPress={() => {}}
            title={t('general.viewStrokeOrder')}
          />
          <Components.AppTitleValueItemCell
            iconName="chevron-right"
            iconFamily="font-awesome"
            onPress={() => {
              //
              if (!showBottomSheet) {
                setShowBottomSheet(true);
              } else if (bottomSheetRef.current) {
                bottomSheetRef.current.snapToIndex(1);
              }
            }}
            title={t('general.viewAnimatedDrawing')}
          />
          <Components.AppTitleValueItemCell
            iconName="play-circle"
            iconFamily="font-awesome"
            leftIconSize={20}
            onPress={() => {}}
            title={t('general.playSound')}
          />
        </View>
      </View>
    );
  };

  const onGoBack = () => {
    navigation.pop();
  };

  // callbacks
  const handleSheetChange = useCallback(index => {
    console.log('handleSheetChange', index);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar translucent={false} backgroundColor={colors.background} />

      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnVowelsCharInfoScreen.header.title')} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <FlatList
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
        />
      </View>
      {showBottomSheet && <Components.StrokeOrderBottomSheet ref={bottomSheetRef} onChange={handleSheetChange} />}
    </View>
  );
};

export default LearnVowelsCharInfo;

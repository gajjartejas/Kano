import React, { useCallback, useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';

//ThirdParty
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';

//App modules
import Components from 'app/components';
import { ICharCellItem } from 'app/components/CharCellItem';
import * as RouterParamTypes from 'app/config/router-params';
import styles from './styles';

//Params
type RootStackParamList = {
  LearnCharInfo: RouterParamTypes.LearnCharInfoParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LearnCharInfo'>;

const LearnCharInfo = ({ navigation, route }: Props) => {
  //Refs
  const refFlatList = useRef<FlatList>(null);

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dimension = useWindowDimensions();
  const { index, sectionIndex, groupedEntries } = route.params;
  const bottomSheetRef = useRef<BottomSheet>(null);

  //States
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const renderItem = ({ item, index }: { item: ICharCellItem; index: number }) => {
    return (
      <Components.LearnCharInfoItemCell
        item={item}
        index={index}
        onPressViewAnimatedDrawing={onPressViewAnimatedDrawing}
      />
    );
  };

  const onPressViewAnimatedDrawing = (item: ICharCellItem, index: number) => {
    if (!showBottomSheet) {
      setShowBottomSheet(true);
    } else if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
    }
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
          onScrollToIndexFailed={() => {}}
        />
      </View>
      {showBottomSheet && <Components.StrokeOrderBottomSheet ref={bottomSheetRef} onChange={handleSheetChange} />}
    </View>
  );
};

export default LearnCharInfo;

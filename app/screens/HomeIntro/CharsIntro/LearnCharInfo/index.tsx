import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//App modules
import Components from 'app/components';
import { ICharCellItem } from 'app/components/CharCellItem';
import styles from './styles';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import useSoundPlayer from 'app/hooks/useAudioPlayer';
import useHintConfig from 'app/hooks/useHintConfig';
import useToastMessages from 'app/hooks/useToastMessages';
import useChartStatics from 'app/realm/crud/chartStatics';
import AppHeader from 'app/components/AppHeader';
//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharInfo'>;

const LearnCharInfo = ({ navigation, route }: Props) => {
  //Refs
  const refFlatList = useRef<FlatList | null>(null);

  //Actions

  //Constants
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { index: initialScrollIndex, sectionIndex, groupedEntries, color, type } = route.params;
  const insets = useSafeAreaInsets();
  const { play } = useSoundPlayer();
  const [, , chartHints] = useHintConfig();
  useToastMessages(chartHints);
  const { addChartStatics } = useChartStatics();

  //States
  const [currentIndex, setCurrentIndex] = useState(initialScrollIndex);

  useEffect(() => {
    addChartStatics({
      charId: groupedEntries[sectionIndex].data[currentIndex].id,
      createdDate: new Date(),
      sectionType: type,
      synced: false,
    });
  }, [addChartStatics, currentIndex, groupedEntries, sectionIndex, type]);

  useEffect(() => {
    setCurrentIndex(initialScrollIndex);
  }, [initialScrollIndex]);

  const onPressPlaySound = useCallback(
    (item: ICharCellItem, _index: number) => {
      if (play === null) {
        return;
      }
      play(item.audio);
    },
    [play],
  );

  const renderItem = ({ item, index }: { item: ICharCellItem; index: number }) => {
    return (
      <Components.LearnCharInfoItemCell
        item={item}
        index={index}
        onPressViewAnimatedDrawing={onPressViewAnimatedDrawing}
        onPressStrokeOrder={onPressStrokeOrder}
        onPressPlaySound={onPressPlaySound}
      />
    );
  };

  const onPressViewAnimatedDrawing = useCallback(
    (item: ICharCellItem, _index: number) => {
      navigation.navigate('LearnCharAnimatedDrawing', { svgPath: item.svg, color: color });
    },
    [color, navigation],
  );

  const onPressStrokeOrder = useCallback(
    (item: ICharCellItem, _index: number) => {
      navigation.navigate('LearnCharStrokeOrder', { svgPath: item.svg, color: color });
    },
    [color, navigation],
  );

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const getItemLayout = useCallback(
    (data: ArrayLike<ICharCellItem> | null | undefined, index: number) => ({
      length: width - insets.right - insets.left,
      offset: (width - insets.right - insets.left) * index,
      index,
    }),
    [insets.left, insets.right, width],
  );

  return (
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: `${color}15` }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('learnCharInfoScreen.header.title')}
        style={{ backgroundColor: `${color}15` }}
      />

      <Components.AppBaseView edges={[]} scroll={true} style={styles.safeArea}>
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
          style={{ width: width - insets.right - insets.left }}
          initialScrollIndex={initialScrollIndex}
          onScrollToIndexFailed={() => {}}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={event => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setCurrentIndex(index);
          }}
        />
      </Components.AppBaseView>
    </Components.AppBaseView>
  );
};

export default LearnCharInfo;

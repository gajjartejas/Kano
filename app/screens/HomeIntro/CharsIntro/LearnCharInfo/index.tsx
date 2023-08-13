import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';
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

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharInfo'>;

const LearnCharInfo = ({ navigation, route }: Props) => {
  //Refs
  const refFlatList = useRef<FlatList | null>(null);

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dimension = useWindowDimensions();
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
      length: dimension.width - insets.right - insets.left,
      offset: (dimension.width - insets.right - insets.left) * index,
      index,
    }),
    [dimension.width, insets.left, insets.right],
  );

  return (
    <View style={[styles.container, { backgroundColor: `${color}15` }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnCharInfoScreen.header.title')} />
      </Appbar.Header>
      <Components.AppBaseView scroll edges={['bottom', 'left', 'right']} style={styles.safeArea}>
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
          style={{ width: dimension.width - insets.right - insets.left }}
          initialScrollIndex={initialScrollIndex}
          onScrollToIndexFailed={() => {}}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={event => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
            setCurrentIndex(index);
          }}
        />
      </Components.AppBaseView>
    </View>
  );
};

export default LearnCharInfo;

import React, { useEffect, useRef, useState } from 'react';
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
  const { index: initialScrollIndex, sectionIndex, groupedEntries, color } = route.params;
  const insets = useSafeAreaInsets();
  const player = useSoundPlayer();

  //States
  const [, setCurrentIndex] = useState(initialScrollIndex);

  useEffect(() => {
    setCurrentIndex(initialScrollIndex);
  }, [initialScrollIndex]);

  const onPressPlaySound = (item: ICharCellItem, _index: number) => {
    player.play(item.audio);
  };

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

  const onPressViewAnimatedDrawing = (item: ICharCellItem, _index: number) => {
    navigation.navigate('LearnCharAnimatedDrawing', { svgPath: item.svg });
  };

  const onPressStrokeOrder = (item: ICharCellItem, _index: number) => {
    navigation.navigate('LearnCharStrokeOrder', { svgPath: item.svg });
  };

  const onGoBack = () => {
    navigation.pop();
  };

  //Callbacks

  const getItemLayout = (data: ArrayLike<ICharCellItem> | null | undefined, index: number) => ({
    length: dimension.width - insets.right - insets.left,
    offset: (dimension.width - insets.right - insets.left) * index,
    index,
  });

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

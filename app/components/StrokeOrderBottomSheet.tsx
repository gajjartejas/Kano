import React, { ForwardedRef, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

//Third Party
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { Text, useTheme } from 'react-native-paper';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const StrokeOrderBottomSheet = React.forwardRef<BottomSheet, any>((props, ref) => {
  //Const
  const data = useMemo(
    () =>
      Array(4)
        .fill(0)
        .map((_, index) => `${index}`),
    [],
  );
  const initialSnapPoints = useMemo(() => ['5%', 'CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);
  const { onChange } = props;

  const renderItem = useCallback(
    item => (
      <View key={item} style={styles.itemContainer}>
        <Text style={{ fontSize: 100, alignSelf: 'center' }}>{item}</Text>
      </View>
    ),
    [],
  );

  return (
    <BottomSheet
      backdropComponent={CustomBackdrop}
      style={{
        shadowRadius: 8,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        elevation: 8,
        shadowOpacity: 0.2,
      }}
      enablePanDownToClose
      animateOnMount
      ref={ref}
      index={1}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onChange={onChange}>
      <BottomSheetScrollView onLayout={handleContentLayout} contentContainerStyle={styles.contentContainer}>
        {data.map(renderItem)}
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const { colors } = useTheme();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));
  const containerStyle = useMemo(
    () => [style, { backgroundColor: colors.backdrop }, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  );
  return <Animated.View pointerEvents={'none'} style={containerStyle} />;
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default StrokeOrderBottomSheet;

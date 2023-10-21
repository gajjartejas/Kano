import React, { memo } from 'react';
import { ICharCellItem } from 'app/components/CharCellItem';
import TinderCard from 'react-tinder-card';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import Animated, { Easing, FadeIn, Layout } from 'react-native-reanimated';
import styles from 'app/screens/HomeIntro/LearnCharsCard/styles';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import { AnimatedStrokeEasingFunction } from 'app/components/AnimatedStroke';
import { AppTheme } from 'app/models/theme';
import { View } from 'react-native';

interface ISwipeCardProps {
  onSwipe: (direction: any) => void;
  onPress: () => void;
  index: number;
  color: string;
  width: number;
  initialDelay: any;
  duration: any;
  emptyStroke: any;
  highlightStroke: any;
  arrowFill: any;
  stroke: any;
  disableStrokeAnimation: any;
  showArrow: any;
  strokeWidth: any;
  play: boolean;
  item: ICharCellItem;
  arrowSymbol: any;
  arrowFontSize: any;
  easing: AnimatedStrokeEasingFunction;
  groupCount: number;
}

const SwipeCard = (props: ISwipeCardProps) => {
  const { colors } = useTheme<AppTheme>();

  return (
    <TinderCard onSwipe={props.onSwipe} swipeRequirementType={'position'} swipeThreshold={100} preventSwipe={[]}>
      <TouchableRipple rippleColor={`${colors.primary}20`} onPress={props.onPress}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: `${props.color}30`,
              width: props.width * 0.7,
              height: props.width * 0.7,
              top: (-props.width * 0.7) / 2 - 50,
              left: (-props.width * 0.7) / 2,
            },
          ]}>
          <Animated.View
            entering={FadeIn.duration(1200).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
            layout={Layout.springify()}
            style={styles.animatedView}>
            <AnimatedCharacter
              initialDelay={props.initialDelay}
              duration={props.duration}
              emptyStroke={props.emptyStroke}
              highlightStroke={props.highlightStroke}
              arrowFill={props.arrowFill}
              stroke={props.stroke}
              disableStrokeAnimation={props.disableStrokeAnimation}
              showArrow={props.showArrow}
              strokeWidth={props.strokeWidth}
              play={props.play}
              path={props.item.svg}
              arrowSymbol={props.arrowSymbol}
              arrowFontSize={props.arrowFontSize}
              easing={props.easing}
            />
          </Animated.View>
          <Text style={[styles.subtitleText, { color: colors.text }]}>{props.item.en}</Text>
        </View>
      </TouchableRipple>
    </TinderCard>
  );
};

export default memo(SwipeCard, (p, n) => {
  return (
    p.width === n.width && p.item.id === n.item.id && p.play === n.play && p.item.totalLength === n.item.totalLength
  );
});

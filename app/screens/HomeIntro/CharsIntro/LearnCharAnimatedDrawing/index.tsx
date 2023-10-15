import React, { useCallback, useState } from 'react';
import { Platform, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';

//App modules
import styles from './styles';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import Animated, { Easing, FadeIn, SlideInDown } from 'react-native-reanimated';
import { easingSymbols } from 'app/config/extra-symbols';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';
import AppHeader from 'app/components/AppHeader';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharAnimatedDrawing'>;

const LearnCharAnimatedDrawing = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { t } = useTranslation();
  const { svgPath, color } = route.params;

  const [
    initialDelay,
    duration,
    strokeWidth,
    arrowFontSize,
    arrowSymbol,
    easingId,
    emptyStroke,
    highlightStroke,
    arrowFill,
    stroke,
    disableStrokeAnimation,
    showArrow,
  ] = useCardAnimationConfigStore(store => [
    store.initialDelay,
    store.duration,
    store.strokeWidth,
    store.arrowFontSize,
    store.arrowSymbol,
    store.easingId,
    store.emptyStroke,
    store.highlightStroke,
    store.arrowFill,
    store.stroke,
    store.disableStrokeAnimation,
    store.showArrow,
  ]);

  //States
  const [show, setShow] = useState(false);
  const [playing, setPlaying] = useState(true);

  React.useEffect(() => {
    return navigation.addListener('transitionEnd', () => {
      setShow(true);
    });
  }, [navigation, svgPath]);

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onPressRepeat = useCallback(() => {
    setPlaying(false);
    setTimeout(() => {
      setPlaying(true);
    }, 100);
  }, []);

  const otherProps = Platform.OS === 'ios' ? { statusBarHeight: 0 } : {};
  return (
    <View style={[styles.container, { backgroundColor: `${color}15` }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('LearnCharAnimatedDrawing.header.title')}
        backArrowImage={'chevron-down'}
        style={{ backgroundColor: `${color}15` }}
        largeHeader={true}
        {...otherProps}
      />

      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {show && (
            <Animated.View
              style={styles.contentContainer1}
              entering={FadeIn.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
              layout={SlideInDown.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}>
              <AnimatedCharacter
                initialDelay={initialDelay}
                duration={duration}
                emptyStroke={emptyStroke}
                highlightStroke={highlightStroke}
                arrowFill={arrowFill}
                stroke={stroke}
                disableStrokeAnimation={disableStrokeAnimation}
                showArrow={showArrow}
                strokeWidth={strokeWidth}
                play={playing}
                path={svgPath}
                arrowSymbol={arrowSymbol}
                arrowFontSize={arrowFontSize}
                easing={easingSymbols.filter(v => v.id === easingId)[0].easing}
              />
            </Animated.View>
          )}
          {show && (
            <Button icon="reload" mode="text" onPress={onPressRepeat}>
              {t('LearnCharAnimatedDrawing.repeat')}
            </Button>
          )}
        </View>
      </Components.AppBaseView>
    </View>
  );
};

export default LearnCharAnimatedDrawing;

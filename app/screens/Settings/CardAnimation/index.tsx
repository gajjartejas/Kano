import React, { useCallback, useState } from 'react';
import { View, ScrollView, Appearance } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useTheme, Button } from 'react-native-paper';
import Animated, { Easing, FadeIn, Layout } from 'react-native-reanimated';
import Slider from '@react-native-community/slider';

//App modules
import styles from './styles';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import { ArrowRow, ColorRow, RowTitle, SwitchRow } from 'app/components/CardAnimationRow';
import { easingSymbols, symbolsArray } from 'app/config/extra-symbols';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';
import useThemeConfigStore, { IAppearanceType } from 'app/store/themeConfig';
import useDelayedEffect from 'app/hooks/useDelayedEffect';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import AppHeader from 'app/components/AppHeader';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'CardAnimation'>;

const CardAnimation = ({ navigation }: Props) => {
  //Refs

  //Action

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const appearance = useThemeConfigStore(store => store.appearance);
  const setTheme = useCardAnimationConfigStore(store => store.setTheme);
  const reset = useCardAnimationConfigStore(store => store.reset);
  const largeScreenMode = useLargeScreenMode();

  //States
  const [play, setPlay] = useCardAnimationConfigStore(store => [store.play, store.setPlay]);
  const [initialDelay, setInitialDelay] = useCardAnimationConfigStore(store => [
    store.initialDelay,
    store.setInitialDelay,
  ]);
  const [duration, setDuration] = useCardAnimationConfigStore(store => [store.duration, store.setDuration]);
  const [strokeWidth, setStrokeWidth] = useCardAnimationConfigStore(store => [store.strokeWidth, store.setStrokeWidth]);
  const [arrowFontSize, setArrowFontSize] = useCardAnimationConfigStore(store => [
    store.arrowFontSize,
    store.setArrowFontSize,
  ]);
  const [arrowSymbol, setArrowSymbol] = useCardAnimationConfigStore(store => [store.arrowSymbol, store.setArrowSymbol]);
  const [easingId, setEasingId] = useCardAnimationConfigStore(store => [store.easingId, store.setEasingId]);
  const [emptyStroke, setEmptyStroke] = useCardAnimationConfigStore(store => [store.emptyStroke, store.setEmptyStroke]);
  const [arrowFill, setArrowFill] = useCardAnimationConfigStore(store => [store.arrowFill, store.setArrowFill]);
  const [stroke, setStroke] = useCardAnimationConfigStore(store => [store.stroke, store.setStroke]);
  const [disableStrokeAnimation, setDisableStrokeAnimation] = useCardAnimationConfigStore(store => [
    store.disableStrokeAnimation,
    store.setDisableStrokeAnimation,
  ]);
  const [showArrow, setShowArrow] = useCardAnimationConfigStore(store => [store.showArrow, store.setShowArrow]);
  const [isReady, setIsReady] = useState(false);

  useDelayedEffect(
    () => {
      setIsReady(true);
    },
    false,
    200,
    [navigation],
  );

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onPressReset = useCallback(() => {
    setTheme(appearance === IAppearanceType.Auto ? Appearance.getColorScheme() === 'dark' : appearance === 'dark');
    reset();
  }, [appearance, reset, setTheme]);

  return (
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={t('cardAnimation.header.title')}
        style={{ backgroundColor: colors.background }}
      />

      {isReady && (
        <Components.AppBaseView edges={[]} style={styles.safeArea}>
          <View style={styles.subView}>
            <View style={[styles.listContainer, largeScreenMode && styles.cardTablet]}>
              <View style={largeScreenMode && [styles.rightSpacing32]}>
                <Animated.View
                  entering={FadeIn.duration(1200).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
                  layout={Layout.springify()}
                  style={styles.animatedChar}>
                  <AnimatedCharacter
                    initialDelay={initialDelay}
                    duration={duration}
                    emptyStroke={emptyStroke}
                    highlightStroke={stroke}
                    arrowFill={arrowFill}
                    stroke={stroke}
                    disableStrokeAnimation={disableStrokeAnimation}
                    showArrow={showArrow}
                    strokeWidth={strokeWidth}
                    play={play}
                    path={'svgs/barakhadi/1_k/1_ka.svg'}
                    arrowSymbol={arrowSymbol}
                    arrowFontSize={arrowFontSize}
                    easing={easingSymbols.filter(v => v.id === easingId)[0].easing}
                  />
                </Animated.View>

                <View style={styles.buttonContainer}>
                  <Button
                    icon="reload"
                    mode="text"
                    onPress={() => {
                      setPlay(false);
                      setTimeout(() => {
                        setPlay(true);
                      }, 100);
                    }}>
                    {t('cardAnimation.replay')}
                  </Button>
                  <Button icon="trash-can-outline" mode="text" onPress={onPressReset}>
                    {t('cardAnimation.reset')}
                  </Button>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.wrapRow}>
                  <View style={[styles.halfWidth, styles.rowMargin]}>
                    <RowTitle title={t('cardAnimation.initDelay', { id20001: initialDelay / 1000 })} />
                    <Slider
                      style={styles.slider}
                      value={initialDelay}
                      onSlidingComplete={v => setInitialDelay(v)}
                      minimumValue={1000}
                      step={500}
                      maximumValue={10000}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.primary}
                      thumbTintColor={colors.primary}
                    />
                  </View>
                  <View style={[styles.halfWidth, styles.rowMargin]}>
                    <RowTitle title={t('cardAnimation.duration', { id20002: duration / 1000 })} />
                    <Slider
                      style={styles.slider}
                      value={duration}
                      onSlidingComplete={v => setDuration(v)}
                      minimumValue={0}
                      step={500}
                      maximumValue={10000}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.primary}
                      thumbTintColor={colors.primary}
                    />
                  </View>

                  <View style={[styles.halfWidth, styles.rowMargin]}>
                    <RowTitle title={t('cardAnimation.strokeWidth', { id20003: strokeWidth })} />
                    <Slider
                      style={styles.slider}
                      value={strokeWidth}
                      onSlidingComplete={v => setStrokeWidth(v)}
                      minimumValue={0}
                      step={0.5}
                      maximumValue={6}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.primary}
                      thumbTintColor={colors.primary}
                    />
                  </View>
                  <View style={[styles.halfWidth, styles.rowMargin]}>
                    <RowTitle title={t('cardAnimation.arrowFont', { id20004: arrowFontSize })} />
                    <Slider
                      style={styles.slider}
                      value={arrowFontSize}
                      onSlidingComplete={v => setArrowFontSize(v)}
                      minimumValue={1}
                      step={1}
                      maximumValue={10}
                      minimumTrackTintColor={colors.primary}
                      maximumTrackTintColor={colors.primary}
                      thumbTintColor={colors.primary}
                    />
                  </View>

                  <ColorRow
                    style={[styles.halfWidth, styles.rowMargin]}
                    label={t('cardAnimation.emptyStroke')}
                    color={emptyStroke}
                    onColor={color => setEmptyStroke(color)}
                  />
                  <ColorRow
                    style={[styles.halfWidth, styles.rowMargin]}
                    label={'Arrow'}
                    color={arrowFill}
                    onColor={v => setArrowFill(v)}
                  />
                  <ColorRow
                    style={[styles.halfWidth, styles.rowMargin]}
                    label={t('cardAnimation.stroke')}
                    color={stroke}
                    onColor={v => setStroke(v)}
                  />
                </View>

                <SwitchRow
                  style={styles.rowMargin}
                  label={t('cardAnimation.disableStrokeAnimation')}
                  value={disableStrokeAnimation}
                  onValueChange={v => setDisableStrokeAnimation(v)}
                />
                <SwitchRow
                  style={styles.rowMargin}
                  label={t('cardAnimation.showArrow')}
                  value={showArrow}
                  onValueChange={v => setShowArrow(v)}
                />

                <RowTitle style={styles.rowMargin} title={t('cardAnimation.arrowSymbol')} />
                <View style={styles.wrapRow}>
                  {symbolsArray.map(v => {
                    return (
                      <ArrowRow key={v} onPress={() => setArrowSymbol(v)} arrow={v} selected={v === arrowSymbol} />
                    );
                  })}
                </View>

                <RowTitle style={styles.rowMargin} title={t('cardAnimation.animationEasing')} />
                <View style={[styles.wrapRow, styles.bottomOffset]}>
                  {easingSymbols.map(v => {
                    return (
                      <ArrowRow
                        key={v.symbol}
                        onPress={() => setEasingId(v.id)}
                        arrow={v.symbol}
                        name={v.name.toUpperCase()}
                        selected={v.id === easingId}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </Components.AppBaseView>
      )}
    </Components.AppBaseView>
  );
};

export default CardAnimation;

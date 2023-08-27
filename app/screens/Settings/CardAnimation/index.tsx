import React from 'react';
import { View, ScrollView } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, useTheme, Button } from 'react-native-paper';
import Animated, { Easing, FadeIn, Layout } from 'react-native-reanimated';

//App modules
import styles from './styles';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import Slider from '@react-native-community/slider';
import { ArrowRow, ColorRow, RowTitle, SwitchRow } from 'app/components/CardAnimationRow';
import { easingSymbols, symbolsArray } from 'app/config/extra-symbols';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';
import { isTablet } from 'react-native-device-info';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'CardAnimation'>;

const CardAnimation = ({ navigation }: Props) => {
  //Refs

  //Action

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();

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
  const [highlightStroke, setHighlightStroke] = useCardAnimationConfigStore(store => [
    store.highlightStroke,
    store.setHighlightStroke,
  ]);
  const [arrowFill, setArrowFill] = useCardAnimationConfigStore(store => [store.arrowFill, store.setArrowFill]);
  const [stroke, setStroke] = useCardAnimationConfigStore(store => [store.stroke, store.setStroke]);
  const [disableStrokeAnimation, setDisableStrokeAnimation] = useCardAnimationConfigStore(store => [
    store.disableStrokeAnimation,
    store.setDisableStrokeAnimation,
  ]);
  const [showArrow, setShowArrow] = useCardAnimationConfigStore(store => [store.showArrow, store.setShowArrow]);

  const clear = useCardAnimationConfigStore(store => store.clear);

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('cardAnimation.header.title')} />
      </Appbar.Header>
      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <View style={styles.subView}>
          <View style={[styles.listContainer, isTablet() && styles.cardTablet]}>
            <Animated.View
              entering={FadeIn.duration(1200).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
              layout={Layout.springify()}
              style={styles.animatedChar}>
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
              <Button icon="trash-can-outline" mode="text" onPress={clear}>
                {t('cardAnimation.reset')}
              </Button>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.wrapRow}>
                <View style={[styles.halfWidth, styles.rowMargin]}>
                  <RowTitle title={t('cardAnimation.initDelay')} />
                  <Slider
                    value={initialDelay}
                    onSlidingComplete={v => setInitialDelay(v)}
                    minimumValue={0}
                    step={100}
                    maximumValue={1000}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.primary}
                    thumbTintColor={colors.primary}
                  />
                </View>
                <View style={[styles.halfWidth, styles.rowMargin]}>
                  <RowTitle title={t('cardAnimation.duration')} />
                  <Slider
                    value={duration}
                    onSlidingComplete={v => setDuration(v)}
                    minimumValue={0}
                    step={1000}
                    maximumValue={10000}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.primary}
                    thumbTintColor={colors.primary}
                  />
                </View>

                <View style={[styles.halfWidth, styles.rowMargin]}>
                  <RowTitle title={t('cardAnimation.strokeWidth')} />
                  <Slider
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
                  <RowTitle title={t('cardAnimation.arrowFont')} />
                  <Slider
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
                  label={t('cardAnimation.highlightStroke')}
                  color={highlightStroke}
                  onColor={color => setHighlightStroke(color)}
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
                  return <ArrowRow key={v} onPress={() => setArrowSymbol(v)} arrow={v} selected={v === arrowSymbol} />;
                })}
              </View>

              <RowTitle style={styles.rowMargin} title={t('cardAnimation.animationEasing')} />
              <View style={styles.wrapRow}>
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
    </View>
  );
};

export default CardAnimation;
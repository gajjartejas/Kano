import React, { useCallback } from 'react';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, useTheme } from 'react-native-paper';

//App modules
import styles from './styles';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import useSvgReader from 'app/hooks/useSvgReader';
import Animated, { Easing, FadeIn, SlideInDown } from 'react-native-reanimated';
import useCardAnimationConfigStore from 'app/store/cardAnimationConfig';
import { easingSymbols } from 'app/config/extra-symbols';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharStrokeOrder'>;

const LearnCharStrokeOrder = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { parsedSvg, readSvg } = useSvgReader();
  const { width } = useWindowDimensions();
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
    store.showArrow,
  ]);

  //States

  React.useEffect(() => {
    return navigation.addListener('transitionEnd', () => {
      readSvg(svgPath);
    });
  }, [navigation, readSvg, svgPath]);

  const onGoBack = useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const otherProps = Platform.OS === 'ios' ? { statusBarHeight: 0 } : {};
  return (
    <View style={[styles.container, { backgroundColor: `${color}15` }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }} {...otherProps}>
        <Appbar.Action icon={'chevron-down'} onPress={onGoBack} />
        <Appbar.Content title={t('LearnCharStrokeOrder.header.title')} />
      </Appbar.Header>
      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <ScrollView>
          <View style={[styles.contentContainer]}>
            {!!svgPath && (
              <Animated.View
                style={styles.contentContainer1}
                entering={FadeIn.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
                layout={SlideInDown.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}>
                {parsedSvg?.groups.map((g, gidx) => {
                  return g.svgClipPaths.map((p, pidx) => {
                    return (
                      <View
                        style={[styles.animatedCharContainer, { width: width * 0.6, height: width * 0.6 }]}
                        key={p.id + g.id}>
                        <AnimatedCharacter
                          key={p.id + g.id}
                          highlightGroupIndex={gidx}
                          highlightStrokeIndex={pidx}
                          initialDelay={initialDelay}
                          duration={duration}
                          emptyStroke={emptyStroke}
                          highlightStroke={highlightStroke}
                          arrowFill={arrowFill}
                          stroke={stroke}
                          disableStrokeAnimation={true}
                          showArrow={showArrow}
                          strokeWidth={strokeWidth}
                          path={svgPath}
                          arrowSymbol={arrowSymbol}
                          arrowFontSize={arrowFontSize}
                          easing={easingSymbols.filter(v => v.id === easingId)[0].easing}
                        />
                      </View>
                    );
                  });
                })}
              </Animated.View>
            )}
          </View>
        </ScrollView>
      </Components.AppBaseView>
    </View>
  );
};

export default LearnCharStrokeOrder;

import React from 'react';
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
  const { svgPath } = route.params;

  //States

  React.useEffect(() => {
    return navigation.addListener('transitionEnd', () => {
      readSvg(svgPath);
    });
  }, [navigation, readSvg, svgPath]);

  const onGoBack = () => {
    navigation.pop();
  };

  const otherProps = Platform.OS === 'ios' ? { statusBarHeight: 0 } : {};
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                          arrowFill={`${colors.onBackground}`}
                          emptyStroke={`${colors.onSurface}20`}
                          stroke={`${colors.onSurface}20`}
                          highlightStroke={`${colors.primary}`}
                          highlightGroupIndex={gidx}
                          highlightStrokeIndex={pidx}
                          strokeWidth={6}
                          path={svgPath}
                          disableStrokeAnimation={true}
                          showArrow={true}
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

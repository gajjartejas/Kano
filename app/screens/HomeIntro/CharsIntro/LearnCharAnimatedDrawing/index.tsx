import React, { useCallback, useRef, useState } from 'react';
import { Platform, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, Button, useTheme } from 'react-native-paper';

//App modules
import styles from './styles';
import AnimatedCharacter, { IAnimatedCharacterRef } from 'app/components/AnimatedCharacter';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import Animated, { Easing, FadeIn, SlideInDown } from 'react-native-reanimated';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'LearnCharAnimatedDrawing'>;

const LearnCharAnimatedDrawing = ({ navigation, route }: Props) => {
  //Refs
  const refAnimatedCharacter = useRef<IAnimatedCharacterRef | null>(null);

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { svgPath, color } = route.params;

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
      <Appbar.Header style={{ backgroundColor: colors.background }} {...otherProps}>
        <Appbar.Action icon={'chevron-down'} onPress={onGoBack} />
        <Appbar.Content title={t('LearnCharAnimatedDrawing.header.title')} />
      </Appbar.Header>
      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {show && (
            <Animated.View
              style={styles.contentContainer1}
              entering={FadeIn.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
              layout={SlideInDown.duration(600).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}>
              <AnimatedCharacter
                ref={refAnimatedCharacter}
                arrowFill={`${colors.onBackground}`}
                emptyStroke={`${colors.onSurface}20`}
                stroke={`${colors.primary}`}
                highlightStroke={`${colors.primary}`}
                strokeWidth={6}
                path={svgPath}
                play={playing}
                showArrow={true}
                initialDelay={0}
                duration={4000}
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

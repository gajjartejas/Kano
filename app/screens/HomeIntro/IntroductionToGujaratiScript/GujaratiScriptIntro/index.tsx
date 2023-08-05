import React, { useState } from 'react';
import { View } from 'react-native';

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

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'GujaratiScriptIntro'>;

const GujaratiScriptIntro = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();

  //States
  const [show, setShow] = useState(false);

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnIntroScreen.header.title')} />
      </Appbar.Header>
      <Components.AppBaseView edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <Button
          onPress={() => {
            setShow(!show);
          }}>
          {'Animate'}
        </Button>
        {show && (
          <Animated.View
            entering={FadeIn.duration(1200).easing(Easing.bezierFn(1, 0, 0.17, 0.98))}
            layout={Layout.springify()}
            style={styles.animatedChar}>
            <AnimatedCharacter
              emptyStroke="#ffffff10"
              stroke="#ff0000"
              showArrow={true}
              strokeWidth={6}
              play
              initialDelay={0}
              path={'svgs/barakhadi/1_k/1_ka.svg'}
              duration={1000}
            />
          </Animated.View>
        )}
      </Components.AppBaseView>
    </View>
  );
};

export default GujaratiScriptIntro;

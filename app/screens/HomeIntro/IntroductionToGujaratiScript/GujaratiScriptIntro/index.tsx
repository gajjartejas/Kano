import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, useTheme, Button } from 'react-native-paper';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import Animated, { Easing, FadeIn, Layout } from 'react-native-reanimated';
var RNFS = require('react-native-fs');

//App modules
import * as RouterParamTypes from 'app/config/router-params';
import styles from './styles';

//Params
type RootStackParamList = {
  GujaratiScriptIntro: RouterParamTypes.GujaratiScriptIntroParams;
};

type Props = NativeStackScreenProps<RootStackParamList, 'GujaratiScriptIntro'>;

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

  useEffect(() => {
    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log(contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnIntroScreen.header.title')} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        {/* <ScrollView style={styles.scrollView}>
          <Text>{'\n\n    WIP: Work In Progress...'}</Text>
        </ScrollView> */}
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
            style={{ flex: 1 }}>
            <AnimatedCharacter
              emptyStroke="#00000020"
              stroke="black"
              strokeWidth={6}
              initialDelay={0}
              path={'svgs/29_sh'}
              name={'0_sh.svg'}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default GujaratiScriptIntro;

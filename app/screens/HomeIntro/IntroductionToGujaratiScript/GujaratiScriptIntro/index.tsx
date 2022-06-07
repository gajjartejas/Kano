import React from 'react';
import { View, Dimensions, ScrollView, StatusBar } from 'react-native';

//ThirdParty
import { Appbar, Text, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

//App modules
import Components from 'app/components';
import styles from './styles';
import Utils from 'app/utils';
import Config from 'app/config';
import Hooks from 'app/hooks/index';

//Params
type RootStackParamList = {
  GujaratiScriptIntro: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'GujaratiScriptIntro'>;

const GujaratiScriptIntro = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();

  //States

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar translucent={false} backgroundColor={colors.background} />

      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnIntroScreen.header.title')} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Text>{'\n\n    Work In Progress...'}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default GujaratiScriptIntro;

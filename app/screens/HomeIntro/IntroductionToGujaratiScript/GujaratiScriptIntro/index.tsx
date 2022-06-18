import React from 'react';
import { ScrollView, View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Appbar, Text, useTheme } from 'react-native-paper';

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

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={t('learnIntroScreen.header.title')} subtitle="" />
      </Appbar.Header>
      <View style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <Text>{'\n\n    WIP: Work In Progress...'}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default GujaratiScriptIntro;

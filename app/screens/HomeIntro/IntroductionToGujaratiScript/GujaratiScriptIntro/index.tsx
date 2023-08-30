import React, { Fragment, useEffect } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Appbar, useTheme } from 'react-native-paper';

//App modules
import styles from './styles';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import { useMarkdown, useMarkdownHookOptions } from 'react-native-marked';
import useThemeConfigStore from 'app/store/themeConfig';
import { ColorSchemeName } from 'react-native/Libraries/Utilities/Appearance';
import useOtherStatics from 'app/realm/crud/otherStatics';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'GujaratiScriptIntro'>;

const GujaratiScriptIntro = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { title, content, type } = route.params;
  const colorScheme = useThemeConfigStore(store => store.appearance) as ColorSchemeName;
  const options: useMarkdownHookOptions = {
    colorScheme,
  };
  const elements = useMarkdown(content, options);
  const { addOtherStatics } = useOtherStatics();

  //States

  useEffect(() => {
    addOtherStatics({
      sectionType: type,
      createdDate: new Date(),
      synced: false,
    });
  }, [addOtherStatics, type]);

  const onGoBack = () => {
    navigation.pop();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={onGoBack} />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <Components.AppBaseView scroll={true} edges={['bottom', 'left', 'right']} style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {elements.map((element, index) => {
            return <Fragment key={`demo_${index}`}>{element}</Fragment>;
          })}
        </View>
      </Components.AppBaseView>
    </View>
  );
};

export default GujaratiScriptIntro;

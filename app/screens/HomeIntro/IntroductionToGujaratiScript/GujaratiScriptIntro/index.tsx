import React, { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';

//App modules
import styles from './styles';
import Components from 'app/components';
import { LoggedInTabNavigatorParams } from 'app/navigation/types';
import { useMarkdown, useMarkdownHookOptions } from 'react-native-marked';
import useThemeConfigStore from 'app/store/themeConfig';
import useOtherStatics from 'app/realm/crud/otherStatics';
import useDelayedEffect from 'app/hooks/useDelayedEffect';
import AppHeader from 'app/components/AppHeader';

//Params
type Props = NativeStackScreenProps<LoggedInTabNavigatorParams, 'GujaratiScriptIntro'>;

const GujaratiScriptIntro = ({ navigation, route }: Props) => {
  //Refs

  //Actions

  //Constants
  const { title, content, type, color } = route.params;
  const isDark = useThemeConfigStore(store => store.isDark);
  const options: useMarkdownHookOptions = { colorScheme: isDark ? 'dark' : 'light' };
  const elements = useMarkdown(content, options);
  const { addOtherStatics } = useOtherStatics();

  //States
  const [isReady, setIsReady] = useState(false);

  useDelayedEffect(
    () => {
      setIsReady(true);
    },
    false,
    400,
    [navigation],
  );

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
    <Components.AppBaseView
      edges={['bottom', 'left', 'right']}
      style={[styles.container, { backgroundColor: `${color}15` }]}>
      <AppHeader
        showBackButton={true}
        onPressBackButton={onGoBack}
        title={title}
        style={{ backgroundColor: `${color}15` }}
      />

      {isReady && (
        <Components.AppBaseView edges={[]} scroll={true} style={styles.safeArea}>
          <View style={styles.contentContainer}>
            {elements.map((element, index) => {
              return <Fragment key={`demo_${index}`}>{element}</Fragment>;
            })}
          </View>
        </Components.AppBaseView>
      )}
    </Components.AppBaseView>
  );
};

export default GujaratiScriptIntro;

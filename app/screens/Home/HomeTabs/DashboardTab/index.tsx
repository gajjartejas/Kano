import React, { useState } from 'react';
import { View } from 'react-native';

//ThirdParty
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

//App Modules
import Components from 'app/components';
import { IAdsActivity } from 'app/components/DashboardItem';
import Utils from 'app/utils';
import AnimatedCharacter from 'app/components/AnimatedCharacter';
import Animated, { Easing, FadeIn, Layout } from 'react-native-reanimated';

//Params
type RootStackParamList = {
  DashboardTab: { userId: string };
  Purchase: {};
};

type Props = NativeStackScreenProps<RootStackParamList, 'DashboardTab'>;

const DashboardTab = ({ navigation }: Props) => {
  //Refs

  //Actions

  //Constants
  const { colors } = useTheme();
  const { t } = useTranslation();

  //States
  const [show, setShow] = useState(false);

  const cardTapped = (item: IAdsActivity, _index: number) => {
    Utils.rateApp.saveItem(item);
  };

  const renderItem = ({ item, index }: { item: IAdsActivity; index: number; sectionIndex: number }) => {
    return <Components.DashboardItem key={item.id} item={item} index={index} onPress={cardTapped} />;
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 100,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      }}>
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
            path={'assets/svgs'}
            name={'ka.svg'}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default DashboardTab;

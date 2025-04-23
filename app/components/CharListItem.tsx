import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';

//App Modules
import CircularProgress from './CircularProgress';
import { AppTheme } from 'app/models/theme';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import CommonIcon, { IconType } from 'app/components/CommonIcon';
import Config from 'app/config';

//Interface
export interface ICharListItem {
  id: number;
  title: string;
  subTitle: string;
  iconName: string;
  iconFamily: IconType;
  color: string;
}

export interface ICharListSection {
  title: string;
  data: ICharListItem[];
}

//Interface
interface ICharListItemProps {
  item: ICharListItem;
  index: number;
  sectionIndex: number;
  progress: number;
  onPress: (item: ICharListItem, index: number, sectionIndex: number) => void;
}

const CharListItem = (props: ICharListItemProps) => {
  //Const
  const { colors } = useTheme<AppTheme>();
  const { item, index, progress } = props;
  const sectionIndex = props.sectionIndex;
  const largeScreenMode = useLargeScreenMode();
  const width = largeScreenMode ? '49%' : '100%';

  return (
    <View
      style={[styles.container, { width: width, backgroundColor: `${item.color}`, shadowColor: `${colors.shadow}` }]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        style={[styles.touchableButton, { backgroundColor: `${colors.card}20` }]}
        onPress={() => props.onPress(item, index, sectionIndex)}>
        <View style={styles.iconTextContainer}>
          <View style={styles.iconTextContainer1}>
            <View style={styles.iconContainer}>
              <CommonIcon
                style={styles.leftIcon}
                type={item.iconFamily}
                name={item.iconName}
                color={colors.white}
                size={44}
              />
            </View>
            <View style={styles.textContainer}>
              <Text numberOfLines={2} style={[styles.titleText, { color: colors.white }]}>
                {item.title}
              </Text>
              <Text numberOfLines={2} style={[styles.subTitleText, { color: `${colors.white}` }]}>
                {item.subTitle}
              </Text>
            </View>
          </View>

          <CircularProgress
            style={[styles.circularProgress]}
            textColor={colors.white}
            fill={'transparent'}
            textSize={12}
            pgColor={colors.white}
            bgColor={`${colors.card}20`}
            size={44}
            text={`${Math.round(progress * 1000) / 10}%`}
            strokeWidth={4}
            progressPercent={progress * 100}
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowOpacity: 0.2,
    height: 98,
    marginBottom: 8,
  },
  touchableButton: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 16,
    fontFamily: Config.Fonts.NotoSansGujarati.Regular,
  },
  subTitleText: {
    fontSize: 13,
    fontWeight: '400',
    marginTop: 4,
    fontFamily: Config.Fonts.NotoSansGujarati.Regular,
  },
  circularProgress: {
    marginHorizontal: 20,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 8,
    shadowOpacity: 0.41,
    borderRadius: 20,
  },
  iconTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconTextContainer1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    alignSelf: 'center',
  },
  iconContainer: {
    marginHorizontal: 20,
    width: 44,
  },
  textContainer: {
    marginRight: 8,
    flex: 1,
  },
});

export default memo(CharListItem);

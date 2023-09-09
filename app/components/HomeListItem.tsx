import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';

//Third Party
import { TouchableRipple, useTheme, Text } from 'react-native-paper';
import Icon from 'react-native-easy-icon';
import { IconType } from 'react-native-easy-icon/src/Icon';

//App Modules
import CircularProgress from './CircularProgress';
import { AppTheme } from 'app/models/theme';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';

//Interface
export interface IHomeListItem {
  id: number;
  title: string;
  subTitle: string;
  iconName: string;
  iconFamily: IconType;
  color: string;
}

export interface IHomeListSection {
  title: string;
  data: IHomeListItem[];
}

//Interface
interface IHomeListItemProps {
  item: IHomeListItem;
  index: number;
  sectionIndex: number;
  onPress: (item: IHomeListItem, index: number, sectionIndex: number) => void;
  progress: number;
}

const HomeListItem = (props: IHomeListItemProps) => {
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
              <Icon
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
              <Text numberOfLines={2} style={[styles.subtitleText, { color: `${colors.white}${colors.opacity}` }]}>
                {item.subTitle}
              </Text>
            </View>
          </View>

          <CircularProgress
            style={[styles.circularProgress]}
            textColor={colors.text}
            fill={colors.card}
            textSize={12}
            pgColor={colors.primary}
            bgColor={colors.card}
            size={40}
            text={`${Math.round(progress * 1000) / 10}%`}
            strokeWidth={1}
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
    minHeight: 98,
    marginBottom: 8,
  },
  touchableButton: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 15,
    marginTop: 8,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
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
  iconTextContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconTextContainer1: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  leftIcon: { alignSelf: 'center' },
  iconContainer: { marginHorizontal: 20, width: 44 },
  textContainer: { marginRight: 8, flex: 1 },
});

export default memo(HomeListItem);

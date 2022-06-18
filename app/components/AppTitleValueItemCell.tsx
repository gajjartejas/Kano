import Config from 'app/config';
import React from 'react';
import { StyleSheet, View } from 'react-native';

//Third Party
import Icon from 'react-native-easy-icon';
import { IconType } from 'react-native-easy-icon/src/Icon';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

//Interface

//Interface
interface IVovelCharCellItemProps {
  title: string;
  value?: string;
  bold?: boolean;
  iconName?: string;
  iconFamily?: IconType;
  onPress?: () => void;
  touchDisabled?: boolean;
  leftIconSize?: number;
}

const AppTitleValueItemCell = (props: IVovelCharCellItemProps) => {
  //Const
  const { colors } = useTheme();
  const { title, value, bold, iconFamily, iconName, touchDisabled, leftIconSize, onPress } = props;

  return (
    <View style={[styles.container, { backgroundColor: `${colors.card}` }]}>
      <TouchableRipple
        rippleColor={`${colors.primary}20`}
        disabled={touchDisabled}
        style={[styles.touchableButton, { backgroundColor: `${colors.card}20` }]}
        onPress={onPress}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={2}
            style={[
              styles.titleText,
              { color: colors.text },
              bold && { fontWeight: '600', fontFamily: Config.Fonts.NotoSansGujarati.Bold },
            ]}>
            {title}
          </Text>
          {!!value && (
            <Text numberOfLines={2} style={[styles.subTitleText, { color: `${colors.text}99` }]}>
              {value}
            </Text>
          )}
          {iconFamily && iconName && (
            <Icon
              style={styles.leftIcon}
              type={iconFamily}
              name={iconName}
              color={colors.textTitle}
              size={leftIconSize ? leftIconSize : 14}
            />
          )}
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', width: '100%' },
  touchableButton: { flex: 1, paddingVertical: 12 },
  titleText: {
    fontSize: 15,
    fontFamily: Config.Fonts.NotoSansGujarati.Medium,
  },
  textContainer: { marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  subTitleText: {
    fontWeight: '500',
    fontSize: 15,
    fontFamily: Config.Fonts.NotoSansGujarati.Medium,
  },
  leftIcon: { alignSelf: 'center' },
});

export default AppTitleValueItemCell;

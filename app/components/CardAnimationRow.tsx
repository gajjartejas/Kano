import { Dimensions, StyleSheet, Switch, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { useCallback, useState } from 'react';

//ThirdParty
import { Portal, useTheme } from 'react-native-paper';

//App Modules
import { SelectAccentDialogColor } from 'app/components/SelectAccentColorDialog';
import Components from 'app/components/index';
import { AppTheme } from 'app/models/theme';
import Config from 'app/config';
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';

export function ColorRow(props: {
  style?: ViewStyle | ViewStyle[];
  label: string;
  color: string;
  onColor: (color: string) => void;
}) {
  const { color, label, onColor, style } = props;
  const [accentColorDialogVisible, setAccentColorDialogVisible] = useState(false);
  const { colors } = useTheme();

  const onPressPrimaryColor = useCallback(
    (item: SelectAccentDialogColor) => {
      onColor(item.primary);
      setAccentColorDialogVisible(false);
    },
    [onColor],
  );

  const onPressColor = () => {
    setAccentColorDialogVisible(true);
  };

  const onDismiss = () => {
    setAccentColorDialogVisible(false);
  };

  return (
    <View style={style}>
      <RowTitle title={label} />
      <TouchableOpacity
        onPress={onPressColor}
        activeOpacity={0.8}
        style={[{ backgroundColor: color, borderColor: `${colors.backdrop}` }, styles.colorPickerContainer]}
      />

      <Portal>
        <Components.SelectAccentDialog
          visible={accentColorDialogVisible}
          onSelect={onPressPrimaryColor}
          onDismiss={onDismiss}
        />
      </Portal>
    </View>
  );
}

export function SwitchRow(props: {
  style?: ViewStyle;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  const { style, label, value, onValueChange } = props;

  return (
    <View style={[style, styles.switchRow]}>
      <RowTitle title={label} />
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

export function ArrowRow(props: {
  selected?: boolean;
  style?: ViewStyle;
  onPress: () => void;
  arrow: string;
  name?: string;
}) {
  const { style, arrow, onPress, name, selected } = props;
  const { colors } = useTheme<AppTheme>();
  const marginTop = name ? 4 : 0;
  const fontWeight = selected ? '600' : '400';
  const largeScreenMode = useLargeScreenMode();
  const scaleFactor = largeScreenMode ? 1.5 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        styles.arrowRow,
        {
          borderColor: `${colors.backdrop}`,
          width: (Dimensions.get('screen').width - 64) / 8 / scaleFactor - 4,
          height: (Dimensions.get('screen').width - 64) / 8 / scaleFactor - 4,
          borderRadius: (Dimensions.get('screen').width - 64 - 4) / 16 / scaleFactor,
        },
        selected && { backgroundColor: colors.primary },
      ]}>
      <View style={styles.arrowTextContainer}>
        {!name && (
          <RowTitle
            style={{
              ...styles.arrowTitleFont,
              color: colors.onSurface,
              marginTop,
            }}
            title={arrow}
          />
        )}
        {!!name && (
          <Text style={[{ color: colors.onSurface, fontWeight: fontWeight }, styles.arrowMiniText]}>{name}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export function RowTitle(props: { title: string; style?: TextStyle }) {
  const { colors } = useTheme();
  return <Text style={[props.style, { color: colors.onSurface }]}>{props.title}</Text>;
}

const styles = StyleSheet.create({
  colorPickerContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowRow: {
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  arrowTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowTitleFont: {
    fontSize: 18,
    fontFamily: Config.Fonts.NotoSansGujarati.Medium,
  },
  arrowMiniText: {
    fontSize: 8,
    marginVertical: 4,
  },
});

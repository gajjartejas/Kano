import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

//ThirdParty
import { Dialog, Text, useTheme, Button } from 'react-native-paper';

//App Modules
import useLargeScreenMode from 'app/hooks/useLargeScreenMode';
import Slider from '@react-native-community/slider';
import { t } from 'i18next';

//Interface
interface IAppSliderDialogProps {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onPressConfirm: (value: number) => void;
  onPressCancel: () => void;
  range: [number, number];
  step: number;
  unit: string;
  value: number;
}

function AppSliderDialog(props: IAppSliderDialogProps) {
  //Constants
  const { title, description, onPressConfirm, onPressCancel, confirmText, cancelText, range, step, unit, value } =
    props;
  const [min, max] = range;

  const { colors } = useTheme();
  const largeScreenMode = useLargeScreenMode();

  const [currentValue, setCurrentValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!props.visible) {
      return;
    }
    setCurrentValue(value);
  }, [props.visible, value]);

  const valueLabel = `${t('general.value')}: ${currentValue} ${unit}`;

  return (
    <Dialog style={[largeScreenMode && styles.cardTablet]} visible={props.visible} onDismiss={onPressCancel}>
      <Dialog.Title style={{ color: colors.onBackground }}>{title}</Dialog.Title>
      <Dialog.Content>
        <Text style={[styles.descriptionText, { color: `${colors.onBackground}88` }]}>{description}</Text>
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.onBackground}
          step={step}
          value={currentValue}
          onValueChange={setCurrentValue}
        />
        <Text style={[styles.descriptionText, { color: `${colors.onBackground}88` }]}>{valueLabel}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPressCancel}>{cancelText}</Button>
        <Button onPress={() => onPressConfirm(currentValue || value)}>{confirmText}</Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 16,
  },
  cardTablet: {
    width: '70%',
    alignSelf: 'center',
  },
  slider: {
    marginTop: 12,
  },
});

export default memo(AppSliderDialog);

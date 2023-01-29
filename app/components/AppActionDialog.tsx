import React from 'react';
import { StyleSheet } from 'react-native';

//ThirdParty
import { Dialog, Text, useTheme, Button } from 'react-native-paper';

//Interface
interface IAppActionDialogProps {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onPressConfirm: () => void;
  onPressCancel: () => void;
}

function AppActionDialog(props: IAppActionDialogProps) {
  //Constants
  const { title, description, onPressConfirm, onPressCancel, confirmText, cancelText } = props;
  const { colors } = useTheme();

  return (
    <Dialog visible={props.visible} onDismiss={onPressCancel}>
      <Dialog.Title style={{ color: colors.onBackground }}>{title}</Dialog.Title>
      <Dialog.Content>
        <Text style={[styles.descriptionText, { color: `${colors.onBackground}88` }]}>{description}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onPressCancel}>{cancelText}</Button>
        <Button onPress={onPressConfirm}>{confirmText}</Button>
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
  buttonsContainer: { flexDirection: 'row', alignSelf: 'center' },
  descriptionText: { fontSize: 16 },
});

export default AppActionDialog;

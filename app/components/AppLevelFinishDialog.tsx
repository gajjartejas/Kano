import React from 'react';
import { StyleSheet, View } from 'react-native';

//ThirdParty
import LottieView from 'lottie-react-native';
import { Button, Dialog, Paragraph, useTheme } from 'react-native-paper';

//ThirdParty
import { isTablet } from 'react-native-device-info';

//App Modules
import Config from 'app/config';

//Interface
interface IAppLevelFinishDialogProps {
  visible: boolean;
  title: string;
  description: string;
  buttonTitle: string;
  onPressHideDialog: () => void;
}

function AppLevelFinishDialog(props: IAppLevelFinishDialogProps) {
  //Constants
  const { colors } = useTheme();
  const { visible, onPressHideDialog, title, description, buttonTitle } = props;

  return (
    <Dialog style={[isTablet() && styles.cardTablet]} visible={visible} onDismiss={props.onPressHideDialog}>
      <Dialog.Title style={[{ color: colors.onBackground }, styles.titleText]}>{title}</Dialog.Title>

      <View style={styles.buttonsContainer}>
        <LottieView style={styles.lottie} source={Config.Lotties.icons.level_completed} autoPlay loop />
        <LottieView style={styles.lottie1} source={Config.Lotties.icons.five_stars} autoPlay loop />
      </View>

      <Dialog.Content>
        <Paragraph style={[styles.descriptionText, { color: `${colors.onBackground}88` }]}>{description}</Paragraph>
      </Dialog.Content>

      <Dialog.Actions>
        <Button style={styles.nextButtonStyle} mode="contained" onPress={onPressHideDialog}>
          {buttonTitle}
        </Button>
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
  buttonsContainer: { alignSelf: 'center' },
  descriptionText: { fontSize: 16, alignSelf: 'center' },
  titleText: { alignSelf: 'center' },
  lottie: { width: 200, height: 200, alignSelf: 'center' },
  lottie1: { width: 50, height: 50, alignSelf: 'center', marginBottom: 16 },
  nextButtonStyle: {
    marginBottom: 16,
    marginHorizontal: 20,
    paddingVertical: 6,
    flex: 1,
  },
  cardTablet: {
    width: '70%',
    alignSelf: 'center',
  },
});

export default AppLevelFinishDialog;

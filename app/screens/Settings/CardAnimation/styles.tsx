import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {},
  subView: {
    marginHorizontal: 32,
    flex: 1,
  },
  animatedChar: {
    height: 150,
    marginRight: 16,
  },
  halfWidth: {
    width: '48%',
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowMargin: {
    marginTop: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  cardTablet: {
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  bottomOffset: {
    marginBottom: 16,
  },
  rightSpacing32: {
    marginRight: 32,
  },
  slider: {
    marginLeft: Platform.select({ ios: 0, android: -10 }),
    marginRight: Platform.select({ ios: 0, android: -10 }),
    marginTop: Platform.select({ ios: 4, android: 8 }),
  },
});

export default styles;

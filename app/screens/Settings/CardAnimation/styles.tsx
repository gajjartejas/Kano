import { StyleSheet } from 'react-native';

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
    height: 250,
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
    width: '70%',
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
  },
});

export default styles;

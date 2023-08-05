import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {},
  safeArea: {
    flex: 1,
  },
  scrollView: {},
  subView: {
    marginHorizontal: 32,
  },
  bottomSheet: {
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 8,
    shadowOpacity: 0.2,
  },
  contentContainer: {
    flex: 1,
  },
  contentContainer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
  titleText: {
    fontSize: 100,
    alignSelf: 'center',
  },
  animatedCharContainer: {
    marginTop: 16,
  },
});

export default styles;

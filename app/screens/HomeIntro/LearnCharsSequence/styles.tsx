import Config from 'app/config';
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
  moreCard: { marginTop: 16, marginHorizontal: 24 },
  flatlist: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  whiteSectionHeader: {
    color: 'white',
  },
  headerImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    backgroundColor: 'red',
    overflow: 'hidden',
  },
  section: { paddingHorizontal: 20 },
  sectionItem: {},
  listContainer: {
    paddingTop: 16,
  },
  headerDetailContainer: {
    paddingHorizontal: 16,
    paddingTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerDetailText: {
    fontSize: 40,
    fontWeight: '500',
    color: 'white',
  },
  cardContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  titleText: {
    fontFamily: Config.Fonts.NotoSansGujarati.Regular,
    fontWeight: '400',
    fontSize: 180,
  },
  subtitleText: {
    fontFamily: Config.Fonts.NotoSansGujarati.SemiBold,
    fontWeight: '400',
    fontSize: 20,
  },
});

export default styles;

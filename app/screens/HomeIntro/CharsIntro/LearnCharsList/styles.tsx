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
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Config.Fonts.NotoSansGujarati.Medium,
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
  sectionItem: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
});

export default styles;

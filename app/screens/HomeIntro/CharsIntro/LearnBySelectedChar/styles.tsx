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
  moreCard: {
    marginTop: 16,
    marginHorizontal: 24,
  },
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
    overflow: 'hidden',
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  listHeaderView: {
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Config.Fonts.NotoSansGujarati.Medium,
  },
  chipStyle: {
    minWidth: 120,
  },
  chipIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 12,
  },
  emptyListHeader: {
    paddingVertical: 8,
  },
  listContentContainer: {
    paddingVertical: 8,
  },
  listContainer: {
    flex: 1,
  },
  continueButtonContainer: {},
  continueButton: {
    marginHorizontal: 20,
    marginBottom: 8,
  },
  iconButton: {
    borderRadius: 11,
    overflow: 'hidden',
  },
});

export default styles;

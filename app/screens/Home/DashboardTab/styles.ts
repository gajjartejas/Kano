import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 20,
  },
  headerImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'absolute',
    overflow: 'hidden',
  },
  section: { paddingHorizontal: 20 },
  sectionItems: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingTop: 16,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDetailContainer: {
    justifyContent: 'space-between',
  },
  headerDetailText: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerSubDetailText: {
    fontSize: 20,
    fontWeight: '400',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default styles;

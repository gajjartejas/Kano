import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  flatlist: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  cardTablet: {
    width: '75%',
    alignSelf: 'center',
    flex: 1,
  },
  card: {
    borderRadius: 12,
    marginVertical: 8,
    padding: 16,
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  previewContainer: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8,
  },
  previewMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  previewCharBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  previewCharText: {
    fontSize: 26,
  },
  previewPhraseText: {
    fontSize: 16,
    flex: 1,
  },
  previewAlphabetText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  previewNumbersText: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});

export default styles;

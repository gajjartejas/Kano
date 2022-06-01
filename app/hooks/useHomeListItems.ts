//ThirdParty
import { IHomeListItem, IHomeListSection } from 'app/components/HomeListItem';
import { useTranslation } from 'react-i18next';

const useHomeListItems = (): IHomeListSection[] => {
  //Constants
  const { t } = useTranslation();

  let entries: IHomeListItem[] = [
    {
      id: 0,
      title: 'Introduction to Gujarati\nScript',
      subTitle: '10 hours, 19 lessons',
      iconName: 'egg',
      iconFamily: 'material-community'
    },
    {
      id: 1,
      title: 'Introduction to\nVowels(svara)',
      subTitle: '10 hours, 19 lessons',
      iconName: 'egg-easter',
      iconFamily: 'material-community'
    },
    {
      id: 2,
      title: 'Introduction to\nConsonants(vyañjana)',
      subTitle: '10 hours, 19 lessons',
      iconName: 'baby',
      iconFamily: 'material-community'
    },
    {
      id: 3,
      title: 'Introduction to Barakhadi \n(consonants & vowels)',
      subTitle: '10 hours, 19 lessons',
      iconName: 'walking',
      iconFamily: 'font-awesome5'
    },
    {
      id: 4,
      title: 'Introduction to\nGujarati numerals',
      subTitle: '10 hours, 19 lessons',
      iconName: 'number',
      iconFamily: 'octicon'
    },
  ];

  let sections: IHomeListSection[] = [
    {
      title: 'Introduction',
      data: entries,
    },
  ];

  return sections;
};

export default useHomeListItems;

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
      iconName: 'ic_intro.svg',
    },
    {
      id: 1,
      title: 'Introduction to\nConsonants(vyañjana)',
      subTitle: '10 hours, 19 lessons',
      iconName: 'ic_consonants.svg',
    },
    {
      id: 2,
      title: 'Introduction to Barakhadi \n(consonants & vowels)',
      subTitle: '10 hours, 19 lessons',
      iconName: 'ic_barakhadi.svg',
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

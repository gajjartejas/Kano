//ThirdParty
import { IHomeListItem, IHomeListSection } from 'app/components/HomeListItem';
import { useTranslation } from 'react-i18next';

const useHomeListItems = (): IHomeListSection[] => {
  //Constants
  const { t } = useTranslation();

  let entries: IHomeListItem[] = [
    {
      id: 0,
      title: 'Introduction',
      subTitle: 'Introduction',
      iconName: 'intro',
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

//ThirdParty
import { ICharListSection } from 'app/components/CharListItem';
import { useTranslation } from 'react-i18next';

const useNumeralListItems = (): ICharListSection[] => {
  //Constants
  const { t } = useTranslation();

  return [
    {
      title: t('learnCharsListScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('learnCharsListScreen.listItemsSection1.itemTitleNum1'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'table',
          iconFamily: 'font-awesome5',
          color: '#004ba0',
        },
        {
          id: 1,
          title: t('learnCharsListScreen.listItemsSection1.itemTitle2'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'sort-numeric-down',
          iconFamily: 'font-awesome5',
          color: '#00675b',
        },
        {
          id: 2,
          title: t('learnCharsListScreen.listItemsSection1.itemTitleNum4'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle4'),
          iconName: 'tasks',
          iconFamily: 'font-awesome5',
          color: '#c66900',
        },
      ],
    },
    {
      title: t('learnCharsListScreen.listItemSection2Title'),
      data: [
        {
          id: 0,
          title: t('learnCharsListScreen.listItemsSection2.itemTitle1'),
          subTitle: t('learnCharsListScreen.listItemsSection2.itemSubTitle1'),
          iconName: 'sort-numeric-down',
          iconFamily: 'font-awesome5',
          color: '#087f23',
        },
        {
          id: 2,
          title: t('learnCharsListScreen.listItemsSection2.itemTitle3'),
          subTitle: t('learnCharsListScreen.listItemsSection2.itemSubTitle3'),
          iconName: 'tasks',
          iconFamily: 'font-awesome5',
          color: '#c41c00',
        },
      ],
    },
  ];
};

export default useNumeralListItems;

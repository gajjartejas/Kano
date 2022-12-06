//ThirdParty
import { ICharListSection } from 'app/components/CharListItem';
import { useTranslation } from 'react-i18next';

const useConsonantListItems = (): ICharListSection[] => {
  //Constants
  const { t } = useTranslation();

  let sections: ICharListSection[] = [
    {
      title: t('learnCharsListScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('learnCharsListScreen.listItemsSection1.itemTitle1'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'table',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnCharsListScreen.listItemsSection1.itemTitle2'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 2,
          title: t('learnCharsListScreen.listItemsSection1.itemTitle3'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle3'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
        {
          id: 3,
          title: t('learnCharsListScreen.listItemsSection1.itemTitle4'),
          subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle4'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
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
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnCharsListScreen.listItemsSection2.itemTitle2'),
          subTitle: t('learnCharsListScreen.listItemsSection2.itemSubTitle2'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
        {
          id: 2,
          title: t('learnCharsListScreen.listItemsSection2.itemTitle3'),
          subTitle: t('learnCharsListScreen.listItemsSection2.itemSubTitle3'),
          iconName: 'tasks',
          iconFamily: 'font-awesome5',
        },
      ],
    },
  ];

  return sections;
};

export default useConsonantListItems;

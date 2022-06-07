//ThirdParty
import { IBarakhadiListSection } from 'app/components/BarakhadiListItem';
import { useTranslation } from 'react-i18next';

const useVowelstListItems = (): IBarakhadiListSection[] => {
  //Constants
  const { t } = useTranslation();

  let sections: IBarakhadiListSection[] = [
    {
      title: t('learnBarakhadiListScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('learnBarakhadiListScreen.listItemsSection1.itemTitle1'),
          subTitle: t('learnBarakhadiListScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'table',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnBarakhadiListScreen.listItemsSection1.itemTitle2'),
          subTitle: t('learnBarakhadiListScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 2,
          title: t('learnBarakhadiListScreen.listItemsSection1.itemTitle3'),
          subTitle: t('learnBarakhadiListScreen.listItemsSection1.itemSubTitle3'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
    {
      title: t('learnBarakhadiListScreen.listItemSection2Title'),
      data: [
        {
          id: 0,
          title: t('learnBarakhadiListScreen.listItemsSection2.itemTitle1'),
          subTitle: t('learnBarakhadiListScreen.listItemsSection2.itemSubTitle1'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnBarakhadiListScreen.listItemsSection2.itemTitle2'),
          subTitle: t('learnBarakhadiListScreen.listItemsSection2.itemSubTitle2'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
  ];

  return sections;
};

export default useVowelstListItems;

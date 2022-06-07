//ThirdParty
import { IConsonantListSection } from 'app/components/ConsonantListItem';
import { useTranslation } from 'react-i18next';

const useVowelstListItems = (): IConsonantListSection[] => {
  //Constants
  const { t } = useTranslation();

  let sections: IConsonantListSection[] = [
    {
      title: t('learnConsonantsListScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('learnConsonantsListScreen.listItemsSection1.itemTitle1'),
          subTitle: t('learnConsonantsListScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'table',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnConsonantsListScreen.listItemsSection1.itemTitle2'),
          subTitle: t('learnConsonantsListScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 2,
          title: t('learnConsonantsListScreen.listItemsSection1.itemTitle3'),
          subTitle: t('learnConsonantsListScreen.listItemsSection1.itemSubTitle3'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
    {
      title: t('learnConsonantsListScreen.listItemSection2Title'),
      data: [
        {
          id: 0,
          title: t('learnConsonantsListScreen.listItemsSection2.itemTitle1'),
          subTitle: t('learnConsonantsListScreen.listItemsSection2.itemSubTitle1'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnConsonantsListScreen.listItemsSection2.itemTitle2'),
          subTitle: t('learnConsonantsListScreen.listItemsSection2.itemSubTitle2'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
  ];

  return sections;
};

export default useVowelstListItems;

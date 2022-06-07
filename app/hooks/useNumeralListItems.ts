//ThirdParty
import { INumeralListSection } from 'app/components/NumeralListItem';
import { useTranslation } from 'react-i18next';

const useVowelstListItems = (): INumeralListSection[] => {
  //Constants
  const { t } = useTranslation();

  let sections: INumeralListSection[] = [
    {
      title: t('learnNumeralsListScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('learnNumeralsListScreen.listItemsSection1.itemTitle1'),
          subTitle: t('learnNumeralsListScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'table',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnNumeralsListScreen.listItemsSection1.itemTitle2'),
          subTitle: t('learnNumeralsListScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 2,
          title: t('learnNumeralsListScreen.listItemsSection1.itemTitle3'),
          subTitle: t('learnNumeralsListScreen.listItemsSection1.itemSubTitle3'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
    {
      title: t('learnNumeralsListScreen.listItemSection2Title'),
      data: [
        {
          id: 0,
          title: t('learnNumeralsListScreen.listItemsSection2.itemTitle1'),
          subTitle: t('learnNumeralsListScreen.listItemsSection2.itemSubTitle1'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnNumeralsListScreen.listItemsSection2.itemTitle2'),
          subTitle: t('learnNumeralsListScreen.listItemsSection2.itemSubTitle2'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
  ];

  return sections;
};

export default useVowelstListItems;

//ThirdParty
import { IVowelstListItem, IVowelstListSection } from 'app/components/VowelstListItem';
import { useTranslation } from 'react-i18next';

const useVowelstListItems = (): IVowelstListSection[] => {
  //Constants
  const { t } = useTranslation();

  let sections: IVowelstListSection[] = [
    {
      title: t('learnVowelsListScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('learnVowelsListScreen.listItemsSection1.itemTitle1'),
          subTitle: t('learnVowelsListScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'table',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnVowelsListScreen.listItemsSection1.itemTitle2'),
          subTitle: t('learnVowelsListScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 2,
          title: t('learnVowelsListScreen.listItemsSection1.itemTitle3'),
          subTitle: t('learnVowelsListScreen.listItemsSection1.itemSubTitle3'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
    {
      title: t('learnVowelsListScreen.listItemSection2Title'),
      data: [
        {
          id: 0,
          title: t('learnVowelsListScreen.listItemsSection2.itemTitle1'),
          subTitle: t('learnVowelsListScreen.listItemsSection2.itemSubTitle1'),
          iconName: 'sort-alpha-down',
          iconFamily: 'font-awesome5',
        },
        {
          id: 1,
          title: t('learnVowelsListScreen.listItemsSection2.itemTitle2'),
          subTitle: t('learnVowelsListScreen.listItemsSection2.itemSubTitle2'),
          iconName: 'random',
          iconFamily: 'font-awesome5',
        },
      ],
    },
  ];

  return sections;
};

export default useVowelstListItems;

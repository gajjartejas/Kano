//ThirdParty
import { ICharListSection } from 'app/components/CharListItem';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const useConsonantListItems = (): ICharListSection[] => {
  //Constants
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        title: t('learnCharsListScreen.listItemSection1Title'),
        data: [
          {
            id: 0,
            title: t('learnCharsListScreen.listItemsSection1.itemTitle1'),
            subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle1'),
            iconName: 'table-cells',
            iconFamily: 'fontawesome6',
            color: '#004ba0',
          },
          {
            id: 1,
            title: t('learnCharsListScreen.listItemsSection1.itemTitle2'),
            subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle2'),
            iconName: 'arrow-down-a-z',
            iconFamily: 'fontawesome6',
            color: '#00675b',
          },
          {
            id: 2,
            title: t('learnCharsListScreen.listItemsSection1.itemTitle4'),
            subTitle: t('learnCharsListScreen.listItemsSection1.itemSubTitle4'),
            iconName: 'list-check',
            iconFamily: 'fontawesome6',
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
            iconName: 'arrow-down-a-z',
            iconFamily: 'fontawesome6',
            color: '#087f23',
          },
          {
            id: 1,
            title: t('learnCharsListScreen.listItemsSection2.itemTitle3'),
            subTitle: t('learnCharsListScreen.listItemsSection2.itemSubTitle3'),
            iconName: 'list-check',
            iconFamily: 'fontawesome6',
            color: '#c41c00',
          },
        ],
      },
    ];
  }, [t]);
};

export default useConsonantListItems;

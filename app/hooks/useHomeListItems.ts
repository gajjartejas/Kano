//ThirdParty
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { IHomeListSection } from 'app/components/HomeListItem';
const useHomeListItems = (): IHomeListSection[] => {
  //Constants
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        title: t('homeScreen.listItemSection1Title'),
        data: [
          {
            id: 0,
            title: t('homeScreen.listItemsSection1.itemTitle1'),
            subTitle: t('homeScreen.listItemsSection1.itemSubTitle1'),
            iconName: 'egg',
            iconFamily: 'material',
            color: '#9a0007',
          },
          {
            id: 1,
            title: t('homeScreen.listItemsSection1.itemTitle2'),
            subTitle: t('homeScreen.listItemsSection1.itemSubTitle2'),
            iconName: 'egg',
            iconFamily: 'material',
            color: '#7C4DFF',
          },
        ],
      },
      {
        title: t('homeScreen.listItemSection2Title'),
        data: [
          {
            id: 0,
            title: t('homeScreen.listItemsSection2.itemTitle1'),
            subTitle: t('homeScreen.listItemsSection2.itemSubTitle1'),
            iconName: 'egg-easter',
            iconFamily: 'material',
            color: '#004ba0',
          },
          {
            id: 2,
            title: t('homeScreen.listItemsSection2.itemTitle2'),
            subTitle: t('homeScreen.listItemsSection2.itemSubTitle2'),
            iconName: 'baby-face',
            iconFamily: 'material',
            color: '#00675b',
          },
          {
            id: 3,
            title: t('homeScreen.listItemsSection2.itemTitle3'),
            subTitle: t('homeScreen.listItemsSection2.itemSubTitle3'),
            iconName: 'person-walking',
            iconFamily: 'fontawesome6',
            color: '#c66900',
          },
        ],
      },
      {
        title: t('homeScreen.listItemSection3Title'),
        data: [
          {
            id: 0,
            title: t('homeScreen.listItemsSection3.itemTitle1'),
            subTitle: t('homeScreen.listItemsSection3.itemSubTitle1'),
            iconName: 'numeric',
            iconFamily: 'material',
            color: '#62757f',
          },
        ],
      },
    ];
  }, [t]);
};

export default useHomeListItems;

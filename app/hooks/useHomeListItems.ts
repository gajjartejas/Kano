//ThirdParty
import { IHomeListSection } from 'app/components/HomeListItem';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

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
            iconFamily: 'material-community',
            color: '#9a0007',
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
            iconFamily: 'material-community',
            color: '#004ba0',
          },
          {
            id: 2,
            title: t('homeScreen.listItemsSection2.itemTitle2'),
            subTitle: t('homeScreen.listItemsSection2.itemSubTitle2'),
            iconName: 'baby',
            iconFamily: 'material-community',
            color: '#00675b',
          },
          {
            id: 3,
            title: t('homeScreen.listItemsSection2.itemTitle3'),
            subTitle: t('homeScreen.listItemsSection2.itemSubTitle3'),
            iconName: 'walking',
            iconFamily: 'font-awesome5',
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
            iconName: 'number',
            iconFamily: 'octicon',
            color: '#62757f',
          },
        ],
      },
    ];
  }, [t]);
};

export default useHomeListItems;

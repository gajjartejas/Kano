//ThirdParty
import { IHomeListSection } from 'app/components/HomeListItem';
import { useTranslation } from 'react-i18next';

const useHomeListItems = (): IHomeListSection[] => {
  //Constants
  const { t } = useTranslation();

  let sections: IHomeListSection[] = [
    {
      title: t('homeScreen.listItemSection1Title'),
      data: [
        {
          id: 0,
          title: t('homeScreen.listItemsSection1.itemTitle1'),
          subTitle: t('homeScreen.listItemsSection1.itemSubTitle1'),
          iconName: 'egg',
          iconFamily: 'material-community',
        },
        {
          id: 1,
          title: t('homeScreen.listItemsSection1.itemTitle2'),
          subTitle: t('homeScreen.listItemsSection1.itemSubTitle2'),
          iconName: 'egg-easter',
          iconFamily: 'material-community',
        },
        {
          id: 2,
          title: t('homeScreen.listItemsSection1.itemTitle3'),
          subTitle: t('homeScreen.listItemsSection1.itemSubTitle3'),
          iconName: 'baby',
          iconFamily: 'material-community',
        },
        {
          id: 3,
          title: t('homeScreen.listItemsSection1.itemTitle4'),
          subTitle: t('homeScreen.listItemsSection1.itemSubTitle4'),
          iconName: 'walking',
          iconFamily: 'font-awesome5',
        },
        {
          id: 4,
          title: t('homeScreen.listItemsSection1.itemTitle5'),
          subTitle: t('homeScreen.listItemsSection1.itemSubTitle5'),
          iconName: 'number',
          iconFamily: 'octicon',
        },
      ],
    },
  ];

  return sections;
};

export default useHomeListItems;

import { ICharGroupInfo, ICharInfo } from 'app/models/models/char';

//ThirdParty
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import barakhadi from 'app/assets/lang/barakhadi/barakhadi.json';
import { useTranslation } from 'react-i18next';

const useBarakhadiChartItems = (): ICharCellListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    return {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
      svg: charInfo.svg,
    };
  };

  const transformCharsToSectionVM = (group: ICharGroupInfo): ICharCellListSection => {
    return {
      title: t('learnCharsChartScreen.header.barakhadi', { en: group.en, gu: group.gu }),
      data: group.chars?.map((v: ICharInfo) => transformCharToCellVM(v)) || [],
    };
  };

  return barakhadi.map((v: ICharGroupInfo) => transformCharsToSectionVM(v));
};

export default useBarakhadiChartItems;

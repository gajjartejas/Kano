import { ICharGroupInfo, ICharInfo } from '../models/models/char';

//ThirdParty
import { ICharCellListSection, ICharCellItem } from 'app/components/CharCellItem';
import barakhadi from 'app/assets/lang/barakhadi/barakhadi.json';
import { useTranslation } from 'react-i18next';

const useBarakhadiChartItems = (): ICharCellListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    const transformed = {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
      svg: charInfo.svg,
    };

    return transformed;
  };

  const transformCharsToSectionVM = (group: ICharGroupInfo): ICharCellListSection => {
    return {
      title: t('learnCharInfoScreen.cellHeader', { en: group.en, gu: group.gu }),
      data: group.chars?.map((v: ICharInfo) => transformCharToCellVM(v)) || [],
    };
  };

  let sectionsVMs = barakhadi.map((v: ICharGroupInfo) => transformCharsToSectionVM(v));
  return sectionsVMs;
};

export default useBarakhadiChartItems;

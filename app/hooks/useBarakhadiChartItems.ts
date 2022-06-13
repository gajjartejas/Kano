import { ICharGroupInfo, ICharInfo } from '../models/models/char';

//ThirdParty
import { ICharCellListSection, ICharCellItem } from 'app/components/CharCellItem';
import barakhdi from 'app/assets/lang/barakhdi/barakhdi.json';

const useBarakhadiChartItems = (): ICharCellListSection[] => {
  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    const transformed = {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
    };

    return transformed;
  };

  const transformCharsToSectionVM = (group: ICharGroupInfo): ICharCellListSection => {
    return {
      title: group.gu,
      data: group.chars?.map((v: ICharGroupInfo) => transformCharToCellVM(v)) || [],
    };
  };

  let sectionsVMs = barakhdi.map((v: ICharGroupInfo) => transformCharsToSectionVM(v));
  return sectionsVMs;
};

export default useBarakhadiChartItems;

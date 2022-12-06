import { ICharInfo } from 'app/models/models/char';

//ThirdParty

//App Modules
import { ICharCellListSection, ICharCellItem } from 'app/components/CharCellItem';
import consonants from 'app/assets/lang/consonants/consonants.json';

const useConsonantsChartItems = (): ICharCellListSection[] => {
  //Constants

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

  const transformCharsToSectionVM = (cellItems: ICharCellItem[]): ICharCellListSection => {
    return {
      title: '',
      data: cellItems,
    };
  };

  let cellVMs = consonants.map((v: ICharInfo) => transformCharToCellVM(v));
  let sectionsVMs = [transformCharsToSectionVM(cellVMs)];
  return sectionsVMs;
};

export default useConsonantsChartItems;

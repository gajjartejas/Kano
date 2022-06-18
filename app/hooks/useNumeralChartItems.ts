//App Modules
import { ICharInfo } from '../models/models/char';

//ThirdParty
import { ICharCellListSection, ICharCellItem } from 'app/components/CharCellItem';
import numerals from 'app/assets/lang/numerals/numerals.json';

const useVowelsChartItems = (): ICharCellListSection[] => {
  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    const transformed = {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
    };

    return transformed;
  };

  let cellVMs = numerals.map((v: ICharInfo) => transformCharToCellVM(v));
  return [{ title: '', data: cellVMs }];
};

export default useVowelsChartItems;

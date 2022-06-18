import { ICharInfo } from '../models/models/char';

//ThirdParty
import { useTranslation } from 'react-i18next';

//App Modules
import { ICharCellListSection, ICharCellItem } from 'app/components/CharCellItem';
import consonants from 'app/assets/lang/consonants/consonants.json';

const useConsonantsChartItems = (): ICharCellListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    const transformed = {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
    };

    return transformed;
  };

  const transformCharsToSectionVM = (cellItems: ICharCellItem[]): ICharCellListSection => {
    return {
      title: t('learnVowelsListScreen.listItemSection1Title'),
      data: cellItems,
    };
  };

  let cellVMs = consonants.map((v: ICharInfo) => transformCharToCellVM(v));
  let sectionsVMs = [transformCharsToSectionVM(cellVMs)];
  return sectionsVMs;
};

export default useConsonantsChartItems;

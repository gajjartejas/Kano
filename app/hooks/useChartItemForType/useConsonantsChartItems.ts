import { ICharInfo } from 'app/models/models/char';

//ThirdParty
//App Modules
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import consonants from 'app/assets/lang/consonants/consonants.json';
import { useTranslation } from 'react-i18next';

const useConsonantsChartItems = (): ICharCellListSection[] => {
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

  const transformCharsToSectionVM = (cellItems: ICharCellItem[]): ICharCellListSection => {
    return {
      title: t('learnCharsChartScreen.header.consonants'),
      data: cellItems,
    };
  };

  const cellVMs = consonants.map((v: ICharInfo) => transformCharToCellVM(v));
  return [transformCharsToSectionVM(cellVMs)];
};

export default useConsonantsChartItems;

import { ICharInfo } from '../models/models/char';

//ThirdParty
import { ICharCellListSection, ICharCellItem } from 'app/components/CharCellItem';
import { useTranslation } from 'react-i18next';
import vowels from 'app/assets/lang/vowels/vowels.json';

const useNumeralChartItems = (): ICharCellListSection[] => {
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

  let vowelsCellVMs = vowels.map((v: ICharInfo) => transformCharToCellVM(v));
  let vowelsSectionsVMs = [transformCharsToSectionVM(vowelsCellVMs)];
  return vowelsSectionsVMs;
};

export default useNumeralChartItems;

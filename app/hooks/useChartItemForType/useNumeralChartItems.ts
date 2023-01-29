//App Modules
import { ICharInfo } from 'app/models/models/char';

//ThirdParty
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import numerals from 'app/assets/lang/numerals/numerals.json';
import { useTranslation } from 'react-i18next';

const useNumeralChartItems = (): ICharCellListSection[] => {
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

  const cellVMs = numerals.map((v: ICharInfo) => transformCharToCellVM(v));
  return [{ title: t('learnCharsChartScreen.header.numerals'), data: cellVMs }];
};

export default useNumeralChartItems;

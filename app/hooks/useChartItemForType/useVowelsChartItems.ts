//App Modules
import { ICharInfo } from 'app/models/models/char';

//ThirdParty
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import vowels from 'app/assets/lang/vowels/vowels.json';
import { useTranslation } from 'react-i18next';

const useVowelsChartItems = (): ICharCellListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    return {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
      svg: charInfo.svg!,
    };
  };

  const cellVMs = vowels.map((v: ICharInfo) => transformCharToCellVM(v));
  return [{ title: t('learnCharsChartScreen.header.vowels'), data: cellVMs }];
};

export default useVowelsChartItems;

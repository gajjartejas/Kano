import { ICharInfo } from './../models/models/char';

//ThirdParty
import { IVovelListSection, IVovelCharCellItem } from 'app/components/VowelCharCellItem';
import { useTranslation } from 'react-i18next';
import vowels from 'app/assets/lang/vowels/vowels.json';

const useVowels = (): IVovelListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = (charInfo: ICharInfo): IVovelCharCellItem => {
    const transformed = {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
    };

    return transformed;
  };

  const transformCharsToSectionVM = (cellItems: IVovelCharCellItem[]): IVovelListSection => {
    return {
      title: t('learnVowelsListScreen.listItemSection1Title'),
      data: cellItems,
    };
  };

  let vowelsCellVMs = vowels.map((v: ICharInfo) => transformCharToCellVM(v));
  let vowelsSectionsVMs = [transformCharsToSectionVM(vowelsCellVMs)];
  return vowelsSectionsVMs;
};

export default useVowels;

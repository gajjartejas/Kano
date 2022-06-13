//App Modules
import * as RouterParamTypes from 'app/config/router-params';
import { ICharCellListSection } from 'app/components/CharCellItem';
import useVowels from './useVowelsChartItems';
import useBarakhadis from './useBarakhadiChartItems';
import useConsonants from './useConsonantsChartItems';
import useNumerals from './useNumeralChartItems';

const useChartItemForTypes = (type: RouterParamTypes.LearnCharsType): ICharCellListSection[] => {
  const vowels = useVowels();
  const barakhadi = useBarakhadis();
  const consonants = useConsonants();
  const numerals = useNumerals();

  switch (type) {
    case RouterParamTypes.LearnCharsType.Vowel:
      return vowels;
    case RouterParamTypes.LearnCharsType.Constant:
      return consonants;
    case RouterParamTypes.LearnCharsType.Barakhadi:
      return barakhadi;
    case RouterParamTypes.LearnCharsType.Number:
      return numerals;
    default:
      return [];
  }
};

export default useChartItemForTypes;

import { ICharListSection } from 'app/components/CharListItem';
import * as RouterParamTypes from 'app/config/router-params';
import useBarakhadiListItems from './useBarakhadiListItems';
import useConsonantListItems from './useConsonantListItems';
import useNumeralListItems from './useNumeralListItems';
import useVowelsListItems from './useVowelsListItems';

const useCharListItemForType = (type: RouterParamTypes.LearnCharsType): ICharListSection[] => {
  const vowelsListItems = useVowelsListItems();
  const consonantListItems = useConsonantListItems();
  const barakhadiListItems = useBarakhadiListItems();
  const numeralListItems = useNumeralListItems();

  switch (type) {
    case RouterParamTypes.LearnCharsType.Vowel:
      return vowelsListItems;

    case RouterParamTypes.LearnCharsType.Constant:
      return consonantListItems;

    case RouterParamTypes.LearnCharsType.Barakhadi:
      return barakhadiListItems;

    case RouterParamTypes.LearnCharsType.Number:
      return numeralListItems;
  }
};

export default useCharListItemForType;

import { ICharListSection } from 'app/components/CharListItem';
import useBarakhadiListItems from './useBarakhadiListItems';
import useConsonantListItems from './useConsonantListItems';
import useNumeralListItems from './useNumeralListItems';
import useVowelsListItems from './useVowelsListItems';
import { LearnCharsType } from 'app/navigation/types';

const useCharListItemForType = (type: LearnCharsType): ICharListSection[] => {
  const vowelsListItems = useVowelsListItems();
  const consonantListItems = useConsonantListItems();
  const barakhadiListItems = useBarakhadiListItems();
  const numeralListItems = useNumeralListItems();

  switch (type) {
    case LearnCharsType.Vowel:
      return vowelsListItems;

    case LearnCharsType.Constant:
      return consonantListItems;

    case LearnCharsType.Barakhadi:
      return barakhadiListItems;

    case LearnCharsType.Number:
      return numeralListItems;
  }
};

export default useCharListItemForType;

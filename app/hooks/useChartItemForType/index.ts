//App Modules
import * as RouterParamTypes from 'app/config/router-params';
import { ICharCellListSection } from 'app/components/CharCellItem';
import useVowels from './useVowelsChartItems';
import useBarakhadis from './useBarakhadiChartItems';
import useConsonants from './useConsonantsChartItems';
import useNumerals from './useNumeralChartItems';
import { ISelectCharCellListSection } from 'app/components/CharSelectCellItem';

const useChartItemForTypes = (
  type: RouterParamTypes.LearnCharsType,
  onlyInclude: Set<string> | null,
): ICharCellListSection[] => {
  console.log(onlyInclude);
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

const useChartSectionsForTypes = (
  type: RouterParamTypes.LearnCharsType,
  random: boolean,
  onlyInclude: Set<string> | null,
): ICharCellListSection[] => {
  const chars = useChartItemForTypes(type, onlyInclude);
  if (!random) {
    return chars;
  }
  return [
    ...chars
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => {
        return {
          ...value,
          data: value.data
            .map(item => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item),
        };
      }),
  ];
};

const useSelectedChartItemForTypes = (type: RouterParamTypes.LearnCharsType): ISelectCharCellListSection[] => {
  const vowels = useVowels();
  const barakhadi = useBarakhadis();
  const consonants = useConsonants();
  const numerals = useNumerals();

  switch (type) {
    case RouterParamTypes.LearnCharsType.Vowel:
      return mapForOtherSelection(vowels);
    case RouterParamTypes.LearnCharsType.Constant:
      return mapForOtherSelection(consonants);
    case RouterParamTypes.LearnCharsType.Barakhadi:
      return mapForOtherSelection(barakhadi);
    case RouterParamTypes.LearnCharsType.Number:
      return mapForOtherSelection(numerals);
    default:
      return [];
  }
};

const mapForOtherSelection = (sections: ICharCellListSection[]): ISelectCharCellListSection[] => {
  let mapped = sections.map(s => {
    return {
      ...s,
      title: s.title,
      data: s.data.map(d => {
        return {
          id: s.data.indexOf(d),
          title: d.gu,
          subTitle: `${d.en}${d.diacritic ? `/${d.diacritic}` : ''}`,
          selected: false,
        };
      }),
    };
  });

  return mapped;
};

export { useChartItemForTypes, useChartSectionsForTypes, useSelectedChartItemForTypes };

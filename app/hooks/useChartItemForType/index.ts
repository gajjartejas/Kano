//App Modules
import { ICharCellListSection } from 'app/components/CharCellItem';
import useVowels from './useVowelsChartItems';
import useBarakhadis from './useBarakhadiChartItems';
import useConsonants from './useConsonantsChartItems';
import useNumerals from './useNumeralChartItems';
import { ISelectCharCellListSection } from 'app/components/CharSelectCellItem';
import { LearnCharsType } from 'app/navigation/types';

const useChartItemForTypes = (type: LearnCharsType): ICharCellListSection[] => {
  const vowels = useVowels();
  const barakhadi = useBarakhadis();
  const consonants = useConsonants();
  const numerals = useNumerals();

  switch (type) {
    case LearnCharsType.Vowel:
      return vowels;
    case LearnCharsType.Constant:
      return consonants;
    case LearnCharsType.Barakhadi:
      return barakhadi;
    case LearnCharsType.Number:
      return numerals;
    default:
      return [];
  }
};

const useChartSectionsForTypes = (
  type: LearnCharsType,
  random: boolean,
  onlyInclude?: Set<string>,
): ICharCellListSection[] => {
  const chars = useChartItemForTypes(type);
  if (!random) {
    return chars
      .map((value, sectionIndex) => {
        return {
          ...value,
          data: value.data.filter((char, i) => {
            return onlyInclude !== undefined ? onlyInclude?.has(`${i}-${sectionIndex}`) : true;
          }),
        };
      })
      .filter(value => value.data.length > 0);
  }
  return [
    ...chars
      .map((value, sectionIndex) => {
        return {
          ...value,
          data: value.data.filter((char, i) => {
            return onlyInclude !== undefined ? onlyInclude?.has(`${i}-${sectionIndex}`) : true;
          }),
        };
      })
      .filter(value => value.data.length > 0)
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

const useSelectedChartItemForTypes = (type: LearnCharsType): ISelectCharCellListSection[] => {
  const vowels = useVowels();
  const barakhadi = useBarakhadis();
  const consonants = useConsonants();
  const numerals = useNumerals();

  switch (type) {
    case LearnCharsType.Vowel:
      return mapForOtherSelection(vowels);
    case LearnCharsType.Constant:
      return mapForOtherSelection(consonants);
    case LearnCharsType.Barakhadi:
      return mapForOtherSelection(barakhadi);
    case LearnCharsType.Number:
      return mapForOtherSelection(numerals);
    default:
      return [];
  }
};

const mapForOtherSelection = (sections: ICharCellListSection[]): ISelectCharCellListSection[] => {
  return sections.map(s => {
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
};

export { useChartItemForTypes, useChartSectionsForTypes, useSelectedChartItemForTypes };

//ThirdParty
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { LearnCharsType } from 'app/navigation/types';
import useCharListProgressForType from 'app/hooks/useCharListProgressForType';

const useHomeListProgressItems = (): { data: number[] }[] => {
  //Constants
  const { t } = useTranslation();
  const { getCharListProgressForType } = useCharListProgressForType();

  return useMemo(() => {
    return [
      {
        data: [0],
      },
      {
        title: t('homeScreen.listItemSection2Title'),
        data: [
          getCharListProgressForType(LearnCharsType.Vowel).reduce((v, c) => v + c.data.reduce((p, m) => p + m, 0), 0) /
            5,
          getCharListProgressForType(LearnCharsType.Constant).reduce(
            (v, c) => v + c.data.reduce((p, m) => p + m, 0),
            0,
          ) / 5,
          getCharListProgressForType(LearnCharsType.Barakhadi).reduce(
            (v, c) => v + c.data.reduce((p, m) => p + m, 0),
            0,
          ) / 5,
        ],
      },
      {
        title: t('homeScreen.listItemSection3Title'),
        data: [
          getCharListProgressForType(LearnCharsType.Number).reduce((v, c) => v + c.data.reduce((p, m) => p + m, 0), 0) /
            5,
        ],
      },
    ];
  }, [getCharListProgressForType, t]);
};

export default useHomeListProgressItems;

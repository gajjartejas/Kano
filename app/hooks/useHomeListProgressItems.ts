//ThirdParty
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { LearnCharsType } from 'app/navigation/types';
import useCharListProgressForType from 'app/hooks/useCharListProgressForType';
import useOtherStatics from 'app/realm/crud/otherStatics';
import { OtherStaticTypes } from 'app/realm/modals/otherStatics';

const useHomeListProgressItems = (): { data: number[] }[] => {
  //Constants
  const { t } = useTranslation();
  const { getCharListProgressForType } = useCharListProgressForType();
  const { getOtherStatics } = useOtherStatics();

  return useMemo(() => {
    return [
      {
        data: [getOtherStatics(OtherStaticTypes.OverViewIntro), getOtherStatics(OtherStaticTypes.CulturalIntro)],
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
  }, [getCharListProgressForType, getOtherStatics, t]);
};

export default useHomeListProgressItems;

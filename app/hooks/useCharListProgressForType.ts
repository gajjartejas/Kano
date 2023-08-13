//ThirdParty
import { useCallback } from 'react';
import useCardStatics from 'app/realm/crud/cardStatics';
import { ICardLearnType, ICardOrderType, ICardSelectionType } from 'app/realm/modals/cardStatics';
import { LearnCharsType } from 'app/navigation/types';
import useChartStatics from 'app/realm/crud/chartStatics';
import { useLengthForTypes } from 'app/hooks/useChartItemForType';

const useCharListProgressForType = () => {
  //Constants
  const { getCardStatics } = useCardStatics();
  const { getChartStatics } = useChartStatics();
  const getLengthForType = useLengthForTypes();

  const getCharListProgressForType = useCallback(
    (sectionType: LearnCharsType): { data: number[] }[] => {
      const length = getLengthForType(sectionType);
      return [
        {
          data: [
            getChartStatics(sectionType) / length,
            getCardStatics({
              orderType: ICardOrderType.SEQUENCE,
              learnType: ICardLearnType.LEARN,
              selectedType: ICardSelectionType.ALL,
              sectionType: sectionType,
            }) / length,
            getCardStatics({
              orderType: ICardOrderType.SEQUENCE,
              learnType: ICardLearnType.LEARN,
              selectedType: ICardSelectionType.CUSTOM,
              sectionType: sectionType,
            }) / length,
          ],
        },
        {
          data: [
            getCardStatics({
              orderType: ICardOrderType.SEQUENCE,
              learnType: ICardLearnType.PRACTICE,
              selectedType: ICardSelectionType.ALL,
              sectionType: sectionType,
            }) / length,
            getCardStatics({
              orderType: ICardOrderType.SEQUENCE,
              learnType: ICardLearnType.PRACTICE,
              selectedType: ICardSelectionType.CUSTOM,
              sectionType: sectionType,
            }) / length,
          ],
        },
      ];
    },
    [getCardStatics, getChartStatics, getLengthForType],
  );

  return { getCharListProgressForType };
};

export default useCharListProgressForType;

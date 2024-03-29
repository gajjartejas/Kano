import { Platform } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';

//App Modules
import numerals from 'app/assets/lang/numerals/numerals.json';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import { ICharInfo } from 'app/models/models/char';
import { useCallback, useMemo } from 'react';

const useNumeralChartItems = (): ICharCellListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = useCallback((charInfo: ICharInfo): ICharCellItem => {
    return {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
      svg: charInfo.svg,
      audio: Platform.OS === 'ios' ? charInfo.audio_ios : charInfo.audio_android,
      totalLength: charInfo.total_length,
      groups: charInfo.groups,
    };
  }, []);

  const cellVMs = numerals.map((v: ICharInfo) => transformCharToCellVM(v));
  return useMemo(() => {
    return [{ title: t('learnCharsChartScreen.header.numerals'), data: cellVMs }];
  }, [cellVMs, t]);
};

export default useNumeralChartItems;

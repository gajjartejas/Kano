import { Platform } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';

//App Modules
import vowels from 'app/assets/lang/vowels/vowels.json';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import { ICharInfo } from 'app/models/models/char';
import { useCallback, useMemo } from 'react';

const useVowelsChartItems = (): ICharCellListSection[] => {
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

  const cellVMs = vowels.map((v: ICharInfo) => transformCharToCellVM(v));
  return useMemo(() => {
    return [{ title: t('learnCharsChartScreen.header.vowels'), data: cellVMs }];
  }, [cellVMs, t]);
};

export default useVowelsChartItems;

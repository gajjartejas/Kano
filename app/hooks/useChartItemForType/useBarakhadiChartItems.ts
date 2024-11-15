import { Platform } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';

//App Modules
import barakhadi from 'app/assets/lang/barakhadi/barakhadi.json';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import { ICharGroupInfo, ICharInfo } from 'app/models/models/char';
import { useCallback, useMemo } from 'react';

const useBarakhadiChartItems = (): ICharCellListSection[] => {
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

  const transformCharsToSectionVM = useCallback(
    (group: ICharGroupInfo): ICharCellListSection => {
      return {
        title: t('learnCharsChartScreen.header.barakhadi', { id30001: group.en, id30002: group.gu }),
        data: group.chars?.map((v: ICharInfo) => transformCharToCellVM(v)) || [],
      };
    },
    [t, transformCharToCellVM],
  );

  return useMemo(() => {
    return barakhadi.map((v: ICharGroupInfo) => transformCharsToSectionVM(v));
  }, [transformCharsToSectionVM]);
};

export default useBarakhadiChartItems;

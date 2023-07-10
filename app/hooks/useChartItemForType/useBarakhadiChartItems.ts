import { Platform } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';

//App Modules
import barakhadi from 'app/assets/lang/barakhadi/barakhadi.json';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import { ICharGroupInfo, ICharInfo } from 'app/models/models/char';

const useBarakhadiChartItems = (): ICharCellListSection[] => {
  //Constants
  const { t } = useTranslation();

  const transformCharToCellVM = (charInfo: ICharInfo): ICharCellItem => {
    return {
      id: charInfo.id,
      en: charInfo.en,
      gu: charInfo.gu,
      diacritic: charInfo.diacritic!,
      svg: charInfo.svg,
      audio: Platform.OS === 'ios' ? charInfo.audio_ios : charInfo.audio_android,
    };
  };

  const transformCharsToSectionVM = (group: ICharGroupInfo): ICharCellListSection => {
    return {
      title: t('learnCharsChartScreen.header.barakhadi', { en: group.en, gu: group.gu }),
      data: group.chars?.map((v: ICharInfo) => transformCharToCellVM(v)) || [],
    };
  };

  return barakhadi.map((v: ICharGroupInfo) => transformCharsToSectionVM(v));
};

export default useBarakhadiChartItems;

import { Platform } from 'react-native';

//ThirdParty
import { useTranslation } from 'react-i18next';

//App Modules
import consonants from 'app/assets/lang/consonants/consonants.json';
import { ICharCellItem, ICharCellListSection } from 'app/components/CharCellItem';
import { ICharInfo } from 'app/models/models/char';

const useConsonantsChartItems = (): ICharCellListSection[] => {
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
      totalLength: charInfo.total_length,
      groups: charInfo.groups,
    };
  };

  const transformCharsToSectionVM = (cellItems: ICharCellItem[]): ICharCellListSection => {
    return {
      title: t('learnCharsChartScreen.header.consonants'),
      data: cellItems,
    };
  };

  const cellVMs = consonants.map((v: ICharInfo) => transformCharToCellVM(v));
  return [transformCharsToSectionVM(cellVMs)];
};

export default useConsonantsChartItems;

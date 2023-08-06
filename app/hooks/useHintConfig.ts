import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export interface IHintConfig {
  id: number;
  hints: string[];
}

const useHintConfig = (): IHintConfig[] => {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      {
        id: 0,
        hints: [t('hints.card.hint1'), t('hints.card.hint2')],
      },
      {
        id: 1,
        hints: [t('hints.chart.hint1')],
      },
      {
        id: 2,
        hints: [t('hints.chartInfo.hint1')],
      },
    ];
  }, [t]);
};

export default useHintConfig;

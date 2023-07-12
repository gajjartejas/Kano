import { useTranslation } from 'react-i18next';

export interface IHintConfig {
  id: number;
  hints: string[];
}

const useHintConfig = (): IHintConfig[] => {
  const { t } = useTranslation();
  return [
    {
      id: 0,
      hints: [t('hints.card.hint1'), t('hints.card.hint2')],
    },
    {
      id: 1,
      hints: [t('hints.chart.hint1')],
    },
  ];
};

export default useHintConfig;

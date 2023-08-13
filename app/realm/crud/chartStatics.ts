import RealmContext from 'app/realm/RealmContext';
import Realm from 'realm';
import { useCallback } from 'react';
import ChartStatics, { IChartStatics } from 'app/realm/modals/chartStatics';
import { LearnCharsType } from 'app/navigation/types';

const useChartStatics = () => {
  const chartStatics = RealmContext.useQuery(ChartStatics);
  const realm = RealmContext.useRealm();

  const getChartStatics = useCallback(
    (sectionType: LearnCharsType): number => {
      return chartStatics.filtered('sectionType=$0 DISTINCT(charId)', sectionType).length;
    },
    [chartStatics],
  );

  const addChartStatics = useCallback(
    (data: IChartStatics) => {
      realm.write(() => {
        realm.create('ChartStatics', {
          _id: new Realm.BSON.ObjectId(),
          charId: data.charId,
          sectionType: data.sectionType,
          createdDate: data.createdDate,
          synced: data.synced,
        });
      });
    },
    [realm],
  );

  const clearAllData = useCallback(() => {
    realm.write(() => {
      realm.delete(chartStatics);
    });
  }, [chartStatics, realm]);

  return {
    addChartStatics,
    getChartStatics,
    clearAllData,
  };
};

export default useChartStatics;

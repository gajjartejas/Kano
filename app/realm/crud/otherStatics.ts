import RealmContext from 'app/realm/RealmContext';
import Realm from 'realm';
import { useCallback } from 'react';
import OtherStatics, { IOtherStatics, OtherStaticTypes } from 'app/realm/modals/otherStatics';

const useOtherStatics = () => {
  const otherStatics = RealmContext.useQuery(OtherStatics);
  const realm = RealmContext.useRealm();

  const getOtherStatics = useCallback(
    (type: OtherStaticTypes): number => {
      return otherStatics.filtered('sectionType=$0 DISTINCT(sectionType)', type).length;
    },
    [otherStatics],
  );

  const addOtherStatics = useCallback(
    (data: IOtherStatics) => {
      realm.write(() => {
        realm.create('OtherStatics', {
          _id: new Realm.BSON.ObjectId(),
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
      realm.delete(otherStatics);
    });
  }, [otherStatics, realm]);

  return {
    addOtherStatics,
    getOtherStatics,
    clearAllData,
  };
};

export default useOtherStatics;

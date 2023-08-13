import RealmContext from 'app/realm/RealmContext';
import Realm from 'realm';
import { useCallback } from 'react';
import CardStatics, {
  ICardLearnType,
  ICardOrderType,
  ICardSelectionType,
  ICardStatics,
} from 'app/realm/modals/cardStatics';
import { LearnCharsType } from 'app/navigation/types';

const useCardStatics = () => {
  const cardStatics = RealmContext.useQuery(CardStatics);
  const realm = RealmContext.useRealm();

  const getCardStatics = useCallback(
    (config: {
      orderType: ICardOrderType;
      learnType: ICardLearnType;
      selectedType: ICardSelectionType;
      sectionType: LearnCharsType;
    }): number => {
      return cardStatics.filtered(
        'orderType=$0 && learnType=$1 && selectedType=$2 && sectionType=$3 DISTINCT(charId)',
        config.orderType,
        config.learnType,
        config.selectedType,
        config.sectionType,
      ).length;
    },
    [cardStatics],
  );

  const addCardStatics = useCallback(
    (data: ICardStatics) => {
      realm.write(() => {
        realm.create('CardStatics', {
          _id: new Realm.BSON.ObjectId(),
          charId: data.charId,
          orderType: data.orderType,
          learnType: data.learnType,
          selectedType: data.selectedType,
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
      realm.delete(cardStatics);
    });
  }, [cardStatics, realm]);

  return {
    addCardStatics,
    getCardStatics,
    clearAllData,
  };
};

export default useCardStatics;

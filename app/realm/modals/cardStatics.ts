import Realm from 'realm';
import { LearnCharsType } from 'app/navigation/types';

// Define your object model
class CardStatics extends Realm.Object<CardStatics> {
  _id!: Realm.BSON.ObjectId;
  charId!: number;
  orderType!: ICardOrderType;
  learnType!: ICardLearnType;
  selectedType!: ICardSelectionType;
  sectionType!: LearnCharsType;
  createdDate!: Date;
  synced!: boolean;
  static schema = {
    name: 'CardStatics',
    properties: {
      _id: 'objectId',
      charId: 'int',
      orderType: 'int',
      learnType: 'int',
      selectedType: 'int',
      sectionType: 'int',
      createdDate: 'date',
      synced: 'bool',
    },
    primaryKey: '_id',
  };
}

export interface ICardStatics {
  charId: number;
  orderType: ICardOrderType;
  learnType: ICardLearnType;
  selectedType: ICardSelectionType;
  sectionType: LearnCharsType;
  createdDate: Date;
  synced: boolean;
}

export enum ICardOrderType {
  SEQUENCE,
  RANDOM,
}

export enum ICardLearnType {
  LEARN,
  PRACTICE,
}

export enum ICardSelectionType {
  ALL,
  CUSTOM,
}

export default CardStatics;

import Realm from 'realm';
import { LearnCharsType } from 'app/navigation/types';

// Define your object model
class ChartStatics extends Realm.Object<ChartStatics> {
  _id!: Realm.BSON.ObjectId;
  charId!: number;
  sectionType!: LearnCharsType;
  createdDate!: Date;
  synced!: boolean;
  static schema = {
    name: 'ChartStatics',
    properties: {
      _id: 'objectId',
      charId: 'int',
      sectionType: 'int',
      createdDate: 'date',
      synced: 'bool',
    },
    primaryKey: '_id',
  };
}

export interface IChartStatics {
  charId: number;
  sectionType: LearnCharsType;
  createdDate: Date;
  synced: boolean;
}

export default ChartStatics;

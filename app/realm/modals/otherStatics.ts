import Realm from 'realm';

// Define your object model
class OtherStatics extends Realm.Object<OtherStatics> {
  _id!: Realm.BSON.ObjectId;
  sectionType!: OtherStaticTypes;
  createdDate!: Date;
  synced!: boolean;
  static schema = {
    name: 'OtherStatics',
    properties: {
      _id: 'objectId',
      sectionType: 'int',
      createdDate: 'date',
      synced: 'bool',
    },
    primaryKey: '_id',
  };
}

export interface IOtherStatics {
  sectionType: OtherStaticTypes;
  createdDate: Date;
  synced: boolean;
}

export enum OtherStaticTypes {
  OverViewIntro = 0,
  CulturalIntro = 1,
}

export default OtherStatics;

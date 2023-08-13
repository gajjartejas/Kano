import Realm from 'realm';

export const onMigration = (oldRealm: Realm, newRealm: Realm) => {
  console.log('onMigration->oldRealm Version', oldRealm.schemaVersion);
  console.log('onMigration->newRealm Version', newRealm.schemaVersion);
};

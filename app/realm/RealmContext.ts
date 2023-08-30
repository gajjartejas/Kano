// Create a configuration object

import DeviceData from 'app/realm/modals/cardStatics';
import ChartStatics from 'app/realm/modals/chartStatics';
import OtherStatics from 'app/realm/modals/otherStatics';
import { createRealmContext } from '@realm/react';
import { onMigration } from 'app/realm/migration';

const realmContext: Realm.Configuration = {
  schema: [DeviceData, ChartStatics, OtherStatics],
  onMigration: onMigration,
  deleteRealmIfMigrationNeeded: __DEV__,
};

if (__DEV__) {
  delete realmContext.onMigration;
}

const RealmContext = createRealmContext(realmContext);

export default RealmContext;

// Create a configuration object

import DeviceData from 'app/realm/modals/cardStatics';
import { createRealmContext } from '@realm/react';
import { onMigration } from 'app/realm/migration';
import ChartStatics from 'app/realm/modals/chartStatics';

const realmContext: Realm.Configuration = {
  schema: [DeviceData, ChartStatics],
  onMigration: onMigration,
  deleteRealmIfMigrationNeeded: __DEV__,
};

if (__DEV__) {
  delete realmContext.onMigration;
}

const RealmContext = createRealmContext(realmContext);

export default RealmContext;

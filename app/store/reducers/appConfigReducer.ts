/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/store/actions/types';
import { IAppConfigState } from 'app/models/reducers/appConfig';

const initialState: IAppConfigState = {
  sample: false,
};

export const appConfigReducer = createReducer(initialState, {
  [types.UPDATE_SAMPLE](state: IAppConfigState, action: { type: string; payload: boolean }) {
    return {
      ...state,
      sample: action.payload,
    };
  },
});

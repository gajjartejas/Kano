/*
 * Reducer actions related with login
 */
import * as types from './types';

export function updateSample(sample: boolean) {
  return {
    type: types.UPDATE_SAMPLE,
    payload: sample,
  };
}

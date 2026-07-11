import type { ActionWithPayload } from '../../types/action.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export default function isPreloadReducer(
  isPreload: boolean = true,
  action: ActionWithPayload<{ isPreload: boolean }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.SET_IS_PRELOAD:
      return action.payload?.isPreload;
    default:
      return isPreload;
  }
}

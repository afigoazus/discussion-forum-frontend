import type { ActionWithPayload } from '../../types/action.types';
import type { User } from '../../types/user.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export default function authUserReducer(
  authUser: User | null = null,
  action: ActionWithPayload<{ authUser: User }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.SET_AUTH_USER:
      return action.payload?.authUser ?? null;
    case REDUX_ACTION_TYPE.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
}

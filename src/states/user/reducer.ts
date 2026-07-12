import type { ActionWithPayload } from '../../types/action.types';
import type { User } from '../../types/user.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export default function usersReducer(
  users: User[] = [],
  action: ActionWithPayload<{ users: User[] }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.RECEIVE_USERS:
      return action.payload?.users ?? users;
    default:
      return users;
  }
}

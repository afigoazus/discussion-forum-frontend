import type { ActionWithPayload } from '../../types/action.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export default function commentReducer(
  comment: { threadId: string; text: string }[] = [],
  action: ActionWithPayload<{ comment: { threadId: string; text: string } }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.ADD_COMMENT:
      return action.payload?.comment ? [action.payload.comment, ...comment] : comment;
    default:
      return comment;
  }
}

import type { ActionWithPayload } from '../../types/action.types';
import type { Thread } from '../../types/thread.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export default function threadsReducer(
  threads: Thread[] = [],
  action: ActionWithPayload<{ threads?: Thread[]; thread?: Thread }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.RECEIVE_THREADS:
      return action.payload?.threads ?? threads;
    case REDUX_ACTION_TYPE.ADD_THREAD:
      return action.payload?.thread ? [action.payload.thread, ...threads] : threads;
    default:
      return threads;
  }
}

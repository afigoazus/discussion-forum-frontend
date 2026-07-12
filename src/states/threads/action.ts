import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch } from '..';
import type { CreateThread, Thread, ToggleUpvoteThreadProps } from '../../types/thread.types';
import type { ActionWithPayload } from '../../types/action.types';
import REDUX_ACTION_TYPE from '../actionTypes';
import apiService from '../../utils/api';

const api = apiService();

export function receiveThreadsAction(threads: Thread[]): ActionWithPayload<{ threads: Thread[] }> {
  return {
    type: REDUX_ACTION_TYPE.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

export function addThreadActionCreator(thread: Thread): ActionWithPayload<{ thread: Thread }> {
  return {
    type: REDUX_ACTION_TYPE.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

export function toggleUpvoteThreadActionCreator({
  threadId,
  userId,
}: ToggleUpvoteThreadProps): ActionWithPayload<{ threadId: string; userId: string }> {
  return {
    type: REDUX_ACTION_TYPE.TOGGLE_UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function asyncAddThread({ title, body, category }: CreateThread) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Terjadi kesalahan yang tidak diketahui');
      }
      throw error;
    }

    dispatch(hideLoading());
  };
}

// export function asyncToggleUpvoteThread(threadId: string) {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     dispatch(showLoading());
//     const state = getState();

//     const { authUser } = state;

//     dispatch(toggleUpvoteThreadActionCreator({ threadId, userId: authUser?.id || '' }));

//     try {
//         await
//     } catch (error) {

//     }
//   };
// }

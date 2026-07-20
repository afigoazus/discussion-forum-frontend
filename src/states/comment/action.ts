import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch, RootState } from '..';
import type { ActionWithPayload } from '../../types/action.types';
import type {
  AsyncAddCommentProps,
  CreateCommentProps,
  ToggleVoteCommentProps,
} from '../../types/comment.types';
import REDUX_ACTION_TYPE from '../actionTypes';
import apiService from '../../utils/api';

const api = apiService();

export function addCommentActionCreator({
  threadId,
  text,
}: CreateCommentProps): ActionWithPayload<{ comment: { threadId: string; text: string } }> {
  return {
    type: REDUX_ACTION_TYPE.ADD_COMMENT,
    payload: {
      comment: {
        threadId,
        text,
      },
    },
  };
}

export function toggleUpvoteCommentActionCreator({
  threadId,
  commentId,
  userId,
}: ToggleVoteCommentProps & { userId: string }): ActionWithPayload<{
  threadId: string;
  commentId: string;
  userId: string;
}> {
  return {
    type: REDUX_ACTION_TYPE.TOGGLE_UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

export function toggleDownvoteCommentActionCreator({
  threadId,
  commentId,
  userId,
}: ToggleVoteCommentProps & { userId: string }): ActionWithPayload<{
  threadId: string;
  commentId: string;
  userId: string;
}> {
  return {
    type: REDUX_ACTION_TYPE.TOGGLE_DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

export function asyncAddComment({ threadId, text }: AsyncAddCommentProps) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      await api.createComment(threadId, text);
      dispatch(addCommentActionCreator({ threadId, text }));
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

export function asyncUpvoteComment({ threadId, commentId }: ToggleVoteCommentProps) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    const userId = authUser?.id || '';

    dispatch(toggleUpvoteCommentActionCreator({ threadId, commentId, userId }));

    try {
      await api.toggleUpvoteComment(threadId, commentId);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Terjadi kesalahan yang tidak diketahui');
      }
      // Revert action by dispatching again if needed, or simply let the detail page reload
      throw error;
    }
  };
}

export function asyncDownvoteComment({ threadId, commentId }: ToggleVoteCommentProps) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    const userId = authUser?.id || '';

    dispatch(toggleDownvoteCommentActionCreator({ threadId, commentId, userId }));

    try {
      await api.toggleDownvoteComment(threadId, commentId);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Terjadi kesalahan yang tidak diketahui');
      }
      throw error;
    }
  };
}

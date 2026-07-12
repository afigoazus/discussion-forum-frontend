import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch } from '..';
import type { ActionWithPayload } from '../../types/action.types';
import type { AsyncAddCommentProps, CreateCommentProps } from '../../types/comment.types';
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

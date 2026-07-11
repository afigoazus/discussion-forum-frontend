import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch } from '..';
import type { ActionWithPayload } from '../../types/action.types';
import REDUX_ACTION_TYPE from '../actionTypes';
import apiService from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const api = apiService();

export function setIsPreloadActionCreator(
  isPreload: boolean,
): ActionWithPayload<{ isPreload: boolean }> {
  return {
    type: REDUX_ACTION_TYPE.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export function asyncPreloadProcess() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
}

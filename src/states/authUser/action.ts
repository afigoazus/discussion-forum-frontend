import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { LoginUser, User } from '../../types/user.types';
import REDUX_ACTION_TYPE from '../actionTypes';
import type { AppDispatch } from '..';
import apiService from '../../utils/api';

const api = apiService();

export function setAuthUserActionCreator(authUser: User | null) {
  return {
    type: REDUX_ACTION_TYPE.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: REDUX_ACTION_TYPE.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

export function asyncSetAuthUser({ email, password }: LoginUser) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error: unknown) {
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

export function asyncUnsetAuthUser() {
  return (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
    dispatch(hideLoading());
  };
}

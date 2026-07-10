import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch } from '..';
import type { ActionWithPayload } from '../../types/action.types';
import type { RegisterUser, User } from '../../types/user.types';
import apiService from '../../utils/api';
import REDUX_ACTION_TYPE from '../actionTypes';

const api = apiService();

export function receiveUsersActionCreator(users: User[]): ActionWithPayload<{ users: User[] }> {
  return {
    type: REDUX_ACTION_TYPE.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

export function asyncRegisterUser({ name, email, password }: RegisterUser) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
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

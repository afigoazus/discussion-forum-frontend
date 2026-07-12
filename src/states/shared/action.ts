import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch } from '../index';
import apiService from '../../utils/api';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsAction } from '../threads/action';

const api = apiService();

export default function asyncPopulateUsersAndThreads() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThread();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsAction(threads));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Terjadi kesalahan yang tidak diketahui');
      }
    } finally {
      dispatch(hideLoading());
    }
  };
}

import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import type { AppDispatch } from '..';
import type { ActionWithPayload } from '../../types/action.types';
import apiService from '../../utils/api';
import REDUX_ACTION_TYPE from '../actionTypes';
import type { Leaderboards } from '../../types/leaderboard.types';

const api = apiService();

export function receiveLeaderboardAction(
  leaderboards: Leaderboards[],
): ActionWithPayload<{ leaderboards: Leaderboards[] }> {
  return {
    type: REDUX_ACTION_TYPE.RECEIVE_LEADERBORD,
    payload: {
      leaderboards,
    },
  };
}

export function asyncReceiveLeaderboardActionCreator() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();

      dispatch(receiveLeaderboardAction(leaderboards));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Terjadi kesalahan yang tidak diketahui');
      }
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

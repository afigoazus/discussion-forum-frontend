import type { ActionWithPayload } from '../../types/action.types';
import type { Leaderboards } from '../../types/leaderboard.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export default function leaderboardsReducer(
  leaderboards: Leaderboards[] = [],
  action: ActionWithPayload<{
    leaderboards: Leaderboards[];
  }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.RECEIVE_LEADERBORD:
      return action.payload?.leaderboards ?? leaderboards;
    default:
      return leaderboards;
  }
}

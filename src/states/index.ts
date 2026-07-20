import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar';
import authUserReducer from './authUser/reducer';
import usersReducer from './user/reducer';
import isPreloadReducer from './isPreload/reducer';
import commentReducer from './comment/reducer';
import leaderboardsReducer from './leaderboard/reducer';
import { threadDetailReducer, threadReducer } from './threads/reducer';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    users: usersReducer,
    isPreload: isPreloadReducer,
    threads: threadReducer,
    threadDetail: threadDetailReducer,
    comment: commentReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * test scenario for threadReducer
 *
 * - threadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with the new thread when given by ADD_THREAD action
 *  - should return the threads with the toggled upvote thread when given by TOGGLE_UPVOTE_THREAD action
 *  - should return the threads with the toggled downvote thread when given by TOGGLE_DOWNVOTE_THREAD action
 *  - should return the threads with neutralized vote thread when given by TOGGLE_NEUTRALVOTE_THREAD action
 *
 */

import { describe, expect, it } from 'vitest';
import { threadReducer } from './reducer';
import type { Thread, ToggleVoteThreadProps } from '../../types/thread.types';
import type { ActionWithPayload } from '../../types/action.types';
import REDUX_ACTION_TYPE from '../actionTypes';

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState: Thread[] = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState: Thread[] = [];
    const action: ActionWithPayload<{ threads: Thread[] }> = {
      type: REDUX_ACTION_TYPE.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload?.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action: ActionWithPayload<{ thread: Thread }> = {
      type: REDUX_ACTION_TYPE.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-22T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload?.thread, ...initialState]);
  });

  it('should return the thread with the toggle upvote, downvote, and neutral vote', () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const upvoteAction: ActionWithPayload<ToggleVoteThreadProps> = {
      type: REDUX_ACTION_TYPE.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const downvoteAction: ActionWithPayload<ToggleVoteThreadProps> = {
      type: REDUX_ACTION_TYPE.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    const neutralvoteAction: ActionWithPayload<ToggleVoteThreadProps> = {
      type: REDUX_ACTION_TYPE.TOGGLE_NEUTRALVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote thread
    const nextState = threadReducer(initialState, upvoteAction);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [upvoteAction.payload?.userId],
      },
    ]);

    // action: downvote thread
    const nextState2 = threadReducer(nextState, downvoteAction);

    // assert
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: [downvoteAction.payload?.userId],
        upVotesBy: [],
      },
    ]);

    // action: neutralvote thread
    const nextState3 = threadReducer(nextState2, neutralvoteAction);

    // assert
    expect(nextState3).toEqual(initialState);
  });
});

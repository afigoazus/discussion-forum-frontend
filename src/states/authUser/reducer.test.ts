/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the authUser when given by SET_AUTH_USER action
 *  - should return null when given by UNSET_AUTH_USER action
 *
 */

import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';
import type { User } from '../../types/user.types';
import type { ActionWithPayload } from '../../types/action.types';
import REDUX_ACTION_TYPE from '../actionTypes';

describe('authReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState: null = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action: ActionWithPayload<{ authUser: User }> = {
      type: REDUX_ACTION_TYPE.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload?.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action: ActionWithPayload<{ authUser: User | null }> = {
      type: REDUX_ACTION_TYPE.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });
});

/**
 * test scenario for asyncPopulateUsersAndThreads thunk
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';
import asyncPopulateUsersAndThreads from './action';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsAction } from '../threads/action';
import type { User } from '../../types/user.types';
import type { Thread } from '../../types/thread.types';

const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    getAllUsers: vi.fn(),
    getAllThread: vi.fn(),
  },
}));

vi.mock('../../utils/api', () => ({
  default: () => mockApi,
}));

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    // Reset status mock setiap kali pengujian dijalankan
    mockApi.getAllUsers.mockReset();
    mockApi.getAllThread.mockReset();

    // Mock global window.alert
    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const fakeUsersResponse: User[] = [
    {
      id: 'user-1',
      name: 'User Satu',
      email: 'user1@gmail.com',
      avatar: 'https://generated-image-url.jpg',
    },
  ];

  const fakeThreadsResponse: Thread[] = [
    {
      id: 'thread-1',
      title: 'Thread Satu',
      body: 'Body Thread Satu',
      category: 'General',
      createdAt: '2026-01-01T00:00:00.000Z',
      ownerId: 'user-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ];

  const fakeErrorResponse = new Error('Ups, terjadi kesalahan jaringan');

  it('should dispatch action correctly when data fetching success', async () => {
    const dispatch = vi.fn();

    mockApi.getAllUsers.mockResolvedValue(fakeUsersResponse);
    mockApi.getAllThread.mockResolvedValue(fakeThreadsResponse);

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsAction(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    mockApi.getAllUsers.mockRejectedValue(fakeErrorResponse);
    mockApi.getAllThread.mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

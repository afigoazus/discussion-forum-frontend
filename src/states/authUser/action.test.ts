/**
 * Test scenarios for authUser thunks:
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch actions correctly when login is successful
 *   - should dispatch actions, call alert, and throw error when login fails
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch actions correctly when logout is successful
 */

import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';
import type { User } from '../../types/user.types';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const { mockApi } = vi.hoisted(() => ({
  mockApi: {
    login: vi.fn(),
    putAccessToken: vi.fn(),
    getOwnProfile: vi.fn(),
  },
}));

vi.mock('../../utils/api', () => ({
  default: () => mockApi,
}));

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // TODO: Setup mock untuk API (login, putAccessToken, getOwnProfile)
    // TODO: Setup stub untuk global alert
    mockApi.login.mockReset();
    mockApi.putAccessToken.mockReset();
    mockApi.getOwnProfile.mockReset();

    vi.stubGlobal('alert', vi.fn());
  });

  afterEach(() => {
    // TODO: Restore semua mock
    vi.restoreAllMocks();
  });

  const fakeUserCredentials = {
    email: 'test@example.com',
    password: 'test',
  };

  const fakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

  const fakeUserProfileResponse: User = {
    id: 'user-1',
    name: 'User Satu',
    email: 'user1@gmail.com',
    avatar: 'https://generated-image-url.jpg',
  };

  const fakeErrorResponse = new Error('Ups, terjadi kesalahan jaringan');

  it('should dispatch actions correctly when login is successful', async () => {
    // Skenario Pengujian:
    // 1. Lakukan mock pada API login agar mengembalikan token tiruan (fake token).
    // 2. Lakukan mock pada API getOwnProfile agar mengembalikan data profil pengguna tiruan.
    // 3. Panggil thunk asyncSetAuthUser dengan kredensial email & password tiruan.
    // 4. Verifikasi bahwa:
    //    - dispatch(showLoading()) dipanggil di awal.
    //    - api.login dipanggil dengan parameter yang benar.
    //    - api.putAccessToken dipanggil dengan token hasil login.
    //    - api.getOwnProfile dipanggil untuk mengambil profil.
    //    - dispatch(setAuthUserActionCreator(authUser)) dipanggil dengan data profil yang didapat.
    //    - dispatch(hideLoading()) dipanggil di akhir.

    const dispatch = vi.fn();

    mockApi.login.mockResolvedValue(fakeToken);
    mockApi.getOwnProfile.mockResolvedValue(fakeUserProfileResponse);

    await asyncSetAuthUser(fakeUserCredentials)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(mockApi.login).toHaveBeenCalledWith(fakeUserCredentials);
    expect(mockApi.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(mockApi.getOwnProfile).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions, call alert, and throw error when login fails', async () => {
    // Skenario Pengujian:
    // 1. Lakukan mock pada API login agar mengembalikan Promise reject (error).
    // 2. Panggil thunk asyncSetAuthUser dan tangkap error-nya menggunakan block try-catch atau assertions helper.
    // 3. Verifikasi bahwa:
    //    - dispatch(showLoading()) dipanggil di awal.
    //    - alert dipanggil dengan pesan error yang sesuai.
    //    - Thunk melemparkan kembali error tersebut (re-throw).
    //    - dispatch(hideLoading()) tidak dipanggil (karena eksekusi terhenti akibat throw error sebelum mencapai akhir).

    mockApi.login.mockRejectedValue(fakeErrorResponse);
    mockApi.getOwnProfile.mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();

    let thrownError;
    try {
      await asyncSetAuthUser(fakeUserCredentials)(dispatch);
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toEqual(fakeErrorResponse);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).not.toHaveBeenCalledWith(hideLoading());
    expect(alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  const fakeToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

  beforeEach(() => {
    // TODO: Setup mock untuk API (putAccessToken)
    mockApi.putAccessToken.mockReset();
  });

  afterEach(() => {
    // TODO: Restore semua mock
    vi.resetAllMocks();
  });

  it('should dispatch actions correctly when logout is successful', () => {
    // Skenario Pengujian:
    // 1. Panggil thunk asyncUnsetAuthUser.
    // 2. Verifikasi bahwa:
    //    - dispatch(showLoading()) dipanggil di awal.
    //    - dispatch(unsetAuthUserActionCreator()) dipanggil untuk mereset authUser menjadi null.
    //    - api.putAccessToken dipanggil dengan argumen string kosong ('') untuk menghapus token.
    //    - dispatch(hideLoading()) dipanggil di akhir.

    const dispatch = vi.fn();

    asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(mockApi.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

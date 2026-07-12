import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../states/hooks';
import { asyncUnsetAuthUser } from '../../../states/authUser/action';
import asyncPopulateUsersAndThreads from '../../../states/shared/action';
import {
  asyncAddThread,
  asyncToggleDownvoteThread,
  asyncToggleUpvoteThread,
} from '../../../states/threads/action';
import ThreadList from '../components/ThreadList';
import ThreadInput from '../components/ThreadInput';
import Loading from '../../../components/common/Loading';
import type { CreateThread } from '../../../types/thread.types';

export default function ThreadPage() {
  const { authUser = null, threads = [], users = [] } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onAddThread = (newThread: CreateThread) => {
    dispatch(asyncAddThread(newThread));
  };

  const onUpVoteThread = (threadId: string) => {
    dispatch(asyncToggleUpvoteThread(threadId));
  };

  const onDownVoteThread = (threadId: string) => {
    dispatch(asyncToggleDownvoteThread(threadId));
  };

  if (!authUser) {
    return null;
  }

  return (
    <>
      <Loading />
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              DiscussionForum
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {authUser.avatar ? (
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold dark:bg-purple-900/30 dark:text-purple-400 text-sm">
                  {authUser.name.charAt(0)}
                </div>
              )}
              <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:block">
                {authUser.name}
              </span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <ThreadInput addThread={onAddThread} />
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Daftar Diskusi</h2>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                {threads.length}
                Diskusi
              </span>
            </div>
            <ThreadList
              threads={threads}
              users={users}
              onUpvoteThread={onUpVoteThread}
              onDownvoteThread={onDownVoteThread}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white">Tentang Forum</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Selamat datang di platform forum diskusi kami. Bagikan pemikiran, pertanyaan, atau
                solusi menarik Anda dengan developer lainnya!
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

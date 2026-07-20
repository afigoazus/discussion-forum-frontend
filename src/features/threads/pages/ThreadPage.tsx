import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      dispatch(asyncUnsetAuthUser());
    }, 800);
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

  const uniqueCategory = [...new Map(threads.map((thread) => [thread.category, thread])).values()];

  const onHandleCategory = (category: string) => {
    setFilterCategory((prev) => (prev === category ? '' : category));
  };

  const filteredThreads = threads.filter((thread) => (
    thread.category.toLowerCase().includes(filterCategory.toLowerCase())
  ));

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
              disabled={isLoggingOut}
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 flex items-center gap-1.5"
            >
              {isLoggingOut ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Keluar...</span>
                </>
              ) : (
                'Logout'
              )}
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

            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Kategori Populer
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFilterCategory('')}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none ${
                    filterCategory === ''
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                      : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  Semua
                </button>
                {uniqueCategory.map((thread) => (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => onHandleCategory(thread.category)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 focus:outline-none ${
                      filterCategory === thread.category
                        ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/20'
                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                  >
                    #
                    {thread.category}
                  </button>
                ))}
              </div>
            </div>

            <ThreadList
              threads={filteredThreads}
              users={users}
              onUpvoteThread={onUpVoteThread}
              onDownvoteThread={onDownVoteThread}
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                🏆 Leaderboard
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Lihat siapa kontributor teraktif saat ini di forum diskusi kami.
              </p>
              <Link
                to="/leaderboards"
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
              >
                Lihat Klasemen
              </Link>
            </div>

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

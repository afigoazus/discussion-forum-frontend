import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, Trophy, Flame } from 'lucide-react';
import Loading from '../../../components/common/Loading';
import type { Leaderboards } from '../../../types/leaderboard.types';
import LeaderboardPodium from '../components/LeaderboardPodium';
import LeaderboardList from '../components/LeaderboardList';
import { useAppDispatch, useAppSelector } from '../../../states/hooks';
import { asyncReceiveLeaderboardActionCreator } from '../../../states/leaderboard/action';

export default function LeaderboardPage() {
  const { leaderboards = [] } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboardActionCreator());
  }, [dispatch]);

  return (
    <>
      <Loading />
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 transition-colors"
              aria-label="Kembali ke Diskusi"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
              DiscussionForum
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-purple-500" />
              Leaderboard
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 mb-3">
            <Trophy className="w-10 h-10" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Klasemen Pengguna Teraktif
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Berikut daftar kontributor teraktif yang membagikan pemikiran dan solusi terbaik di
            forum ini.
          </p>
        </div>

        {/* Podium Top 3 */}
        <LeaderboardPodium topThree={leaderboards.slice(0, 3)} />

        {/* List Klasemen Sisa (Peringkat 4 ke bawah) */}
        <LeaderboardList leaderboards={leaderboards} />
      </main>
    </>
  );
}

import { Trophy, Medal, Award } from 'lucide-react';
import type { Leaderboards } from '../../../types/leaderboard.types';

interface LeaderboardPodiumProps {
  topThree: Leaderboards[];
}

export default function LeaderboardPodium({ topThree }: LeaderboardPodiumProps) {
  // Pastikan kita memiliki minimal 3 data untuk podium
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <div className="grid grid-cols-3 gap-3 items-end mb-8 pt-4">
      {/* Juara 2 */}
      {second && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2 sm:p-4 text-center shadow-sm order-1 h-[170px] sm:h-[180px] flex flex-col justify-center items-center relative">
          <div className="absolute -top-5">
            <Medal className="w-8 h-8 text-gray-400 drop-shadow" />
          </div>
          <img
            src={second.user.avatar || undefined}
            alt={second.user.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-300 object-cover mb-2"
          />
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white text-center w-full break-words line-clamp-2 px-1">
            {second.user.name}
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">2nd Place</span>
          <span className="text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm mt-1">
            {second.score}
            {' '}
            pts
          </span>
        </div>
      )}

      {/* Juara 1 */}
      {first && (
        <div className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-gray-900 border-2 border-purple-500 dark:border-purple-600 rounded-2xl p-2 sm:p-4 text-center shadow-md order-2 h-[200px] sm:h-[210px] flex flex-col justify-center items-center relative">
          <div className="absolute -top-7">
            <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-md animate-bounce" />
          </div>
          <img
            src={first.user.avatar || undefined}
            alt={first.user.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-yellow-400 object-cover mb-2"
          />
          <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white text-center w-full break-words line-clamp-2 px-1">
            {first.user.name}
          </h3>
          <span className="text-[10px] sm:text-xs text-purple-700 dark:text-purple-300 font-semibold mt-1">
            1st Place
          </span>
          <span className="text-purple-600 dark:text-purple-400 font-extrabold text-sm sm:text-base mt-1">
            {first.score}
            {' '}
            pts
          </span>
        </div>
      )}

      {/* Juara 3 */}
      {third && (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2 sm:p-4 text-center shadow-sm order-3 h-[160px] sm:h-[170px] flex flex-col justify-center items-center relative">
          <div className="absolute -top-5">
            <Award className="w-8 h-8 text-amber-600 drop-shadow" />
          </div>
          <img
            src={third.user.avatar || undefined}
            alt={third.user.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-600 object-cover mb-2"
          />
          <h3 className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white text-center w-full break-words line-clamp-2 px-1">
            {third.user.name}
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1">3rd Place</span>
          <span className="text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm mt-1">
            {third.score}
            {' '}
            pts
          </span>
        </div>
      )}
    </div>
  );
}

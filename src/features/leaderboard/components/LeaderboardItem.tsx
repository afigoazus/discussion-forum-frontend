import type { Leaderboards } from '../../../types/leaderboard.types';

interface LeaderboardItemProps {
  item: Leaderboards;
  rank: number;
}

export default function LeaderboardItem({ item, rank }: LeaderboardItemProps) {
  return (
    <div className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/40 rounded-xl">
      <div className="flex items-center gap-4">
        {/* Peringkat */}
        <span className="w-6 text-center font-bold text-sm text-gray-500 dark:text-gray-400">
          {rank}
        </span>

        {/* Avatar & Nama */}
        <div className="flex items-center gap-3">
          <img
            src={item.user.avatar || undefined}
            alt={item.user.name}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
          />
          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
              {item.user.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.user.email}</p>
          </div>
        </div>
      </div>

      {/* Skor */}
      <div className="text-right">
        <span className="font-bold text-sm text-purple-600 dark:text-purple-400">
          {item.score}
        </span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 block">points</span>
      </div>
    </div>
  );
}

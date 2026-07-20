import type { Leaderboards } from '../../../types/leaderboard.types';
import LeaderboardItem from './LeaderboardItem';

interface LeaderboardListProps {
  leaderboards: Leaderboards[];
}

export default function LeaderboardList({ leaderboards }: LeaderboardListProps) {
  // Hanya ambil data dari peringkat 4 ke bawah (index 3 dan seterusnya)
  const remainingLeaderboards = leaderboards.slice(3);

  if (remainingLeaderboards.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-2 shadow-sm divide-y divide-gray-50 dark:divide-gray-800">
      {remainingLeaderboards.map((item, index) => {
        const rank = index + 4;
        return (
          <LeaderboardItem
            key={item.user.id}
            item={item}
            rank={rank}
          />
        );
      })}
    </div>
  );
}

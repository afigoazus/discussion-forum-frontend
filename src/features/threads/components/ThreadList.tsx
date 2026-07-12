import type { Thread } from '../../../types/thread.types';
import type { User } from '../../../types/user.types';
import ThreadItem from './ThreadItem';

interface ThreadListProps {
  threads: Thread[];
  users: User[];
  onUpvoteThread: (threadId: string) => void;
  onDownvoteThread: (threadId: string) => void;
}

function ThreadList({ threads, users, onUpvoteThread, onDownvoteThread }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">Tidak ada diskusi untuk ditampilkan.</p>
      </div>
    );
  }

  const getUserById = (userId: string) => {
    return users.find((user) => user.id === userId) || null;
  };

  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          user={getUserById(thread.ownerId)}
          onUpvoteThread={onUpvoteThread}
          onDownVoteThread={onDownvoteThread}
        />
      ))}
    </div>
  );
}

export default ThreadList;

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import type { Thread } from '../../../types/thread.types';
import type { User } from '../../../types/user.types';
import { useAppSelector } from '../../../states/hooks';

interface ThreadItemProps {
  thread: Thread;
  user: User | null;
  onUpvoteThread: (threadId: string) => void;
  onDownVoteThread: (threadId: string) => void;
}

function ThreadItem({
  thread, user, onUpvoteThread, onDownVoteThread,
}: ThreadItemProps) {
  const authUser = useAppSelector((state) => state.authUser);

  const isUpvoted = authUser ? thread.upVotesBy.includes(authUser.id) : false;
  const isDownvoted = authUser ? thread.downVotesBy.includes(authUser.id) : false;
  const upvotesCount = thread.upVotesBy.length;
  const downvotesCount = thread.downVotesBy.length;

  const formattedDate = new Date(thread.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleUpvote = () => {
    onUpvoteThread(thread.id);
  };

  const handleDownvote = () => {
    onDownVoteThread(thread.id);
  };

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start gap-4">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold dark:bg-purple-900/30 dark:text-purple-400">
            {user?.name?.charAt(0) || '?'}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white">
              {user?.name || 'Pengguna Tidak Dikenal'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
            <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={thread.createdAt}>
              {formattedDate}
            </time>
          </div>

          <div className="mt-1">
            <span className="inline-block rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              #
              {thread.category}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400">
            <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
          </h3>

          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {parse(thread.body)}
          </div>

          <div className="mt-4 flex items-center gap-6">
            <button
              type="button"
              onClick={handleUpvote}
              className={`flex items-center gap-1.5 text-xs transition-colors hover:text-blue-500 focus:outline-none ${
                isUpvoted ? 'text-blue-600 font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <ThumbsUp
                className="w-4 h-4 text-gray-400 dark:text-gray-500"
                fill={isUpvoted ? '#3b82f6' : 'none'}
              />
              <span>{upvotesCount}</span>
            </button>

            <button
              type="button"
              onClick={handleDownvote}
              className={`flex items-center gap-1.5 text-xs transition-colors hover:text-red-500 focus:outline-none ${
                isDownvoted ? 'text-red-600 font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <ThumbsDown
                className="w-4 h-4 text-gray-400 dark:text-gray-500"
                fill={isDownvoted ? '#ef4444' : 'none'}
              />
              <span>{downvotesCount}</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>
                {thread.totalComments}
                {' '}
                Komentar
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;

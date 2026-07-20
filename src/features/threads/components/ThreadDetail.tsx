import { ThumbsDown, ThumbsUp, ArrowLeft } from 'lucide-react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import type { DetailThread } from '../../../types/thread.types';
import { useAppSelector } from '../../../states/hooks';

interface ThreadDetailProps {
  thread: DetailThread;
  onUpvoteThread: (threadId: string) => void;
  onDownvoteThread: (threadId: string) => void;
}

export default function ThreadDetail({
  thread,
  onUpvoteThread,
  onDownvoteThread,
}: ThreadDetailProps) {
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

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <Link
          to="/threads"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Diskusi
        </Link>
      </div>

      <div className="flex items-start gap-4">
        {thread.owner?.avatar ? (
          <img
            src={thread.owner.avatar}
            alt={thread.owner.name}
            className="h-12 w-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold dark:bg-purple-900/30 dark:text-purple-400 text-lg">
            {thread.owner?.name?.charAt(0) || '?'}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 dark:text-white text-base">
              {thread.owner?.name || 'Pengguna Tidak Dikenal'}
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

          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white break-words">
            {thread.title}
          </h2>

          <div className="mt-4 text-gray-700 dark:text-gray-300 space-y-4 text-base leading-relaxed break-words text-left">
            {parse(thread.body)}
          </div>

          <div className="mt-6 flex items-center gap-6 border-t border-gray-100 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={() => onUpvoteThread(thread.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors hover:text-blue-500 focus:outline-none ${
                isUpvoted ? 'text-blue-600 font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <ThumbsUp
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
                fill={isUpvoted ? '#3b82f6' : 'none'}
              />
              <span>
                Upvote (
                {upvotesCount}
                )
              </span>
            </button>

            <button
              type="button"
              onClick={() => onDownvoteThread(thread.id)}
              className={`flex items-center gap-1.5 text-sm transition-colors hover:text-red-500 focus:outline-none ${
                isDownvoted ? 'text-red-600 font-semibold' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <ThumbsDown
                className="w-5 h-5 text-gray-400 dark:text-gray-500"
                fill={isDownvoted ? '#ef4444' : 'none'}
              />
              <span>
                Downvote (
                {downvotesCount}
                )
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

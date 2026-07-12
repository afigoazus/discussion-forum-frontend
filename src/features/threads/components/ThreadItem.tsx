import type { Thread } from '../../../types/thread.types';
import type { User } from '../../../types/user.types';

interface ThreadItemProps {
  thread: Thread;
  user: User | null;
}

function ThreadItem({ thread, user }: ThreadItemProps) {
  const formattedDate = new Date(thread.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
              #{thread.category}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400">
            {thread.title}
          </h3>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {thread.body}
          </p>

          <div className="mt-4 flex items-center gap-6">
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
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2m0 10V10"
                />
              </svg>
              <span>{thread.upVotesBy.length}</span>
            </div>

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
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m0-10v10"
                />
              </svg>
              <span>{thread.downVotesBy.length}</span>
            </div>

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
              <span>{thread.totalComments} Komentar</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ThreadItem;

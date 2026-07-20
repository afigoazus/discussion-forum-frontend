import { ThumbsDown, ThumbsUp } from 'lucide-react';
import type { Comment } from '../../../types/thread.types';
import { useAppSelector } from '../../../states/hooks';

interface CommentItemProps {
  threadId: string;
  comment: Comment;
  onUpvoteComment: (threadId: string, commentId: string) => void;
  onDownvoteComment: (threadId: string, commentId: string) => void;
}

export default function CommentItem({
  threadId,
  comment,
  onUpvoteComment,
  onDownvoteComment,
}: CommentItemProps) {
  const authUser = useAppSelector((state) => state.authUser);

  const isUpvoted = authUser ? comment.upVotesBy.includes(authUser.id) : false;
  const isDownvoted = authUser ? comment.downVotesBy.includes(authUser.id) : false;
  const upvotesCount = comment.upVotesBy.length;
  const downvotesCount = comment.downVotesBy.length;

  const formattedDate = new Date(comment.createdAt).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {comment.owner?.avatar ? (
        <img
          src={comment.owner.avatar}
          alt={comment.owner.name}
          className="h-9 w-9 rounded-full object-cover border border-gray-200 dark:border-gray-700"
        />
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold dark:bg-purple-900/30 dark:text-purple-400 text-sm">
          {comment.owner?.name?.charAt(0) || '?'}
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 dark:text-white text-sm">
            {comment.owner?.name || 'Pengguna Tidak Dikenal'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
          <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={comment.createdAt}>
            {formattedDate}
          </time>
        </div>

        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {/* Support HTML content if needed (e.g. via html-react-parser) or plain text */}
          <p>{comment.content}</p>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            onClick={() => onUpvoteComment(threadId, comment.id)}
            className={`flex items-center gap-1 text-xs transition-colors hover:text-blue-500 focus:outline-none ${
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
            onClick={() => onDownvoteComment(threadId, comment.id)}
            className={`flex items-center gap-1 text-xs transition-colors hover:text-red-500 focus:outline-none ${
              isDownvoted ? 'text-red-600 font-semibold' : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <ThumbsDown
              className="w-4 h-4 text-gray-400 dark:text-gray-500"
              fill={isDownvoted ? '#ef4444' : 'none'}
            />
            <span>{downvotesCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import type { Comment } from '../../../types/thread.types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onUpvoteComment: (commentId: string) => void;
  onDownvoteComment: (commentId: string) => void;
}

export default function CommentList({
  comments,
  onUpvoteComment,
  onDownvoteComment,
}: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-xl border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada komentar. Jadilah yang pertama memberikan tanggapan!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onUpvoteComment={onUpvoteComment}
          onDownvoteComment={onDownvoteComment}
        />
      ))}
    </div>
  );
}

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../states/hooks';
import { asyncUnsetAuthUser } from '../../../states/authUser/action';
import Loading from '../../../components/common/Loading';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';
import {
  asyncReceiveDetailThread,
  asyncToggleDownvoteThread,
  asyncToggleUpvoteThread,
} from '../../../states/threads/action';
import {
  asyncAddComment,
  asyncDownvoteComment,
  asyncUpvoteComment,
} from '../../../states/comment/action';

export default function ThreadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { threadDetail = null } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // Ambil state authUser
  const authUser = useAppSelector((state) => state.authUser);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      dispatch(asyncReceiveDetailThread(id));
    }
  }, [id, dispatch]);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onUpvoteThread = (threadId: string) => {
    dispatch(asyncToggleUpvoteThread(threadId));
  };

  const onDownvoteThread = (threadId: string) => {
    dispatch(asyncToggleDownvoteThread(threadId));
  };

  const onAddComment = (text: string) => {
    dispatch(asyncAddComment({ threadId: id || '', text }));
    dispatch(asyncReceiveDetailThread(id || ''));
  };

  const onUpvoteComment = (threadId: string, commentId: string) => {
    dispatch(asyncUpvoteComment({ threadId, commentId }));
  };

  const onDownvoteComment = (threadId: string, commentId: string) => {
    dispatch(asyncDownvoteComment({ threadId, commentId }));
  };

  if (!authUser) {
    return null;
  }

  if (!threadDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Memuat detail diskusi...</p>
      </div>
    );
  }

  return (
    <>
      <Loading />
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
              DiscussionForum
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {authUser.avatar ? (
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold dark:bg-purple-900/30 dark:text-purple-400 text-sm">
                  {authUser.name.charAt(0)}
                </div>
              )}
              <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 sm:block">
                {authUser.name}
              </span>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {/* Bagian Detail Thread */}
          <ThreadDetail
            thread={threadDetail}
            onUpvoteThread={onUpvoteThread}
            onDownvoteThread={onDownvoteThread}
          />

          {/* Form input komentar baru */}
          <CommentInput addComment={onAddComment} />

          {/* Daftar Komentar */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Komentar ({threadDetail.comments.length})
            </h3>
            <CommentList
              threadId={threadDetail.id}
              comments={threadDetail.comments}
              onUpvoteComment={onUpvoteComment}
              onDownvoteComment={onDownvoteComment}
            />
          </div>
        </div>
      </main>
    </>
  );
}

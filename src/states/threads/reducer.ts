import type { ActionWithPayload } from '../../types/action.types';
import type { DetailThread, Thread } from '../../types/thread.types';
import REDUX_ACTION_TYPE from '../actionTypes';

export function threadReducer(
  threads: Thread[] = [],
  action: ActionWithPayload<{
    threads?: Thread[];
    thread?: Thread;
    threadId?: string;
    userId?: string;
  }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.RECEIVE_THREADS:
      return action.payload?.threads ?? threads;
    case REDUX_ACTION_TYPE.ADD_THREAD:
      return action.payload?.thread ? [action.payload.thread, ...threads] : threads;
    case REDUX_ACTION_TYPE.TOGGLE_UPVOTE_THREAD: {
      const { threadId, userId } = action.payload || {};
      if (!threadId || !userId) {
        return threads;
      }
      return threads.map((thread) => {
        if (thread.id === threadId) {
          const isAlreadyUpvoted = thread.upVotesBy.includes(userId);
          return {
            ...thread,
            upVotesBy: isAlreadyUpvoted
              ? thread.upVotesBy.filter((id) => id !== userId)
              : [...thread.upVotesBy, userId],
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    }
    case REDUX_ACTION_TYPE.TOGGLE_DOWNVOTE_THREAD: {
      const { threadId, userId } = action.payload || {};
      if (!threadId || !userId) {
        return threads;
      }
      return threads.map((thread) => {
        if (thread.id === threadId) {
          const isAlreadyDownvoted = thread.downVotesBy.includes(userId);
          return {
            ...thread,
            downVotesBy: isAlreadyDownvoted
              ? thread.downVotesBy.filter((id) => id !== userId)
              : [...thread.downVotesBy, userId],
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    }
    case REDUX_ACTION_TYPE.TOGGLE_NEUTRALVOTE_THREAD: {
      const { threadId, userId } = action.payload || {};
      if (!threadId || !userId) {
        return threads;
      }
      return threads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    }
    default:
      return threads;
  }
}

export function threadDetailReducer(
  threadDetail: DetailThread | null = null,
  action: ActionWithPayload<{
    threadDetail?: DetailThread | null;
    threadId?: string;
    commentId?: string;
    userId?: string;
  }> = { type: '' },
) {
  switch (action.type) {
    case REDUX_ACTION_TYPE.RECEIVE_THREADS_DETAIL:
      return action.payload?.threadDetail ?? null;
    case REDUX_ACTION_TYPE.TOGGLE_UPVOTE_THREAD: {
      const { threadId, userId } = action.payload || {};
      if (!threadDetail || threadDetail.id !== threadId || !userId) {
        return threadDetail;
      }
      const isAlreadyUpvoted = threadDetail.upVotesBy.includes(userId);
      return {
        ...threadDetail,
        upVotesBy: isAlreadyUpvoted
          ? threadDetail.upVotesBy.filter((id) => id !== userId)
          : [...threadDetail.upVotesBy, userId],
        downVotesBy: threadDetail.downVotesBy.filter((id) => id !== userId),
      };
    }
    case REDUX_ACTION_TYPE.TOGGLE_DOWNVOTE_THREAD: {
      const { threadId, userId } = action.payload || {};
      if (!threadDetail || threadDetail.id !== threadId || !userId) {
        return threadDetail;
      }
      const isAlreadyDownvoted = threadDetail.downVotesBy.includes(userId);
      return {
        ...threadDetail,
        downVotesBy: isAlreadyDownvoted
          ? threadDetail.downVotesBy.filter((id) => id !== userId)
          : [...threadDetail.downVotesBy, userId],
        upVotesBy: threadDetail.upVotesBy.filter((id) => id !== userId),
      };
    }
    case REDUX_ACTION_TYPE.TOGGLE_UPVOTE_COMMENT: {
      const { commentId, userId } = action.payload || {};
      if (!threadDetail || !commentId || !userId) {
        return threadDetail;
      }
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            const isAlreadyUpvoted = comment.upVotesBy.includes(userId);
            return {
              ...comment,
              upVotesBy: isAlreadyUpvoted
                ? comment.upVotesBy.filter((id) => id !== userId)
                : [...comment.upVotesBy, userId],
              downVotesBy: comment.downVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        }),
      };
    }
    case REDUX_ACTION_TYPE.TOGGLE_DOWNVOTE_COMMENT: {
      const { commentId, userId } = action.payload || {};
      if (!threadDetail || !commentId || !userId) {
        return threadDetail;
      }
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === commentId) {
            const isAlreadyDownvoted = comment.downVotesBy.includes(userId);
            return {
              ...comment,
              downVotesBy: isAlreadyDownvoted
                ? comment.downVotesBy.filter((id) => id !== userId)
                : [...comment.downVotesBy, userId],
              upVotesBy: comment.upVotesBy.filter((id) => id !== userId),
            };
          }
          return comment;
        }),
      };
    }
    default:
      return threadDetail;
  }
}

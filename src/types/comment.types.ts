export interface CreateCommentProps {
  threadId: string;
  text: string;
}

export interface AsyncAddCommentProps {
  threadId: string;
  text: string;
}

export interface ToggleVoteCommentProps {
  threadId: string;
  commentId: string;
}

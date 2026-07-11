import type { User } from './user.types';

export interface Thread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: Array<string>;
  downVotesBy: Array<string>;
  totalComments: number;
}

export interface CreateThread {
  title: string;
  body: string;
  category: string;
}

export interface DetailThread {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  owner: Omit<User, 'email'>;
  upVotesBy: Array<string>;
  downVotesBy: Array<string>;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  owner: Omit<User, 'email'>;
  upVotesBy: Array<string>;
  downVotesBy: Array<string>;
}

export interface createThredProps {
  text: string;
  replyTo: string;
}

export interface ToggleUpvoteThreadProps {
  threadId: string;
  userId: string;
}

export interface AddThreadProps {
  text: string;
  replyTo: string;
}

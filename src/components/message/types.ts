export enum MESSAGE_CONTEXT_TYPE {
  MATCH = 'match',
  POSTING = 'posting',
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  isSent?: boolean;
}

export interface Conversation {
  id: string;
  otherUserId: string;
  otherUserName?: string;
  otherUserAvatar?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
}


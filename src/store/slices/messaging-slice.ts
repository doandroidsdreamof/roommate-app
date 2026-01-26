import { Conversation, Message } from '@/components/message/types';
import { StateCreator } from 'zustand';

export interface MessagingSLice {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  currentConversationId: string | null;

  addMessage: (message: Message) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  setConversations: (conversations: Conversation[]) => void;
  setCurrentConversation: (conversationId: string | null) => void;
  markMessageAsSent: (
    tempId: string,
    conversationId: string,
    timestamp: string
  ) => void;
}

export const createMessagingSlice: StateCreator<MessagingSLice> = (set) => ({
  conversations: [],
  messages: {},
  currentConversationId: null,

  addMessage: (message) =>
    set((state) => {
      const conversationMessages = state.messages[message.conversationId] || [];
      return {
        messages: {
          ...state.messages,
          [message.conversationId]: [...conversationMessages, message],
        },
      };
    }),

  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: messages,
      },
    })),

  setConversations: (conversations) => set({ conversations }),

  setCurrentConversation: (conversationId) =>
    set({ currentConversationId: conversationId }),

  markMessageAsSent: (tempId, conversationId, timestamp) =>
    set((state) => {
      const messages = state.messages[conversationId] || [];
      return {
        messages: {
          ...state.messages,
          [conversationId]: messages.map((msg) =>
            msg.id === tempId ? { ...msg, isSent: true, timestamp } : msg
          ),
        },
      };
    }),
});

import { addPendingMessages } from '@/api/local/messageLocalApi';
import socketService from '@/api/socket/socketService';
// TODO refactor & decouple this mess
interface PendingMessagesPayload {
  from: string;
  message: { message: string; createdAt: string; isOwn: boolean }[]; // TODO response structure
  conversationId: string;
  timestamp: string;
}

let isInitialized = false;
let pendingMessagesListener:
  | ((payload: PendingMessagesPayload) => Promise<void>)
  | null = null;

export const messagingSync = async (userId: string) => {
  if (isInitialized) {
    console.log('✅ Messaging sync already initialized');
    return;
  }

  console.log('🔄 Initializing messaging sync for:', userId);

  await socketService.connect();

  // Listen ONLY for 'pending_messages'
  pendingMessagesListener = async (payload: PendingMessagesPayload) => {
    console.log('📦 Received pending messages:', payload);
    console.log('🚀 ~ conversationId:', payload.conversationId);

    if (payload.conversationId && payload.message) {
      console.log(
        `💾 Saving ${payload.message.length} pending messages for conversation ${payload.conversationId}`
      );
      await addPendingMessages(payload.conversationId, payload.message);
    }
  };

  socketService.onPendingMessages(pendingMessagesListener);

  isInitialized = true;
  console.log('✅ Messaging sync initialized');
};

export const resetMessagingSync = () => {
  if (pendingMessagesListener) {
    socketService.offPendingMessages(pendingMessagesListener);
    pendingMessagesListener = null;
  }
  isInitialized = false;
};

// TODO call it on logout
export const disconnectMessaging = () => {
  resetMessagingSync();
  socketService.disconnect();
};

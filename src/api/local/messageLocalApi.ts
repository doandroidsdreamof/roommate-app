import { eq } from 'drizzle-orm';
import { messages } from 'db/schema';
import { db } from 'db/index';

export interface MessageContent {
  message: string;
  createdAt: string;
  isOwn: boolean;
}

export const getOrCreateConversation = async (
  conversationId: string
): Promise<MessageContent[]> => {
  try {
    const result = await db.query.messages.findFirst({
      where: eq(messages.conversationId, conversationId),
    });

    if (!result) {
      await db.insert(messages).values({
        id: conversationId,
        conversationId,
        content: [],
      });
      return [];
    }

    return result.content;
  } catch (error) {
    console.error('getOrCreateConversation error:', error);
    throw error;
  }
};

export const addMessage = async (
  conversationId: string,
  newMessage: MessageContent
): Promise<void> => {
  try {
    const existing = await db.query.messages.findFirst({
      where: eq(messages.conversationId, conversationId),
    });

    if (!existing) {
      await db.insert(messages).values({
        id: conversationId,
        conversationId,
        content: [newMessage],
      });
    } else {
      const updatedContent = [...existing.content, newMessage];
      await db
        .update(messages)
        .set({ content: updatedContent })
        .where(eq(messages.conversationId, conversationId));
    }
  } catch (error) {
    console.error('addMessage error:', error);
    throw error;
  }
};

export const addPendingMessages = async (
  conversationId: string | undefined,
  newMessages: MessageContent[]
): Promise<void> => {
  try {
    if (!conversationId) {
      console.error('❌ conversationId is undefined, cannot save messages');
      return;
    }

    const existing = await db.query.messages.findFirst({
      where: eq(messages.conversationId, conversationId),
    });
    console.log('🚀 ~ existing:', existing);

    if (!existing) {
      await db.insert(messages).values({
        id: conversationId,
        conversationId,
        content: newMessages,
      });
    } else {
      const updatedContent = [...existing.content, ...newMessages];
      console.log('🚀 ~ updatedContent:', updatedContent);
      await db
        .update(messages)
        .set({ content: updatedContent })
        .where(eq(messages.conversationId, conversationId));
    }
  } catch (error) {
    console.error('addPendingMessages error:', error);
    throw error;
  }
};
export const deleteConversation = async (
  conversationId: string
): Promise<void> => {
  await db.delete(messages).where(eq(messages.conversationId, conversationId));
};

export const clearAllMessages = async (): Promise<void> => {
  await db.delete(messages);
};

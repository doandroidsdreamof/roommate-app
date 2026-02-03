import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id').notNull().unique(),
  content: text('content', { mode: 'json' }) // TODO rename content => messages
    .$type<
      {
        message: string;
        createdAt: string;
        isOwn: boolean;
      }[]
    >()
    .notNull(),

  // nonce: text('nonce').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),

  metadata: text('metadata', { mode: 'json' }).$type<{
    deviceModel?: string;
    keyId?: string;
  }>(),
});

export const conversations = sqliteTable('conversations', {
  conversationId: text('conversation_id').primaryKey(),
  isRead: integer('is_read', { mode: 'boolean' }).default(false).notNull(),
  lastMessageAt: text('last_message_at'),
});

export const conversationsRelations = relations(conversations, ({ one }) => ({
  messages: one(messages, {
    fields: [conversations.conversationId],
    references: [messages.conversationId],
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.conversationId],
  }),
}));

export type Message = typeof messages.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;

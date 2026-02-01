import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id').notNull(),
  content: text('content', { mode: 'json' }) // TODO rename content => messages
    .$type<
      {
        message: string;
        createdAt: string;
        isOwn: boolean
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

export type Message = typeof messages.$inferSelect;

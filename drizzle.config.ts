import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  verbose: true,
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
} satisfies Config;

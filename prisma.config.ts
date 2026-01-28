import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: 'file:./dev.db', // Or process.env.DATABASE_URL
  },
});
// =====================================================
// Leo Portfolio - Prisma CLI configuration (Prisma 7)
// =====================================================
// In Prisma 7 the database URL lives HERE (not in schema.prisma).
// The Prisma CLI (generate / db push / studio) reads this file.
// =====================================================
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});

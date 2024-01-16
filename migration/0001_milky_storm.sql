ALTER TABLE "couple" ALTER COLUMN "code" SET DATA TYPE varchar(8);
ALTER TABLE "couple" ALTER COLUMN "userId2" DROP NOT NULL;
ALTER TABLE "roles" ALTER COLUMN "permissions" SET NOT NULL;
CREATE INDEX IF NOT EXISTS "user1_idx" ON "couple" ("userId1");
CREATE INDEX IF NOT EXISTS "user2_idx" ON "couple" ("userId2");
ALTER TABLE "couple" ADD CONSTRAINT "couple_code_unique" UNIQUE("code");
ALTER TABLE "couple" DROP CONSTRAINT "couple_userId1_users_id_fk";

ALTER TABLE "coupleImage" DROP CONSTRAINT "coupleImage_couplePageId_couplePage_id_fk";

ALTER TABLE "couplePage" DROP CONSTRAINT "couplePage_coupleId_couple_id_fk";

ALTER TABLE "coupleReview" DROP CONSTRAINT "coupleReview_userId_users_id_fk";

ALTER TABLE "userRole" DROP CONSTRAINT "userRole_roleId_roles_id_fk";

ALTER TABLE "users" ADD COLUMN "nickname" varchar(256) DEFAULT '' NOT NULL;
DO $$ BEGIN
 ALTER TABLE "couple" ADD CONSTRAINT "couple_userId1_users_id_fk" FOREIGN KEY ("userId1") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "coupleImage" ADD CONSTRAINT "coupleImage_couplePageId_couplePage_id_fk" FOREIGN KEY ("couplePageId") REFERENCES "couplePage"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "couplePage" ADD CONSTRAINT "couplePage_coupleId_couple_id_fk" FOREIGN KEY ("coupleId") REFERENCES "couple"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "coupleReview" ADD CONSTRAINT "coupleReview_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

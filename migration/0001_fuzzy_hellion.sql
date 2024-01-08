CREATE TABLE IF NOT EXISTS "userRole" (
	"applicationId" uuid NOT NULL,
	"roleId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	CONSTRAINT "userRole_applicationId_roleId_userId_pk" PRIMARY KEY("applicationId","roleId","userId")
);

ALTER TABLE "roles" ALTER COLUMN "applicationId" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "applicationId" SET NOT NULL;
DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_applicationId_application_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."application"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_roleId_roles_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "user" RENAME COLUMN "name" TO "user_name";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_user_name_unique" UNIQUE("user_name");
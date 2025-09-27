CREATE TABLE "users" (
	"pkid" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_pkid_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"user_type" varchar DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");
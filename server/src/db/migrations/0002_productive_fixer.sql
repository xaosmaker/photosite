ALTER TABLE "categories" ADD COLUMN "category_slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "photo_albums" ADD COLUMN "category_slug" varchar NOT NULL;
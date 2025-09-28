ALTER TABLE "photo_albums" ADD COLUMN "photo_album_slug" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "photo_albums" DROP COLUMN "category_slug";
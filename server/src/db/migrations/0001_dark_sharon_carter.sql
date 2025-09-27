CREATE TABLE "categories" (
	"pkid" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_pkid_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"category_name" varchar(200) NOT NULL,
	CONSTRAINT "categories_category_name_unique" UNIQUE("category_name")
);
--> statement-breakpoint
CREATE TABLE "images" (
	"pkid" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "images_pkid_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"src" varchar NOT NULL,
	"is_cover" boolean DEFAULT false NOT NULL,
	"is_shown" boolean DEFAULT false NOT NULL,
	"alt" varchar NOT NULL,
	"album_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "photo_albums" (
	"pkid" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "photo_albums_pkid_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"is_cover" boolean DEFAULT false NOT NULL,
	"categories_id" integer NOT NULL,
	CONSTRAINT "photo_albums_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_album_id_photo_albums_pkid_fk" FOREIGN KEY ("album_id") REFERENCES "public"."photo_albums"("pkid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "photo_albums" ADD CONSTRAINT "photo_albums_categories_id_categories_pkid_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("pkid") ON DELETE no action ON UPDATE no action;
CREATE TYPE "public"."couple_yn" AS ENUM('Y', 'N');--> statement-breakpoint
CREATE TYPE "public"."mood_type" AS ENUM('HAPPY', 'SAD', 'ANGRY', 'EXCITED', 'TIRED');--> statement-breakpoint
CREATE TABLE "diary" (
	"diary_id" varchar(30) PRIMARY KEY NOT NULL,
	"input_id" varchar(30) NOT NULL,
	"input_dt" date NOT NULL,
	"mood_type" "mood_type",
	"content" varchar(500),
	"file_id" varchar(30),
	"couple_yn" "couple_yn",
	"update_dt" date
);

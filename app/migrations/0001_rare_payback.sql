CREATE TABLE "answer" (
	"quest_id" bigint PRIMARY KEY NOT NULL,
	"answer_content" text,
	"insert_dttm" timestamp DEFAULT now() NOT NULL,
	"update_dttm" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"quest_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "question_quest_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"content" text NOT NULL,
	"order" bigint NOT NULL,
	"use_yn" boolean DEFAULT true NOT NULL,
	"insert_dttm" timestamp DEFAULT now() NOT NULL,
	"update_dttm" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diary_main" (
	"diary_id" varchar(30) PRIMARY KEY NOT NULL,
	"input_id" varchar(30) NOT NULL,
	"input_dt" date NOT NULL,
	"mood_type" "mood_type", 
	"content" varchar(500),
	"file_id" varchar(30),
	"couple_yn" "couple_yn",
	"update_dt" date
);
--> statement-breakpoint
DROP TABLE "diary" CASCADE;--> statement-breakpoint
ALTER TABLE "answer" ADD CONSTRAINT "answer_quest_id_question_quest_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."question"("quest_id") ON DELETE no action ON UPDATE no action;
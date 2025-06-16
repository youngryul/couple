import { bigint, pgEnum, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";

// export const jobs = pgTable("jobs", {
//   job_id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
//   position: text().notNull(),
//   overview: text().notNull(),
//   responsibilities: text().notNull(),
//   qualifications: text().notNull(),
//   benefits: text().notNull(),
//   skills: text().notNull(),
//   company_name: text().notNull(),
//   company_logo: text().notNull(),
//   company_location: text().notNull(),
//   apply_url: text().notNull(),
//   insert_dttm: timestamp().notNull().defaultNow(),
//   update_dttm: timestamp(),
// });

// export const yn = pgEnum("yn",["Y","N"] as [string, ...string[]])

export const question = pgTable("question",{
  quest_id : bigint({mode : "number"}).primaryKey().generatedAlwaysAsIdentity(),
  content : text().notNull(),
  order : bigint({mode : "number"}).notNull(),
  use_yn : boolean("use_yn").notNull().default(true),
  insert_dttm : timestamp().notNull().defaultNow(),
  update_dttm : timestamp().notNull(),
})

export const answer = pgTable("answer",{
  // user_id : text().references(() => user.user_id).primaryKey(),
  quest_id : bigint({mode : "number"}).references(() => question.quest_id).primaryKey(),
  answer_content : text(), //질문이 사용자에게 insert됐을때 빈값이므로 Nullable
  insert_dttm : timestamp().notNull().defaultNow(),
  update_dttm : timestamp().notNull(),
})
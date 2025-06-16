import { pgTable, varchar, date, pgEnum, text } from "drizzle-orm/pg-core";
import { MOOD_TYPES, COUPLE_YN } from "./constants";

// ENUM 정의
export const moodTypes = pgEnum("mood_type", MOOD_TYPES);
export const coupleYn = pgEnum("couple_yn", COUPLE_YN);

// 테이블 정의
export const diaries = pgTable("diary_main", {
  diaryId: varchar("diary_id", { length: 30 }).primaryKey(), // 일기 ID
  inputId: varchar("input_id", { length: 30 }).notNull(), // 작성자
  inputDt: date("input_dt").notNull(), // 작성일시
  moodType: moodTypes("mood_type"), // 기분 상태
  content: varchar("content", { length: 500 }), // 일기 내용
  fileId: varchar("file_id", { length: 30 }), // 이미지 첨부
  coupleYn: coupleYn("couple_yn"), // 커플 공개 여부
  updateDt: date("update_dt"), // 수정일시
});

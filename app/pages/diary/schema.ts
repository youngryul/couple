import { pgTable, varchar, date, pgEnum, text } from "drizzle-orm/pg-core";
import { MOOD_TYPES, COUPLE_YN } from "./constants";

// ENUM 정의
export const moodTypes = pgEnum("mood_type", MOOD_TYPES);
export const coupleYn = pgEnum("couple_yn", COUPLE_YN);

// 테이블 정의
export const diaries = pgTable("diary_main", {
  diary_id: varchar({ length: 30 }).primaryKey(), // 일기 ID
  input_id: varchar({ length: 30 }).notNull(), // 작성자
  input_dt: date().notNull(), // 작성일시
  mood_type: moodTypes("mood_type"), // 기분 상태
  content: varchar({ length: 500 }), // 일기 내용
  file_id: varchar({ length: 30 }), // 이미지 첨부
  couple_yn: coupleYn(), // 커플 공개 여부
  update_dt: date(), // 수정일시
});

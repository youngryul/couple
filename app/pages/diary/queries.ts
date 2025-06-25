import db from "~/db";
import { diaries } from "./schema";
import { asc, count, desc, eq } from "drizzle-orm";

export const getDiaryList = async () => {
  const allDiary = await db
    .select({
      diaryId: diaries.diary_id,
      inputId: diaries.input_id,
      inputDate: diaries.input_dt,
      moodType: diaries.mood_type,
      content: diaries.content,
      fileId: diaries.file_id,
      coupleYn: diaries.couple_yn,
      updateDate: diaries.update_dt,
    })
    .from(diaries);

  return allDiary;
};

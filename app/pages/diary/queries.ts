import client from "~/supa-client";

export const getDiaryList = async () => {
  const { data, error } = await client.from("diary_main").select(`
      diary_id,
      input_id,
      input_dt,
      mood_type,
      content,
      file_id,
      couple_yn,
      update_dt
    `);

  if (error) {
    console.error("Error fetching diary list:", error);
    throw error;
  }

  const allDiary =
    data?.map((item) => ({
      diaryId: item.diary_id,
      inputId: item.input_id,
      inputDate: item.input_dt,
      moodType: item.mood_type,
      content: item.content,
      fileId: item.file_id,
      coupleYn: item.couple_yn,
      updateDate: item.update_dt,
    })) ?? [];

  return allDiary;
};

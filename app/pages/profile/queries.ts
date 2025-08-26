import { eq, and, or } from "drizzle-orm";
import db from "../../db";
import { profiles, type Profile, type NewProfile, type ProfileUpdate } from "./schema";

// 프로필 생성
export async function createProfile(profileData: NewProfile): Promise<Profile> {
  const [profile] = await db.insert(profiles).values(profileData).returning();
  return profile;
}

// 사용자 가입 시 자동으로 프로필 생성
export async function createProfileFromUser(
  userId: string, 
  userEmail: string, 
  channel: string
): Promise<Profile> {
  const profileData: NewProfile = {
    id: userId as any, // Supabase auth.users의 id
    user_id: userId,
    user_name: "", // 나중에 사용자가 입력
    user_email: userEmail,
    username: `user_${Date.now()}`, // 임시 사용자명
    display_name: "", // 나중에 사용자가 입력
    channel: channel as any, // 가입창구
    // 나머지 필드들은 기본값으로 설정
  };

  const [profile] = await db.insert(profiles).values(profileData).returning();
  return profile;
}

// ID로 프로필 조회
export async function getProfileById(id: string): Promise<Profile | null> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.id, id));
  return profile || null;
}

// 이메일로 프로필 조회
export async function getProfileByEmail(email: string): Promise<Profile | null> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.user_email, email));
  return profile || null;
}

// 사용자명으로 프로필 조회
export async function getProfileByUsername(username: string): Promise<Profile | null> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.username, username));
  return profile || null;
}

// 설계서 기반 사용자 ID로 프로필 조회
export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  const [profile] = await db.select().from(profiles).where(eq(profiles.user_id, userId));
  return profile || null;
}

// 모든 프로필 조회 (관리자용)
export async function getAllProfiles(): Promise<Profile[]> {
  return await db.select().from(profiles);
}

// 프로필 업데이트
export async function updateProfile(id: string, updateData: ProfileUpdate): Promise<Profile | null> {
  const [profile] = await db
    .update(profiles)
    .set({ ...updateData, updated_at: new Date() })
    .where(eq(profiles.id, id))
    .returning();
  return profile || null;
}

// 프로필 삭제
export async function deleteProfile(id: string): Promise<boolean> {
  const result = await db.delete(profiles).where(eq(profiles.id, id));
  return result.rowCount > 0;
}

// 커플 연결
export async function connectCouple(userId1: string, userId2: string): Promise<boolean> {
  try {
    await db.transaction(async (tx) => {
      // 두 사용자 모두 커플 상태로 업데이트
      await tx
        .update(profiles)
        .set({ 
          partner_id: userId2, 
          is_in_relationship: true, 
          relationship_start_date: new Date(),
          updated_at: new Date() 
        })
        .where(eq(profiles.id, userId1));

      await tx
        .update(profiles)
        .set({ 
          partner_id: userId1, 
          is_in_relationship: true, 
          relationship_start_date: new Date(),
          updated_at: new Date() 
        })
        .where(eq(profiles.id, userId2));
    });
    return true;
  } catch (error) {
    console.error("커플 연결 실패:", error);
    return false;
  }
}

// 커플 연결 해제
export async function disconnectCouple(userId: string): Promise<boolean> {
  try {
    const profile = await getProfileById(userId);
    if (!profile?.partner_id) return false;

    await db.transaction(async (tx) => {
      // 두 사용자 모두 커플 상태 해제
      await tx
        .update(profiles)
        .set({ 
          partner_id: null, 
          is_in_relationship: false, 
          relationship_start_date: null,
          updated_at: new Date() 
        })
        .where(eq(profiles.id, userId));

      await tx
        .update(profiles)
        .set({ 
          partner_id: null, 
          is_in_relationship: false, 
          relationship_start_date: null,
          updated_at: new Date() 
        })
        .where(eq(profiles.id, profile.partner_id));
    });
    return true;
  } catch (error) {
    console.error("커플 연결 해제 실패:", error);
    return false;
  }
}

// 커플 프로필 조회
export async function getCoupleProfile(userId: string): Promise<Profile | null> {
  const profile = await getProfileById(userId);
  if (!profile?.partner_id) return null;
  
  return await getProfileById(profile.partner_id);
}

// 온라인 상태 업데이트
export async function updateOnlineStatus(id: string, isOnline: boolean): Promise<void> {
  await db
    .update(profiles)
    .set({ 
      is_online: isOnline, 
      last_seen: isOnline ? null : new Date(),
      updated_at: new Date() 
    })
    .where(eq(profiles.id, id));
}

// 검색 가능한 프로필 조회 (공개 프로필만)
export async function getPublicProfiles(searchTerm?: string): Promise<Profile[]> {
  let query = db.select().from(profiles).where(eq(profiles.is_public_profile, true));
  
  if (searchTerm) {
    query = query.where(
      or(
        eq(profiles.username, searchTerm),
        eq(profiles.display_name, searchTerm),
        eq(profiles.user_name, searchTerm)
      )
    );
  }
  
  return await query;
}

// 가입창구별 프로필 조회
export async function getProfilesByChannel(channel: string): Promise<Profile[]> {
  return await db.select().from(profiles).where(eq(profiles.channel, channel));
}

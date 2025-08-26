import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum, integer } from "drizzle-orm/pg-core";

// 성별 ENUM 정의 (설계서에 맞춤)
export const genderTypes = pgEnum("gender_type", ["M", "F"]);

// 가입창구 ENUM 정의
export const channelTypes = pgEnum("channel_type", ["WEB", "MOBILE", "KAKAO", "NAVER", "GOOGLE", "APPLE"]);

// 프로필 테이블 정의 (설계서 기반)
export const profiles = pgTable("profiles", {
  // Supabase auth.users의 id와 연결되는 외래키
  id: uuid("id").primaryKey().references(() => null, { onDelete: "cascade" }), // auth.users.id 참조
  
  // 설계서에 있는 필드들
  user_id: varchar("user_id", { length: 30 }).notNull().unique(), // 사용자 ID (설계서 기반)
  user_name: varchar("user_name", { length: 100 }).notNull(), // 사용자명 (설계서 기반)
  user_email: varchar("user_email", { length: 255 }).notNull().unique(), // 이메일 (설계서 기반)
  user_phone: varchar("user_phone", { length: 20 }), // 전화번호 (설계서 기반)
  user_birth: varchar("user_birth", { length: 10 }), // 생년월일 (설계서 기반, YYYY-MM-DD 형식)
  user_gender: genderTypes("user_gender"), // 성별 (설계서 기반, M/F)
  user_address: varchar("user_address", { length: 200 }), // 주소 (설계서 기반)
  user_job: varchar("user_job", { length: 100 }), // 직업 (설계서 기반)
  user_company: varchar("user_company", { length: 100 }), // 회사 (설계서 기반)
  user_school: varchar("user_school", { length: 100 }), // 학교 (설계서 기반)
  user_major: varchar("user_major", { length: 100 }), // 전공 (설계서 기반)
  user_height: integer("user_height"), // 키 (설계서 기반, cm 단위)
  user_weight: integer("user_weight"), // 몸무게 (설계서 기반, kg 단위)
  user_blood: varchar("user_blood", { length: 5 }), // 혈액형 (설계서 기반)
  user_religion: varchar("user_religion", { length: 50 }), // 종교 (설계서 기반)
  user_hobby: text("user_hobby"), // 취미 (설계서 기반)
  user_intro: text("user_intro"), // 자기소개 (설계서 기반)
  user_ideal: text("user_ideal"), // 이상형 (설계서 기반)
  
  // 가입창구 정보
  channel: channelTypes("channel").notNull(), // 가입창구 (CHNL)
  
  // 설계서에 없는 추가 필드들 (자유롭게 추가)
  username: varchar("username", { length: 50 }).notNull().unique(), // 사용자명 (로그인용)
  display_name: varchar("display_name", { length: 100 }), // 표시명
  avatar_url: text("avatar_url"), // 프로필 이미지 URL
  profile_image_url: text("profile_image_url"), // 커버 이미지 URL
  
  // 커플 관련 정보 (설계서에 없지만 커플 앱에 필요)
  partner_id: uuid("partner_id").references(() => null), // 커플 연결된 상대방 ID
  is_in_relationship: boolean("is_in_relationship").default(false), // 커플 상태
  relationship_start_date: timestamp("relationship_start_date"), // 커플 시작일
  
  // 설정 및 상태
  is_public_profile: boolean("is_public_profile").default(true), // 프로필 공개 여부
  is_online: boolean("is_online").default(false), // 온라인 상태
  last_seen: timestamp("last_seen"), // 마지막 접속 시간
  
  // 메타데이터
  created_at: timestamp("created_at").notNull().defaultNow(), // 생성일시
  updated_at: timestamp("updated_at").notNull().defaultNow(), // 수정일시
  
  // 추가 위치 정보
  location: varchar("location", { length: 100 }), // 위치 (도시, 국가)
  timezone: varchar("timezone", { length: 50 }), // 시간대
});

// 프로필 업데이트를 위한 타입 (선택적 필드들)
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type ProfileUpdate = Partial<NewProfile>;

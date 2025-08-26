-- 프로필 테이블 생성
CREATE TYPE gender_type AS ENUM ('M', 'F');
CREATE TYPE channel_type AS ENUM ('WEB', 'MOBILE', 'KAKAO', 'NAVER', 'GOOGLE', 'APPLE');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id VARCHAR(30) NOT NULL UNIQUE,
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_phone VARCHAR(20),
  user_birth VARCHAR(10),
  user_gender gender_type,
  user_address VARCHAR(200),
  user_job VARCHAR(100),
  user_company VARCHAR(100),
  user_school VARCHAR(100),
  user_major VARCHAR(100),
  user_height INTEGER,
  user_weight INTEGER,
  user_blood VARCHAR(5),
  user_religion VARCHAR(50),
  user_hobby TEXT,
  user_intro TEXT,
  user_ideal TEXT,
  channel channel_type NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  profile_image_url TEXT,
  partner_id UUID REFERENCES profiles(id),
  is_in_relationship BOOLEAN DEFAULT FALSE,
  relationship_start_date TIMESTAMP,
  is_public_profile BOOLEAN DEFAULT TRUE,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  location VARCHAR(100),
  timezone VARCHAR(50)
);

-- 인덱스 생성
CREATE INDEX idx_profiles_user_email ON profiles(user_email);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_channel ON profiles(channel);
CREATE INDEX idx_profiles_partner_id ON profiles(partner_id);
CREATE INDEX idx_profiles_is_public ON profiles(is_public_profile);

-- RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성
-- 사용자는 자신의 프로필만 읽고 수정할 수 있음
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 공개 프로필은 모든 인증된 사용자가 볼 수 있음
CREATE POLICY "Users can view public profiles" ON profiles
  FOR SELECT USING (is_public_profile = true);

-- 관리자는 모든 프로필을 볼 수 있음 (필요시)
-- CREATE POLICY "Admins can view all profiles" ON profiles
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- 사용자 가입 시 자동으로 프로필 생성하는 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    user_id,
    user_name,
    user_email,
    username,
    channel,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    'user_' || EXTRACT(EPOCH FROM NOW())::BIGINT,
    COALESCE(NEW.raw_user_meta_data->>'channel', 'WEB')::channel_type,
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 트리거 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 프로필 업데이트 시 updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

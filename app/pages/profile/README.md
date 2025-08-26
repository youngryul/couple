# 프로필 자동 생성 시스템

## 🎯 개요

이 시스템은 Supabase 사용자가 가입할 때 자동으로 프로필을 생성하는 기능을 제공합니다. 가입창구(CHNL) 정보도 함께 저장되어 어떤 채널을 통해 가입했는지 추적할 수 있습니다.

## 🏗️ 아키텍처

### 1. 데이터베이스 트리거 방식 (권장)
- `auth.users` 테이블에 새 사용자가 추가되면 자동으로 `profiles` 테이블에 프로필 생성
- PostgreSQL 트리거를 사용하여 서버리스 방식으로 동작
- 가장 안정적이고 효율적인 방법

### 2. Edge Function 방식
- Supabase Edge Function을 사용하여 웹훅 처리
- 더 복잡한 로직 구현 가능
- 추가적인 비용 발생 가능

## 🚀 설정 방법

### 1. 데이터베이스 마이그레이션 실행

```bash
# Drizzle 마이그레이션 생성
npm run db:generate

# 마이그레이션 실행
npm run db:migrate
```

### 2. Supabase Dashboard에서 설정

1. **RLS 정책 확인**: `profiles` 테이블에 RLS가 활성화되어 있는지 확인
2. **트리거 확인**: `on_auth_user_created` 트리거가 생성되었는지 확인
3. **함수 확인**: `handle_new_user()` 함수가 생성되었는지 확인

### 3. 환경 변수 설정

```env
# .env.local
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📊 가입창구 (CHNL) 타입

| 값 | 설명 | 아이콘 |
|----|------|--------|
| `WEB` | 웹 브라우저 | 🌐 |
| `MOBILE` | 모바일 앱 | 📱 |
| `KAKAO` | 카카오 로그인 | 💛 |
| `NAVER` | 네이버 로그인 | 💚 |
| `GOOGLE` | 구글 로그인 | 🔵 |
| `APPLE` | 애플 로그인 | ⚫ |

## 🔧 사용 방법

### 1. 로그인 시 가입창구 전달

```typescript
import { supabase } from '../supabase-client';

const signUpWithChannel = async (email: string, password: string, channel: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        channel: channel, // 가입창구 정보를 user_metadata에 저장
        full_name: '사용자명'
      }
    }
  });
  
  return { data, error };
};
```

### 2. 프로필 자동 생성 확인

```typescript
import { getProfileById } from './queries';

// 사용자 로그인 후 프로필 확인
const checkProfile = async (userId: string) => {
  const profile = await getProfileById(userId);
  if (profile) {
    console.log('프로필이 자동으로 생성되었습니다:', profile);
    console.log('가입창구:', profile.channel);
  }
};
```

### 3. 가입창구별 사용자 통계

```typescript
import { getProfilesByChannel } from './queries';

// 특정 가입창구의 사용자 수 확인
const getKakaoUsers = async () => {
  const kakaoUsers = await getProfilesByChannel('KAKAO');
  console.log('카카오 가입 사용자 수:', kakaoUsers.length);
};
```

## 🛡️ 보안 고려사항

### 1. RLS (Row Level Security)
- 사용자는 자신의 프로필만 읽고 수정 가능
- 공개 프로필은 모든 인증된 사용자가 조회 가능
- 관리자 권한이 필요한 경우 별도 정책 추가

### 2. 데이터 검증
- 가입창구 값은 ENUM으로 제한
- 필수 필드 검증
- SQL 인젝션 방지

## 🔍 문제 해결

### 1. 프로필이 자동 생성되지 않는 경우
- 트리거가 제대로 생성되었는지 확인
- `handle_new_user()` 함수가 존재하는지 확인
- RLS 정책이 올바르게 설정되었는지 확인

### 2. 가입창구 정보가 저장되지 않는 경우
- `user_metadata`에 `channel` 값이 포함되었는지 확인
- ENUM 타입이 올바르게 정의되었는지 확인

### 3. 권한 오류가 발생하는 경우
- RLS 정책을 확인
- 사용자 인증 상태 확인
- 서비스 롤 키 권한 확인

## 📈 모니터링

### 1. 로그 확인
```sql
-- 프로필 생성 로그 확인
SELECT * FROM profiles ORDER BY created_at DESC LIMIT 10;

-- 가입창구별 사용자 수 통계
SELECT channel, COUNT(*) as user_count 
FROM profiles 
GROUP BY channel 
ORDER BY user_count DESC;
```

### 2. 에러 모니터링
- Supabase Dashboard의 Logs 섹션에서 에러 확인
- Edge Function 로그 확인 (사용하는 경우)

## 🚀 향후 개선 사항

1. **프로필 템플릿**: 가입창구별로 다른 기본 프로필 정보 제공
2. **웰컴 메시지**: 가입창구별 맞춤형 환영 메시지
3. **온보딩 플로우**: 가입창구별로 다른 온보딩 경험 제공
4. **통계 대시보드**: 가입창구별 사용자 통계 시각화

import { useEffect } from 'react';
import { useAuth } from '@supabase/auth-helpers-react';
import { createProfileFromUser } from './queries';

interface UseProfileAutoCreateProps {
  channel: string; // 가입창구 (WEB, MOBILE, KAKAO, NAVER, GOOGLE, APPLE)
}

export function useProfileAutoCreate({ channel }: UseProfileAutoCreateProps) {
  const { user, session } = useAuth();

  useEffect(() => {
    const createProfileIfNeeded = async () => {
      if (user && session) {
        try {
          // 이미 프로필이 있는지 확인 (간단한 체크)
          // 실제로는 프로필 테이블에서 조회해야 함
          console.log('사용자 로그인 감지:', user.email);
          console.log('가입창구:', channel);
          
          // 여기서 프로필 생성 로직을 실행할 수 있음
          // 실제 구현에서는 중복 생성 방지를 위한 체크가 필요
          
        } catch (error) {
          console.error('프로필 자동 생성 실패:', error);
        }
      }
    };

    createProfileIfNeeded();
  }, [user, session, channel]);

  return { user, session };
}

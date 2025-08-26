import React, { useState, useEffect } from 'react';
import { getProfileById, type Profile } from './queries';
import { Button } from '../../components/Button';

interface ProfileViewProps {
  userId: string;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
}

export default function ProfileView({ userId, isOwnProfile = false, onEditClick }: ProfileViewProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfileById(userId);
      if (profileData) {
        setProfile(profileData);
      } else {
        setError('프로필을 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('프로필을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '정보 없음';
    return new Date(date).toLocaleDateString('ko-KR');
  };

  const getGenderText = (gender: string | null) => {
    switch (gender) {
      case 'M': return '남성';
      case 'F': return '여성';
      default: return '정보 없음';
    }
  };

  const getChannelText = (channel: string | null) => {
    switch (channel) {
      case 'WEB': return '웹';
      case 'MOBILE': return '모바일';
      case 'KAKAO': return '카카오';
      case 'NAVER': return '네이버';
      case 'GOOGLE': return '구글';
      case 'APPLE': return '애플';
      default: return '정보 없음';
    }
  };

  const getChannelColor = (channel: string | null) => {
    switch (channel) {
      case 'KAKAO': return 'bg-yellow-100 text-yellow-800';
      case 'NAVER': return 'bg-green-100 text-green-800';
      case 'GOOGLE': return 'bg-blue-100 text-blue-800';
      case 'APPLE': return 'bg-gray-100 text-gray-800';
      case 'WEB': return 'bg-purple-100 text-purple-800';
      case 'MOBILE': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={loadProfile} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          다시 시도
        </Button>
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center p-8 text-gray-500">프로필이 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* 헤더 */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.user_name || profile.display_name || profile.username}
          </h2>
          <p className="text-gray-600">@{profile.username}</p>
        </div>
        
        {isOwnProfile && onEditClick && (
          <Button
            onClick={onEditClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            편집
          </Button>
        )}
      </div>

      {/* 가입창구 정보 */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getChannelColor(profile.channel)}`}>
            {getChannelText(profile.channel)} 가입
          </span>
          
          {profile.is_online && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              온라인
            </span>
          )}
          
          {profile.is_in_relationship && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
              커플
            </span>
          )}
        </div>
      </div>

      {/* 아바타 및 프로필 이미지 */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            {profile.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="프로필 이미지" 
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-500">
                {profile.display_name?.charAt(0) || profile.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            {profile.last_seen && !profile.is_online && (
              <p className="text-sm text-gray-500">
                마지막 접속: {formatDate(profile.last_seen)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 자기소개 */}
      {profile.user_intro && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">자기소개</h3>
          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{profile.user_intro}</p>
        </div>
      )}

      {/* 개인 정보 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">개인 정보</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-sm font-medium text-gray-500">이메일</span>
            <p className="text-gray-900">{profile.user_email}</p>
          </div>
          
          {profile.user_phone && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">전화번호</span>
              <p className="text-gray-900">{profile.user_phone}</p>
            </div>
          )}
          
          {profile.user_birth && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">생년월일</span>
              <p className="text-gray-900">{profile.user_birth}</p>
            </div>
          )}
          
          {profile.user_gender && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">성별</span>
              <p className="text-gray-900">{getGenderText(profile.user_gender)}</p>
            </div>
          )}
          
          {profile.user_address && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">주소</span>
              <p className="text-gray-900">{profile.user_address}</p>
            </div>
          )}
          
          {profile.user_height && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">키</span>
              <p className="text-gray-900">{profile.user_height}cm</p>
            </div>
          )}
          
          {profile.user_weight && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">몸무게</span>
              <p className="text-gray-900">{profile.user_weight}kg</p>
            </div>
          )}
          
          {profile.user_blood && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">혈액형</span>
              <p className="text-gray-900">{profile.user_blood}</p>
            </div>
          )}
          
          {profile.user_religion && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">종교</span>
              <p className="text-gray-900">{profile.user_religion}</p>
            </div>
          )}
          
          {profile.location && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">위치</span>
              <p className="text-gray-900">{profile.location}</p>
            </div>
          )}
          
          {profile.timezone && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-sm font-medium text-gray-500">시간대</span>
              <p className="text-gray-900">{profile.timezone}</p>
            </div>
          )}
        </div>
      </div>

      {/* 학력/직업 정보 */}
      {(profile.user_job || profile.user_company || profile.user_school || profile.user_major) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">학력/직업 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.user_job && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-500">직업</span>
                <p className="text-gray-900">{profile.user_job}</p>
              </div>
            )}
            
            {profile.user_company && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-500">회사</span>
                <p className="text-gray-900">{profile.user_company}</p>
              </div>
            )}
            
            {profile.user_school && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-500">학교</span>
                <p className="text-gray-900">{profile.user_school}</p>
              </div>
            )}
            
            {profile.user_major && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-gray-500">전공</span>
                <p className="text-gray-900">{profile.user_major}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 취미/이상형 */}
      {(profile.user_hobby || profile.user_ideal) && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">취미/이상형</h3>
          <div className="space-y-4">
            {profile.user_hobby && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-500">취미</span>
                <p className="text-gray-900 mt-1">{profile.user_hobby}</p>
              </div>
            )}
            
            {profile.user_ideal && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-500">이상형</span>
                <p className="text-gray-900 mt-1">{profile.user_ideal}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 커플 정보 */}
      {profile.is_in_relationship && profile.relationship_start_date && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">커플 정보</h3>
          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <span className="font-medium">커플 시작일:</span> {formatDate(profile.relationship_start_date)}
            </p>
            {profile.partner_id && (
              <p className="text-gray-700 mt-2">
                <span className="font-medium">파트너 ID:</span> {profile.partner_id}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 메타데이터 */}
      <div className="text-xs text-gray-500 border-t pt-4">
        <p>가입일: {formatDate(profile.created_at)}</p>
        {profile.updated_at && profile.updated_at !== profile.created_at && (
          <p>최종 수정: {formatDate(profile.updated_at)}</p>
        )}
      </div>
    </div>
  );
}

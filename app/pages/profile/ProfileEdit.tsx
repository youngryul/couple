import React, { useState, useEffect } from 'react';
import { getProfileById, updateProfile, type Profile } from './queries';
import { Button } from '../../components/Button';

interface ProfileEditProps {
  userId: string;
  onProfileUpdated?: (profile: Profile) => void;
}

export default function ProfileEdit({ userId, onProfileUpdated }: ProfileEditProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 폼 상태 (설계서 기반)
  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    user_name: '',
    user_email: '',
    user_phone: '',
    user_birth: '',
    user_gender: '',
    user_address: '',
    user_job: '',
    user_company: '',
    user_school: '',
    user_major: '',
    user_height: '',
    user_weight: '',
    user_blood: '',
    user_religion: '',
    user_hobby: '',
    user_intro: '',
    user_ideal: '',
    location: '',
    timezone: '',
    is_public_profile: true,
  });

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfileById(userId);
      if (profileData) {
        setProfile(profileData);
        setFormData({
          username: profileData.username || '',
          display_name: profileData.display_name || '',
          user_name: profileData.user_name || '',
          user_email: profileData.user_email || '',
          user_phone: profileData.user_phone || '',
          user_birth: profileData.user_birth || '',
          user_gender: profileData.user_gender || '',
          user_address: profileData.user_address || '',
          user_job: profileData.user_job || '',
          user_company: profileData.user_company || '',
          user_school: profileData.user_school || '',
          user_major: profileData.user_major || '',
          user_height: profileData.user_height?.toString() || '',
          user_weight: profileData.user_weight?.toString() || '',
          user_blood: profileData.user_blood || '',
          user_religion: profileData.user_religion || '',
          user_hobby: profileData.user_hobby || '',
          user_intro: profileData.user_intro || '',
          user_ideal: profileData.user_ideal || '',
          location: profileData.location || '',
          timezone: profileData.timezone || '',
          is_public_profile: profileData.is_public_profile ?? true,
        });
      }
    } catch (err) {
      setError('프로필을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      setError(null);

      const updateData = {
        username: formData.username,
        display_name: formData.display_name,
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_phone: formData.user_phone,
        user_birth: formData.user_birth,
        user_gender: formData.user_gender || null,
        user_address: formData.user_address,
        user_job: formData.user_job,
        user_company: formData.user_company,
        user_school: formData.user_school,
        user_major: formData.user_major,
        user_height: formData.user_height ? parseInt(formData.user_height) : null,
        user_weight: formData.user_weight ? parseInt(formData.user_weight) : null,
        user_blood: formData.user_blood,
        user_religion: formData.user_religion,
        user_hobby: formData.user_hobby,
        user_intro: formData.user_intro,
        user_ideal: formData.user_ideal,
        location: formData.location,
        timezone: formData.timezone,
        is_public_profile: formData.is_public_profile,
      };

      const updatedProfile = await updateProfile(userId, updateData);
      if (updatedProfile) {
        setProfile(updatedProfile);
        onProfileUpdated?.(updatedProfile);
        alert('프로필이 성공적으로 업데이트되었습니다!');
      }
    } catch (err) {
      setError('프로필 업데이트에 실패했습니다.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">프로필을 불러오는 중...</div>;
  }

  if (!profile) {
    return <div className="text-red-500 p-8">프로필을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">프로필 편집</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사용자명 (로그인용) *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                표시명
              </label>
              <input
                type="text"
                name="display_name"
                value={formData.display_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                실제 이름 *
              </label>
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일 *
              </label>
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              자기소개
            </label>
            <textarea
              name="user_intro"
              value={formData.user_intro}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="자기소개를 입력하세요..."
            />
          </div>
        </div>

        {/* 개인 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">개인 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전화번호
              </label>
              <input
                type="tel"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                생년월일
              </label>
              <input
                type="date"
                name="user_birth"
                value={formData.user_birth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                성별
              </label>
              <select
                name="user_gender"
                value={formData.user_gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="M">남성</option>
                <option value="F">여성</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                name="user_address"
                value={formData.user_address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="주소를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                키 (cm)
              </label>
              <input
                type="number"
                name="user_height"
                value={formData.user_height}
                onChange={handleInputChange}
                min="100"
                max="250"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="170"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                몸무게 (kg)
              </label>
              <input
                type="number"
                name="user_weight"
                value={formData.user_weight}
                onChange={handleInputChange}
                min="30"
                max="200"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                혈액형
              </label>
              <select
                name="user_blood"
                value={formData.user_blood}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">선택하세요</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종교
              </label>
              <input
                type="text"
                name="user_religion"
                value={formData.user_religion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="종교를 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 학력/직업 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">학력/직업 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                직업
              </label>
              <input
                type="text"
                name="user_job"
                value={formData.user_job}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="직업을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                회사
              </label>
              <input
                type="text"
                name="user_company"
                value={formData.user_company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="회사명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                학교
              </label>
              <input
                type="text"
                name="user_school"
                value={formData.user_school}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="학교명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                전공
              </label>
              <input
                type="text"
                name="user_major"
                value={formData.user_major}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="전공을 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 취미/이상형 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">취미/이상형</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                취미
              </label>
              <textarea
                name="user_hobby"
                value={formData.user_hobby}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="취미를 입력하세요..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이상형
              </label>
              <textarea
                name="user_ideal"
                value={formData.user_ideal}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="이상형을 입력하세요..."
              />
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">추가 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                위치
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="도시, 국가"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시간대
              </label>
              <input
                type="text"
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Asia/Seoul"
              />
            </div>
          </div>
        </div>

        {/* 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">설정</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_public_profile"
              checked={formData.is_public_profile}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              프로필을 공개로 설정
            </label>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={() => loadProfile()}
            disabled={saving}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </form>
    </div>
  );
}

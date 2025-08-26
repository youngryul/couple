import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEdit from './ProfileEdit';
import { Button } from '../../components/Button';
import { type Profile } from './schema';

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleProfileUpdated = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? '프로필 편집' : '프로필'}
            </h1>
            <Button
              onClick={toggleEditMode}
              className={`px-4 py-2 rounded-md ${
                isEditing
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isEditing ? '취소' : '편집'}
            </Button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="py-6">
          {isEditing ? (
            <ProfileEdit
              userId={userId}
              onProfileUpdated={handleProfileUpdated}
            />
          ) : (
            <ProfileView userId={userId} />
          )}
        </div>
      </div>
    </div>
  );
}

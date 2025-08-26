import React from 'react';

interface ChannelSelectorProps {
  selectedChannel: string;
  onChannelChange: (channel: string) => void;
  disabled?: boolean;
}

export default function ChannelSelector({ selectedChannel, onChannelChange, disabled = false }: ChannelSelectorProps) {
  const channels = [
    { value: 'WEB', label: '웹', icon: '🌐' },
    { value: 'MOBILE', label: '모바일', icon: '📱' },
    { value: 'KAKAO', label: '카카오', icon: '💛' },
    { value: 'NAVER', label: '네이버', icon: '💚' },
    { value: 'GOOGLE', label: '구글', icon: '🔵' },
    { value: 'APPLE', label: '애플', icon: '⚫' },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        가입창구 선택 *
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {channels.map((channel) => (
          <button
            key={channel.value}
            type="button"
            disabled={disabled}
            onClick={() => onChannelChange(channel.value)}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              selectedChannel === channel.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="text-2xl mb-2">{channel.icon}</div>
            <div className="text-sm font-medium">{channel.label}</div>
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500">
        어떤 채널을 통해 가입하시나요?
      </p>
    </div>
  );
}
